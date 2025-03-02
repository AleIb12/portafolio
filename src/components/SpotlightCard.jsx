import React, { useState, useRef, useEffect } from 'react';

// Componente SpotlightCard usando patrones de React Bits:
// - UseRef para referencias DOM
// - Gestión de eventos con cleanup
// - Callbacks memoizados
// - Efecto spotlight avanzado

const SpotlightCard = ({ 
  title, 
  description, 
  buttonText = 'Descargar CV',
  buttonLink = '#', 
  icon,
  bgColor = '#1e293b',
  spotlightColor = 'rgba(79, 70, 229, 0.2)',
  className = '',
  ...props 
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Actualizar posición del mouse cuando se mueve dentro de la tarjeta
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Gestionar eventos de mouse
  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return;
    
    const enterHandler = () => setIsHovered(true);
    const leaveHandler = () => setIsHovered(false);
    
    currentRef.addEventListener('mouseenter', enterHandler);
    currentRef.addEventListener('mouseleave', leaveHandler);
    currentRef.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      currentRef.removeEventListener('mouseenter', enterHandler);
      currentRef.removeEventListener('mouseleave', leaveHandler);
      currentRef.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Estilo para el spotlight
  const spotlightStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent)`,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.15s ease',
    pointerEvents: 'none',
  };
  
  return (
    <div 
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        backgroundColor: bgColor,
        borderRadius: '16px',
        overflow: 'hidden',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' 
          : '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
        maxWidth: '400px',
        width: '100%',
        ...props.style,
      }}
      {...props}
    >
      {/* Efecto Spotlight */}
      <div style={spotlightStyle} />
      
      {/* Contenido de la tarjeta */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
        {icon}
      </div>
      
      <h3 style={{ 
        marginBottom: '1rem', 
        color: 'white', 
        fontSize: '1.5rem',
        fontWeight: 'bold',
        position: 'relative',
        zIndex: 2
      }}>
        {title}
      </h3>
      
      <p style={{ 
        marginBottom: '2rem', 
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1rem',
        position: 'relative',
        zIndex: 2
      }}>
        {description}
      </p>
      
      <a 
        href={buttonLink} 
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(79, 70, 229, 1)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          position: 'relative',
          zIndex: 2,
          marginTop: 'auto'
        }}
      >
        {buttonText}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }}>
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
};

export default SpotlightCard;