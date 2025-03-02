import React, { useRef, useEffect, useState } from 'react';

// Componente ScrollReveal utilizando patrones de React Bits:
// - Custom hooks
// - Render props (opcionales)
// - Técnica de composición
// - Props con valores predeterminados

// Custom hook para detectar la visibilidad en el viewport
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Si ya se ha animado y no queremos repetir, no hacemos nada
      if (hasAnimated && !options.repeat) return;

      if (entry.isIntersecting) {
        setIsInView(true);
        
        if (!options.repeat) {
          setHasAnimated(true);
        }
        
        // Si solo queremos activarlo una vez, desconectamos el observer
        if (!options.repeat) {
          observer.disconnect();
        }
      } else if (options.repeat) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      root: options.root || null
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.root, options.repeat, hasAnimated]);

  return [ref, isInView];
};

// Componentes para diferentes tipos de animación
const animations = {
  fadeIn: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease ${delay}ms`
  }),
  
  slideUp: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`
  }),
  
  slideRight: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`
  }),
  
  slideLeft: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`
  }),
  
  scale: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`
  }),
  
  flip: (isVisible, duration = 1000, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'perspective(400px) rotateY(0)' : 'perspective(400px) rotateY(90deg)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`
  })
};

// Componente principal
const ScrollReveal = ({
  children,
  animation = 'fadeIn',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  duration = 800,
  delay = 0,
  className = '',
  style = {},
  as: Component = 'div',
  childClassName = '',
  childStyle = {}
}) => {
  const [ref, isInView] = useInView({
    threshold,
    rootMargin,
    repeat: !triggerOnce
  });

  // Seleccionar el efecto de animación
  const animationFn = typeof animation === 'function' 
    ? animation 
    : animations[animation] || animations.fadeIn;
  
  // Estilos de animación
  const animationStyle = animationFn(isInView, duration, delay);

  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...style, overflow: 'hidden' }}
    >
      <div
        className={childClassName}
        style={{
          ...childStyle,
          ...animationStyle,
          willChange: 'opacity, transform'
        }}
      >
        {children}
      </div>
    </Component>
  );
};

// Componente de grupo que anima elementos en secuencia
export const ScrollRevealGroup = ({
  children,
  animation = 'fadeIn',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  duration = 800,
  delayBetween = 200,
  className = '',
  style = {}
}) => {
  const [ref, isInView] = useInView({
    threshold,
    rootMargin,
    repeat: !triggerOnce
  });

  // Clona los elementos hijos y les agrega propiedades de animación con delays escalonados
  const childrenWithDelay = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      animation,
      duration,
      delay: index * delayBetween,
      triggerOnce
    });
  });

  return (
    <div
      ref={ref}
      className={className}
      style={style}
    >
      {childrenWithDelay}
    </div>
  );
};

// Exportar diferentes variantes con configuraciones predefinidas
export const FadeIn = (props) => <ScrollReveal animation="fadeIn" {...props} />;
export const SlideUp = (props) => <ScrollReveal animation="slideUp" {...props} />;
export const SlideRight = (props) => <ScrollReveal animation="slideRight" {...props} />;
export const SlideLeft = (props) => <ScrollReveal animation="slideLeft" {...props} />;
export const ScaleIn = (props) => <ScrollReveal animation="scale" {...props} />;
export const FlipIn = (props) => <ScrollReveal animation="flip" {...props} />;

export default ScrollReveal;