import React, { useState } from 'react';

// Componente BounceCard con efectos de hover y animación de rebote
// Las tarjetas se elevan ligeramente y "rebotan" cuando el usuario pasa el cursor
// También incluye un efecto de rotación 3D sutil basado en la posición del cursor

const BounceCard = ({
  title,
  description,
  icon,
  color = '#4f46e5', // Color principal predeterminado (indigo)
  iconBgColor, // Color de fondo para el icono (opcional)
  className = '',
  style = {},
  ...props
}) => {
  // Estados para controlar los efectos de hover
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  // Calcular la rotación y otros efectos basados en la posición del cursor
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcular la distancia desde el centro (normalizada entre -1 y 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setPosition({ x, y });
    setOpacity(1);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Resetear suavemente al estado normal
    setPosition({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      className={`bounce-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        margin: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        marginRight: '1rem',  // Añadir margen derecho
        marginLeft: '1rem',   // Añadir margen izquierdo
        transform: isHovered 
          ? `perspective(1000px) rotateX(${position.y * 3}deg) rotateY(${position.x * -3}deg) translateZ(10px) scale(1.05)` 
          : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)',
        transition: isHovered 
          ? 'transform 0.1s ease-out' 
          : 'transform 0.5s ease-out',
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: isHovered 
          ? `0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 2px ${color}30` 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        ...style,
      }}
    >
      {/* Efecto de resplandor que sigue al cursor */}
      <div
        className="glow-effect"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '12px',
          background: `radial-gradient(circle at ${50 + position.x * 30}% ${50 + position.y * 30}%, ${color}20 0%, transparent 70%)`,
          opacity,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Contenido de la tarjeta */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Icono */}
        <div
          className="bounce-card-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: iconBgColor || `${color}20`,
            color: color,
            marginBottom: '1rem',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          }}
        >
          {icon}
        </div>

        {/* Título */}
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937', // gris oscuro
            marginBottom: '0.75rem',
            transition: 'transform 0.2s ease',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {title}
        </h3>

        {/* Descripción */}
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6b7280', // gris medio
            lineHeight: 1.5,
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default BounceCard;