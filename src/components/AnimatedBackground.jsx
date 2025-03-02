import React, { useState, useEffect, useRef } from 'react';

// Componente de fondo animado utilizando patrones de React Bits:
// - Estado memorizado (useRef, useState)
// - Efectos con limpieza correcta
// - Memoización de cálculos
// - Render props (opcional)

const AnimatedBackground = ({ 
  children, 
  particleCount = 50,
  colorPalette = ['#4f46e5', '#6366f1', '#818cf8'],
  baseSpeed = 0.5
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef([]);
  
  // Inicializar partículas
  useEffect(() => {
    const initializeParticles = () => {
      const { width, height } = dimensions;
      if (!width || !height) return;
      
      particlesRef.current = Array(particleCount).fill().map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * baseSpeed,
        speedY: (Math.random() - 0.5) * baseSpeed,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        opacity: Math.random() * 0.5 + 0.1
      }));
    };
    
    initializeParticles();
  }, [dimensions, particleCount, colorPalette, baseSpeed]);
  
  // Manejo del canvas y el resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { offsetWidth, offsetHeight } = canvasRef.current.parentElement;
        setDimensions({
          width: offsetWidth,
          height: offsetHeight
        });
        
        canvasRef.current.width = offsetWidth;
        canvasRef.current.height = offsetHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animación
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const { width, height } = dimensions;
      
      ctx.clearRect(0, 0, width, height);
      
      // Dibujar y actualizar partículas
      particlesRef.current.forEach(particle => {
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebote en los bordes
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
      });
      
      // Dibujar líneas entre partículas cercanas
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (dimensions.width && dimensions.height) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      {children}
    </div>
  );
};

export default AnimatedBackground;