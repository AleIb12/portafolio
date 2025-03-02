import React, { useState, useEffect, useRef } from 'react';

// Componente SkillBar usando patrones de React Bits:
// - Render Props
// - Custom Hooks
// - Lazy Initialization

// Custom hook para animación de entrada
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Componente base usando render props
export const SkillBarBase = ({ name, percentage, renderBar }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="skill-item">
      <div className="skill-bar">
        <span className="skill-name">{name}</span>
        {renderBar({ percentage, isVisible })}
      </div>
    </div>
  );
};

// Implementación por defecto usando render props
const SkillBar = ({ name, percentage }) => {
  return (
    <SkillBarBase
      name={name}
      percentage={percentage}
      renderBar={({ percentage, isVisible }) => (
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{
              width: isVisible ? `${percentage}%` : '0%',
              transition: 'width 1s ease-out'
            }}
          ></div>
        </div>
      )}
    />
  );
};

// Componente usando compound components pattern
SkillBar.Container = ({ children }) => (
  <div className="skill-card">
    <ul className="skill-list">
      {children}
    </ul>
  </div>
);

SkillBar.Title = ({ children }) => (
  <h3 className="skill-title">{children}</h3>
);

export default SkillBar;