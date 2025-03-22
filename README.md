# Portfolio React + Vite

Este es un portafolio moderno y dinámico construido con React y Vite, que presenta efectos visuales avanzados y componentes interactivos, con un diseño de tema oscuro elegante y de alto contraste.

## ✨ Características

- 🎨 Fondos animados interactivos (Aurora, Iridiscencia, Partículas)
- ✨ Efectos visuales avanzados con WebGL y Canvas
- 🌟 Animaciones de scroll con ScrollReveal y efectos de secuenciación
- 🎯 Componentes interactivos (BounceCard, SpotlightCard, GlassIcon)
- 🌈 Efectos de hover y transiciones suaves
- 📱 Diseño totalmente responsive
- 🚀 Optimización de rendimiento
- 🎭 Efectos de glassmorphism
- 📄 Visor de PDF integrado con controles avanzados
- 🌙 Tema oscuro elegante con gradientes y alto contraste

## 🎨 Diseño y Tema

El portafolio utiliza un sofisticado tema oscuro con:

- Gradiente de fondo negro azulado con sutiles efectos iridiscentes
- Tipografía de alto contraste con gradientes blanco-gris
- Tarjetas con efecto glassmorphism y bordes sutiles
- Componentes interactivos adaptados al tema oscuro
- Efectos visuales que complementan la atmósfera elegante

## 🛠 Tecnologías Utilizadas

- React
- Vite
- TailwindCSS
- WebGL/Canvas para efectos visuales
- PostCSS
- React Hooks avanzados
- Intersection Observer API
- WebGL Shaders personalizados

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
  │   ├── LanguageSwitcher.jsx
  │   ├── MagicCard.jsx
  │   ├── ProjectCard.jsx
  │   ├── ScrollReveal.jsx
  │   ├── SkillBar.jsx
  │   └── SpotlightCard.jsx
  ├── assets/              # Recursos estáticos
  │   ├── Alisha.pdf      # CV en formato PDF
  │   └── react.svg       # Otros recursos
  ├── locales/            # Archivos de internacionalización
  │   ├── de/             # Alemán
  │   ├── en/             # Inglés
  │   └── es/             # Español
  ├── App.jsx             # Componente principal
  ├── BentoLayout.css     # Estilos para el layout tipo Bento
  ├── i18n.js             # Configuración de internacionalización
  └── main.jsx            # Punto de entrada
```

## 📦 Componentes Principales

### Fondos Animados
- **AnimatedBackground**: Sistema de partículas interactivas
- **AuroraBackground**: Efecto aurora boreal animado con Canvas
- **IridescenceBackground**: Efecto iridiscente avanzado con shaders WebGL y gradientes oscuros

### Componentes UI
- **BounceCard**: Tarjetas con efecto de rebote, rotación 3D y resplandor, adaptadas al tema oscuro
- **SpotlightCard**: Tarjetas con efecto spotlight y visor de PDF integrado, con contraste optimizado
- **GlassIcon**: Iconos con efecto glassmorphism y efectos de brillo
- **Dock**: Barra de navegación estilo macOS con efectos de hover y animaciones suaves

## 🔍 Características Detalladas

### ScrollReveal
- Animaciones activadas mediante Intersection Observer
- Múltiples tipos de animación predefinidos
- Personalización de duración, retraso y umbral de activación
- Agrupación de elementos con retraso secuencial

### SpotlightCard
- Efecto spotlight que sigue al cursor
- Visor de PDF integrado con:
  - Navegación entre páginas
  - Controles de zoom
  - Descarga directa
  - Modo pantalla completa
  - Indicador de carga

### GlassIcon
- Efecto glassmorphism con blur
- Animación de brillo al hover
- Tooltips informativos

### AuroraBackground y IridescenceBackground
- Efectos visuales generados dinámicamente
- Interacción con el movimiento del cursor
- Optimización de rendimiento con Canvas/WebGL

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye el proyecto para producción
- `npm run preview`: Preview de la build de producción

## 🎨 Personalización

Los componentes están diseñados para ser altamente personalizables mediante props:

- Colores, velocidades y intensidades de efectos
- Duración y estilos de animaciones
- Configuración del visor de PDF
- Umbrales de activación para ScrollReveal

## 📱 Responsive Design

El portafolio está optimizado para diferentes tamaños de pantalla:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## ⚡ Optimización de Rendimiento

- Lazy loading de componentes pesados
- Optimización de efectos visuales con requestAnimationFrame
- Limpieza adecuada de recursos en useEffect
- Minimización de re-renders con useRef y useState estratégico
- Code splitting automático con Vite

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como base para tu portafolio

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.
