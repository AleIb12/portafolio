import React, { useState } from 'react';

// Componente GlassIcon usando patrones de React Bits:
// - Custom hooks
// - Memoización de transiciones
// - Estado interno para efectos hover

const GlassIcon = ({ 
  icon, 
  href, 
  label, 
  size = 48, 
  glowColor = '#4f46e5',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  color = 'white',
  className = '',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Estilos para el contenedor del icono con efecto glass
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: isHovered 
      ? `0 0 20px ${glowColor}80, 0 0 10px ${glowColor}40, inset 0 0 10px ${glowColor}20`
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    color,
    cursor: 'pointer',
  };
  
  // Efecto para el resplandor
  const glowEffect = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at center, ${glowColor}30 0%, transparent 70%)`,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  };
  
  // Estilo para el tooltip
  const tooltipStyle = {
    position: 'absolute',
    top: '-35px',
    left: '50%',
    transform: `translateX(-50%) scale(${isHovered ? 1 : 0.8})`,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass-icon ${className}`}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      {...props}
    >
      <div style={glowEffect} />
      {label && <span style={tooltipStyle}>{label}</span>}
      {icon}
    </a>
  );
};

export default GlassIcon;