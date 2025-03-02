import React, { useRef, useEffect } from 'react';

// Componente AuroraBackground usando patrones de React Bits:
// - useRef para acceso al DOM
// - useEffect con manejo de ciclo de vida
// - Animaciones basadas en WebGL

const AuroraBackground = ({
  children,
  colors = [
    [62, 70, 229],   // Azul reactbits
    [142, 100, 240], // Púrpura
    [79, 191, 230],  // Azul claro
    [37, 154, 255]   // Azul brillante
  ],
  speed = 0.5,
  intensity = 0.6,
  className = '',
  style = {},
  fadeIn = true
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  // Efecto para inicializar y animar el canvas
  useEffect(() => {
    // Configuración inicial
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    
    // Ajustar tamaño
    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Función para dibujar la aurora
    const drawAurora = () => {
      const ctx = contextRef.current;
      if (!ctx) return;
      
      const { width, height } = ctx.canvas;
      const elapsed = (Date.now() - startTimeRef.current) * 0.001;
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, width, height);
      
      // Crear el gradiente base
      const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
      baseGradient.addColorStop(0, 'rgba(22, 31, 46, 1)');  // Color oscuro superior
      baseGradient.addColorStop(1, 'rgba(38, 43, 80, 1)');  // Color oscuro inferior
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Dibujar las ondas de aurora para cada color
      colors.forEach((color, index) => {
        const [r, g, b] = color;
        const offset = index * 0.2;
        
        // Crear un nuevo path para cada capa de color
        ctx.beginPath();
        
        // Crear puntos de control para la curva Bezier
        const points = [];
        const numPoints = 6;
        const segmentWidth = width / (numPoints - 1);
        
        for (let i = 0; i < numPoints; i++) {
          const x = i * segmentWidth;
          // Calcular la altura con una función sinusoidal animada
          const heightFactor = 0.15 + (index * 0.05);
          const waveHeight = Math.sin(elapsed * speed + i * 0.5 + offset) * height * heightFactor;
          const y = height * 0.4 + waveHeight;
          points.push({ x, y });
        }
        
        // Dibujar la curva usando los puntos de control
        ctx.moveTo(0, height);
        ctx.lineTo(points[0].x, points[0].y);
        
        for (let i = 0; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i+1].x) / 2;
          const yc = (points[i].y + points[i+1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        ctx.lineTo(width, points[numPoints - 1].y);
        ctx.lineTo(width, height);
        ctx.closePath();
        
        // Crear un gradiente para el relleno de la aurora
        const gradientTop = points.reduce((min, p) => Math.min(min, p.y), height);
        const gradientBottom = height;
        const gradient = ctx.createLinearGradient(0, gradientTop, 0, gradientBottom);
        
        // Color con transparencia en la parte superior
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity * 0.7})`);
        // Color más intenso en la parte media
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${intensity * 0.3})`);
        // Transparente en la parte inferior
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Añadir pequeñas partículas brillantes
      const numParticles = 50;
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.7;
        
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(drawAurora);
    };
    
    // Iniciar la animación
    drawAurora();
    
    // Limpieza
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, intensity]);
  
  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        ...style 
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
        }}
      />
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;