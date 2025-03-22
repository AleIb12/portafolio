import React, { useState, useRef, useEffect } from 'react';
import AlishaCV from '../assets/Alishacv.pdf'; // Corregido el nombre del archivo PDF

// Componente SpotlightCard usando patrones de React Bits:
// - UseRef para referencias DOM
// - Gestión de eventos con cleanup
// - Visor de PDF integrado usando iframe
// - Efecto spotlight avanzado

const SpotlightCard = ({ 
  title, 
  description, 
  buttonText = 'Ver CV',
  buttonLink = AlishaCV, // Usar el PDF importado como valor predeterminado
  icon,
  bgColor = 'rgba(255, 255, 255, 0.04)', // Fondo más claro para contraste
  spotlightColor = 'rgba(255, 255, 255, 0.07)', // Spotlight más sutil
  className = '',
  ...props 
}) => {
  const cardRef = useRef(null);
  const iframeRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [zoomChanging, setZoomChanging] = useState(false);
  
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
  
  // Abrir el visualizador de PDF
  const handleOpenPdf = () => {
    setIsPdfOpen(true);
    // Prevenir scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };
  
  // Cerrar el visualizador de PDF
  const handleClosePdf = () => {
    setIsPdfOpen(false);
    // Restaurar scroll
    document.body.style.overflow = 'auto';
  };

  // Cambio de página
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages || 999));
  };

  // Zoom del PDF mejorado para evitar recargas infinitas
  const zoomIn = () => {
    setZoomChanging(true);
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setZoomChanging(true);
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  // Resetear zoom
  const resetZoom = () => {
    setZoomChanging(true);
    setScale(1.0);
  };
  
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

  // Efecto para actualizar el iframe cuando cambia el zoom o la página
  useEffect(() => {
    if (isPdfOpen && iframeRef.current) {
      if (zoomChanging) {
        // Solo mostrar indicador de carga durante cambios de zoom
        setIsLoading(true);
        
        try {
          // Usar postMessage para cambiar el zoom si está disponible (más eficiente)
          const iframe = iframeRef.current;
          const pdfViewerApp = iframe.contentWindow?.PDFViewerApplication;
          
          if (pdfViewerApp && pdfViewerApp.pdfViewer) {
            // Intentar usar API interna del visor de PDF si está disponible
            pdfViewerApp.pdfViewer.currentScale = scale;
            setTimeout(() => {
              setIsLoading(false);
              setZoomChanging(false);
            }, 500);
          } else {
            // Caer en el enfoque de actualizar src si la API no está disponible
            const newSrc = `${buttonLink}#page=${currentPage}&view=FitH&zoom=${scale}`;
            iframe.src = newSrc;
          }
        } catch (error) {
          console.log("Error al aplicar zoom:", error);
          // Si falla, actualizar src como fallback
          const newSrc = `${buttonLink}#page=${currentPage}&view=FitH&zoom=${scale}`;
          iframeRef.current.src = newSrc;
        }
      } else if (currentPage) {
        // Para cambios de página, usar un enfoque más ligero
        try {
          const iframe = iframeRef.current;
          // Intentar usar API para cambiar de página
          const pdfViewerApp = iframe.contentWindow?.PDFViewerApplication;
          
          if (pdfViewerApp && pdfViewerApp.page !== currentPage) {
            pdfViewerApp.page = currentPage;
          }
        } catch (error) {
          // Ignorar silenciosamente
        }
      }
    }
  }, [scale, currentPage, isPdfOpen, buttonLink, zoomChanging]);

  // Efecto para detectar el número total de páginas
  useEffect(() => {
    if (isPdfOpen) {
      // Intentamos obtener información sobre el número total de páginas cuando el PDF está cargado
      const checkPdfLoaded = () => {
        const iframe = document.getElementById('pdf-viewer');
        if (iframe) {
          setIsLoading(false);
          // Algunas PDFs exponen el número de páginas a través de la API del visor
          try {
            // Este método es solo un intento, puede no funcionar en todos los navegadores
            const pdfDocument = iframe.contentWindow?.PDFViewerApplication?.pdfDocument;
            if (pdfDocument) {
              setTotalPages(pdfDocument.numPages);
            }
          } catch (error) {
            console.log("No se pudo obtener el número total de páginas automáticamente");
          }
        }
      };

      // Damos tiempo para que el PDF se cargue antes de intentar acceder a la información
      setTimeout(checkPdfLoaded, 1500);
    }
  }, [isPdfOpen]);
  
  return (
    <>
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
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 10px 30px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
          maxWidth: '400px',
          width: '100%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
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
          color: 'rgba(255, 255, 255, 0.95)', 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 2,
          background: 'linear-gradient(90deg, #ffffff, #dddddd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          {title}
        </h3>
        
        <p style={{ 
          marginBottom: '2rem', 
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1rem',
          position: 'relative',
          zIndex: 2,
          lineHeight: '1.6'
        }}>
          {description}
        </p>
        
        <button 
          onClick={() => window.open(buttonLink, '_blank')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(230, 230, 230, 0.9))',
            color: '#111',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
            boxShadow: isHovered 
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          {buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }}>
            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Modal para visualizar el PDF */}
      {isPdfOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
        >
          {/* Barra superior con controles */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1000px',
              marginBottom: '1rem',
            }}
          >
            {/* Controles de navegación */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                style={{
                  backgroundColor: currentPage <= 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Página anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>
                Página {currentPage} {totalPages ? `de ${totalPages}` : ''}
              </span>
              <button
                onClick={goToNextPage}
                disabled={totalPages && currentPage >= totalPages}
                style={{
                  backgroundColor: totalPages && currentPage >= totalPages ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: totalPages && currentPage >= totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Página siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Controles de zoom */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={zoomOut}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Reducir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button
                onClick={resetZoom}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={zoomIn}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Ampliar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button
                onClick={handleClosePdf}
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  marginLeft: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Contenedor del visor PDF */}
          <div
            style={{
              width: '100%',
              maxWidth: '1000px',
              height: 'calc(100% - 100px)',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Indicador de carga */}
            {isLoading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                zIndex: 10
              }}>
                <div style={{
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '4px solid rgba(79, 70, 229, 1)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  animation: 'spin 1s linear infinite',
                }}>
                  <style>
                    {`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                </div>
              </div>
            )}
            
            {/* Visor de PDF con iframe */}
            <iframe
              id="pdf-viewer"
              ref={iframeRef}
              src={`${buttonLink}#page=${currentPage}&view=FitH&zoom=${scale}`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Visor de CV"
              onLoad={() => {
                // Solo cuando se carga inicialmente o si realmente hubo un cambio en la fuente
                if (!zoomChanging) {
                  // Dar tiempo para que se cargue el PDF completamente
                  setTimeout(() => setIsLoading(false), 1000);
                } else {
                  // Si estamos cambiando el zoom, limpiar el estado
                  setZoomChanging(false);
                  setTimeout(() => setIsLoading(false), 500);
                }
              }}
            />
          </div>
          
          {/* Barra inferior con acciones adicionales */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '1000px',
              marginTop: '1rem',
              gap: '1rem',
            }}
          >
            <a
              href={buttonLink}
              download
              style={{
                backgroundColor: 'rgba(79, 70, 229, 1)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: '500',
                textDecoration: 'none',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Descargar CV
            </a>
            <button
              onClick={() => window.open(buttonLink, '_blank')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Abrir en nueva pestaña
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotlightCard;