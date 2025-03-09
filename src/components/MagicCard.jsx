import React, { useState } from 'react';

const MagicCard = ({ 
  children, 
  className = "", 
  hoverEffect = true,
  rotationIntensity = 15,
  glowColor = "rgba(79, 70, 229, 0.3)",
  borderRadius = "1rem"
}) => {
  const [transform, setTransform] = useState('');
  const [boxShadow, setBoxShadow] = useState('');

  const handleMouseMove = (e) => {
    if (!hoverEffect) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = rotationIntensity * ((x - centerX) / centerX);
    const rotateX = -rotationIntensity * ((y - centerY) / centerY);
    
    // Apply transformation
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    
    // Calculate glow position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    
    setBoxShadow(`0 0 30px ${glowColor}, 0 0 80px 10px ${glowColor}30, inset 0 0 15px rgba(255, 255, 255, 0.1)`);
  };

  const handleMouseLeave = () => {
    if (!hoverEffect) return;
    setTransform('perspective(1000px) rotateX(0) rotateY(0)');
    setBoxShadow('0 10px 30px -15px rgba(0, 0, 0, 0.25)');
  };

  return (
    <div
      className={`magic-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius,
        transform,
        boxShadow,
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out',
        willChange: 'transform, box-shadow',
      }}
    >
      <div className="magic-card-content">
        {children}
      </div>
    </div>
  );
};

export default MagicCard;