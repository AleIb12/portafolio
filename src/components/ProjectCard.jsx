import React, { useState } from 'react';

// Componente ProjectCard usando patrones de React Bits:
// - Compound Components
// - Controlled/Uncontrolled Components
// - Higher Order Components (simulado)

// Higher Order Component para añadir animación
const withHoverAnimation = (Component) => {
  return (props) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
          height: '100%'
        }}
      >
        <Component {...props} isHovered={isHovered} />
      </div>
    );
  };
};

// Componente base
const ProjectCardBase = ({ 
  title, 
  description, 
  tags, 
  link, 
  linkText,
  imageUrl,
  isHovered 
}) => {
  return (
    <div className="project-card" style={{ height: '100%' }}>
      <div 
        className="project-image" 
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link"
          style={{
            textDecoration: isHovered ? 'underline' : 'none'
          }}
        >
          {linkText || 'Ver proyecto'} →
        </a>
      </div>
    </div>
  );
};

// Aplicamos el HOC al componente base
const ProjectCard = withHoverAnimation(ProjectCardBase);

// Componente controlado - maneja su estado externamente
export const ControlledProjectCard = ({
  isHovered,
  onMouseEnter,
  onMouseLeave,
  ...restProps
}) => {
  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ProjectCardBase {...restProps} isHovered={isHovered} />
    </div>
  );
};

export default ProjectCard;