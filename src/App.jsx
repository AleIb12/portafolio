import { useState } from 'react'
import './App.css'
import './BentoLayout.css'
import ProjectCard from './components/ProjectCard'
import SkillBar from './components/SkillBar'
import ContactForm from './components/ContactForm'
import Dock from './components/Dock'
import IridescenceBackground from './components/IridescenceBackground'
import BounceCard from './components/BounceCard'
import ScrollReveal, { 
  SlideUp, 
  SlideRight, 
  SlideLeft, 
  FadeIn, 
  ScaleIn,
  ScrollRevealGroup 
} from './components/ScrollReveal'
import GlassIcon from './components/GlassIcon'
import SpotlightCard from './components/SpotlightCard'

function App() {
  const handleContactSubmit = (formData) => {
    console.log("Formulario enviado:", formData);
    // Aquí se podría implementar el envío real del formulario
  };

  return (
    <IridescenceBackground>
      <div className="portfolio-container">
        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* Hero Section - Título Principal */}
          <div className="bento-item bento-span-6 bento-row-span-2 bento-color-1 bento-pattern-dots" id="inicio">
            <div className="bento-hero">
              <FadeIn delay={300} duration={1200}>
                <h1 className="bento-hero-title">Alisha</h1>
              </FadeIn>
              <SlideUp delay={600} duration={1000}>
                <p className="bento-hero-subtitle">Desarrolladora Web | Programadora | Entusiasta de la Tecnología</p>
              </SlideUp>
              <ScaleIn delay={900} duration={800}>
                <a href="#contacto" className="btn btn-primary">Contáctame</a>
              </ScaleIn>
            </div>
          </div>

          {/* CV Card */}
          <div className="bento-item bento-span-6 bento-color-2" id="cv">
            <SlideUp delay={1200} duration={1000}>
              <SpotlightCard 
                title="¿Quieres saber más sobre mí?"
                description="Descarga mi currículum completo para conocer más sobre mi formación, experiencia y habilidades."
                buttonText="Descargar CV"
                buttonLink="/assets/Alishacv.pdf" 
                icon={
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '30px', height: '30px', color: 'white'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                }
              />
            </SlideUp>
          </div>

          {/* Sobre Mí - Card Principal */}
          <div className="bento-item bento-span-8 bento-color-3" id="sobre-mi">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Sobre Mí</h2>
            </ScrollReveal>
            <div className="bento-about">
              <FadeIn delay={200} duration={1000}>
                <p className="bento-about-text">
                  Profesional joven, motivada y entusiasta en busca de oportunidades para iniciar y desarrollar su carrera.
                  Con una sólida formación técnica, excelentes habilidades de comunicación y gran capacidad para el trabajo en equipo.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Card Conocimientos técnicos */}
          <div className="bento-item bento-span-4 bento-color-4">
            <ScrollReveal animation="fadeIn" delay={200}>
              <BounceCard
                title="Conocimientos técnicos"
                description="Nivel intermedio en Java, PHP, SQL y JavaScript, con experiencia en proyectos prácticos y aplicaciones web funcionales."
                color="#4f46e5"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                  </svg>
                }
              />
            </ScrollReveal>
          </div>

          {/* Card Pasión por la tecnología */}
          <div className="bento-item bento-span-4 bento-color-5">
            <ScrollReveal animation="fadeIn" delay={300}>
              <BounceCard
                title="Pasión por la tecnología"
                description="Apasionada por la tecnología y con ganas de aplicar conocimientos teóricos y habilidades prácticas para contribuir al éxito de organizaciones innovadoras."
                color="#8b5cf6"
                iconBgColor="rgba(139, 92, 246, 0.1)"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                }
              />
            </ScrollReveal>
          </div>

          {/* Card Resolución de problemas */}
          <div className="bento-item bento-span-4 bento-color-1">
            <ScrollReveal animation="fadeIn" delay={400}>
              <BounceCard
                title="Resolución de problemas"
                description="Habilidad para la resolución de problemas y pensamiento crítico para afrontar desafíos con creatividad y eficiencia."
                color="#14b8a6"
                iconBgColor="rgba(20, 184, 166, 0.1)"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                  </svg>
                }
              />
            </ScrollReveal>
          </div>

          {/* Card Comunicación */}
          <div className="bento-item bento-span-4 bento-color-2">
            <ScrollReveal animation="fadeIn" delay={500}>
              <BounceCard
                title="Comunicación efectiva"
                description="Excelentes habilidades de comunicación, tanto escrita como verbal, y facilidad para el trabajo en equipo y colaboración."
                color="#f97316" 
                iconBgColor="rgba(249, 115, 22, 0.1)"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                  </svg>
                }
              />
            </ScrollReveal>
          </div>

          {/* Habilidades - Lenguajes de Programación */}
          <div className="bento-item bento-span-4 bento-row-span-2 bento-color-3 bento-pattern-lines" id="habilidades">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Lenguajes</h2>
            </ScrollReveal>
            <div className="bento-skills">
              <SkillBar.Container>
                <SkillBar name="Java" percentage={75} />
                <SkillBar name="PHP" percentage={75} />
                <SkillBar name="SQL" percentage={80} />
                <SkillBar name="JavaScript" percentage={75} />
              </SkillBar.Container>
            </div>
          </div>

          {/* Habilidades - Técnicas */}
          <div className="bento-item bento-span-4 bento-row-span-2 bento-color-4">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Habilidades Técnicas</h2>
            </ScrollReveal>
            <div className="bento-skills">
              <SkillBar.Container>
                <SkillBar name="React" percentage={60} />
                <SkillBar name="HTML/CSS" percentage={80} />
                <SkillBar name="Git" percentage={60} />
                <SkillBar name="Bases de Datos" percentage={80} />
              </SkillBar.Container>
            </div>
          </div>

          {/* Habilidades - Blandas */}
          <div className="bento-item bento-span-4 bento-row-span-2 bento-color-5">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Habilidades Blandas</h2>
            </ScrollReveal>
            <div className="bento-skills">
              <SkillBar.Container>
                <SkillBar name="Comunicación" percentage={90} />
                <SkillBar name="Trabajo en equipo" percentage={90} />
                <SkillBar name="Adaptabilidad" percentage={80} />
                <SkillBar name="Resolución de problemas" percentage={80} />
              </SkillBar.Container>
            </div>
          </div>

          {/* Proyecto 1 - Pokémon */}
          <div className="bento-item bento-span-3 bento-color-1" id="proyectos">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Proyectos</h2>
            </ScrollReveal>
            <SlideUp delay={200} duration={1000}>
              <ProjectCard
                title="Galería de Cartas Pokémon"
                description="Aplicación web para visualizar y explorar una colección de cartas Pokémon con detalles y características de cada una."
                tags={["HTML", "CSS", "JavaScript", "API REST"]}
                link="https://projecto-pokemon.vercel.app/"
                linkText="Ver proyecto"
                imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              />
            </SlideUp>
          </div>

          {/* Proyecto 2 - Piano React */}
          <div className="bento-item bento-span-3 bento-color-2">
            <SlideUp delay={400} duration={1000}>
              <ProjectCard
                title="Piano Virtual Interactivo"
                description="Un piano virtual completamente funcional desarrollado con React, que permite tocar melodías utilizando el teclado o el ratón."
                tags={["React", "JavaScript", "Web Audio API", "CSS"]}
                link="https://piano-six-kappa.vercel.app/"
                linkText="Ver proyecto"
                imageUrl="https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </SlideUp>
          </div>

          {/* Proyecto 3 - Chat Java */}
          <div className="bento-item bento-span-3 bento-color-3">
            <SlideUp delay={600} duration={1000}>
              <ProjectCard
                title="Chat en Tiempo Real"
                description="Aplicación de chat desarrollada en Java utilizando sockets para comunicación en tiempo real entre múltiples usuarios."
                tags={["Java", "Sockets", "Multithreading", "GUI Swing"]}
                link="https://github.com/Maurigoo/WsChat/tree/Rama_Interfaz"
                linkText="Ver código"
                imageUrl="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </SlideUp>
          </div>

          {/* Proyecto 4 - API REST Salud App */}
          <div className="bento-item bento-span-3 bento-color-4">
            <SlideUp delay={800} duration={1000}>
              <ProjectCard
                title="API REST Salud App"
                description="API desarrollada en Dart que permite gestionar pacientes, doctores y citas médicas mediante peticiones HTTP."
                tags={["Dart", "API REST", "HTTP", "Gestión Médica"]}
                link="https://github.com/AleIb12/SaludApp_RestServicio/tree/main/medical_api"
                linkText="Ver código"
                imageUrl="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </SlideUp>
          </div>

          {/* Contacto */}
          <div className="bento-item bento-span-8 bento-color-4 bento-pattern-dots" id="contacto">
            <ScrollReveal animation="slideUp">
              <h2 className="bento-section-title">Contáctame</h2>
            </ScrollReveal>
            <div className="bento-contact">
              <FadeIn delay={300} duration={1000}>
                <ContactForm onSubmit={handleContactSubmit} />
              </FadeIn>

              <ScrollReveal animation="slideUp" delay={600}>
                <div className="bento-social-links">
                  {/* GitHub Glass Icon */}
                  <GlassIcon 
                    href="https://github.com/AleIb12"  
                    label="GitHub"
                    size={50}
                    glowColor="#4f46e5"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    }
                  />
                  
                  {/* LinkedIn Glass Icon */}
                  <GlassIcon 
                    href="https://www.linkedin.com/in/alisha-ibarra-bello-4526561b6/" 
                    label="LinkedIn"
                    size={50}
                    glowColor="#0077b5"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    }
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Información Adicional o Banner */}
          <div className="bento-item bento-span-4 bento-color-5">
            <div className="bento-about">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Seguir aprendiendo</h3>
              <p>Constantemente ampliando mis conocimientos en nuevas tecnologías y metodologías de desarrollo.</p>
            </div>
          </div>

          {/* Footer en estilo bento */}
          <div className="bento-item bento-span-12 bento-color-1" style={{ textAlign: 'center' }}>
            <FadeIn>
              <p>© {new Date().getFullYear()} Alisha Ibarra - Todos los derechos reservados</p>
            </FadeIn>
          </div>
        </div>

        {/* Dock para navegación estilo macOS - Mantenerlo fuera del grid bento para que sea flotante */}
        <Dock>
          <Dock.Item 
            id="inicio" 
            label="Inicio" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.031-.028.061-.056.091-.086L12 5.43z" />
              </svg>
            }
          />
          <Dock.Item 
            id="sobre-mi" 
            label="Sobre mí" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            }
          />
          <Dock.Item 
            id="habilidades" 
            label="Habilidades" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
              </svg>
            }
          />
          <Dock.Item 
            id="proyectos" 
            label="Proyectos" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
              </svg>
            }
          />
          <Dock.Item 
            id="contacto" 
            label="Contacto" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            }
          />
        </Dock>
      </div>
    </IridescenceBackground>
  )
}

export default App
