# Portfolio React + Vite

Este es un portafolio moderno y dinámico construido con React y Vite, que presenta efectos visuales avanzados y componentes interactivos.

## ✨ Características

- 🎨 Fondos animados interactivos (Aurora, Iridiscencia, Partículas)
- ✨ Efectos visuales avanzados con WebGL y Canvas
- 🌟 Animaciones de scroll con ScrollReveal
- 🎯 Componentes interactivos (BounceCard, SpotlightCard)
- 🌈 Efectos de hover y transiciones suaves
- 📱 Diseño totalmente responsive
- 🚀 Optimización de rendimiento
- 🎭 Efectos de glassmorphism

## 🛠 Tecnologías Utilizadas

- React
- Vite
- TailwindCSS
- WebGL/Canvas para efectos visuales
- PostCSS

## 🚀 Inicio Rápido

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd portafolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre `http://localhost:5173` en tu navegador

## 🏗 Estructura del Proyecto

```
src/
  ├── components/           # Componentes reutilizables
  │   ├── AnimatedBackground.jsx
  │   ├── AuroraBackground.jsx
  │   ├── BounceCard.jsx
  │   ├── ContactForm.jsx
  │   ├── Dock.jsx
  │   ├── GlassIcon.jsx
  │   ├── IridescenceBackground.jsx
  │   ├── ProjectCard.jsx
  │   ├── ScrollReveal.jsx
  │   ├── SkillBar.jsx
  │   └── SpotlightCard.jsx
  ├── assets/              # Recursos estáticos
  ├── App.jsx             # Componente principal
  └── main.jsx            # Punto de entrada
```

## 📦 Componentes Principales

### Fondos Animados
- **AnimatedBackground**: Sistema de partículas interactivas
- **AuroraBackground**: Efecto aurora boreal animado
- **IridescenceBackground**: Efecto iridiscente con WebGL

### Componentes UI
- **BounceCard**: Tarjetas con efecto de rebote y rotación 3D
- **SpotlightCard**: Tarjetas con efecto spotlight al hover
- **GlassIcon**: Iconos con efecto glassmorphism
- **ScrollReveal**: Animaciones al hacer scroll

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye el proyecto para producción
- `npm run preview`: Preview de la build de producción

## 🎨 Personalización

Los componentes están diseñados para ser altamente personalizables. Puedes modificar:

- Colores y temas a través de TailwindCSS
- Efectos y animaciones ajustando los parámetros de los componentes
- Estilos y layouts modificando las clases de Tailwind

## 📱 Responsive Design

El portafolio está optimizado para diferentes tamaños de pantalla:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## ⚡ Optimización de Rendimiento

- Lazy loading de componentes pesados
- Optimización de efectos visuales
- Minimización de re-renders
- Code splitting automático con Vite

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como base para tu portafolio

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.
