import React, { useState, useRef, useEffect } from 'react';

// Componente Dock usando patrones de React Bits:
// - Render Props
// - Compound Components
// - Context API para estado compartido

// Contexto para compartir estado entre los componentes del dock
const DockContext = React.createContext();

// Hook para usar el contexto del dock
const useDockContext = () => {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error('Dock compound components must be used within a Dock component');
  }
  return context;
};

// Componente principal Dock
const Dock = ({ children }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const dockRef = useRef(null);

  // Effect para detectar el elemento activo basado en la sección visible
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveItem(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const contextValue = {
    hoveredItem,
    setHoveredItem,
    activeItem,
    setActiveItem
  };

  return (
    <DockContext.Provider value={contextValue}>
      <div 
        ref={dockRef}
        className="dock-container"
      >
        <div className="dock">
          {children}
        </div>
      </div>
    </DockContext.Provider>
  );
};

// Componente DockItem
const DockItem = ({ id, icon, label }) => {
  const { hoveredItem, setHoveredItem, activeItem, setActiveItem } = useDockContext();
  const isHovered = hoveredItem === id;
  const isActive = activeItem === id;

  return (
    <div 
      className={`dock-item ${isActive ? 'dock-item-active' : ''}`}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a 
        href={`#${id}`}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector(`#${id}`).scrollIntoView({
            behavior: 'smooth'
          });
          setActiveItem(id);
        }}
      >
        <div 
          className="dock-icon-container"
          style={{
            transform: isHovered ? 'scale(1.2) translateY(-10px)' : isActive ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
          }}
        >
          {icon}
        </div>
        <div className={`dock-label ${isHovered || isActive ? 'dock-label-visible' : ''}`}>
          {label}
        </div>
        {isActive && <div className="dock-dot"></div>}
      </a>
    </div>
  );
};

// Asignar componentes para el patrón de Compound Components
Dock.Item = DockItem;

export default Dock;