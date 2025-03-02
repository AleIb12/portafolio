import React, { useEffect, useRef } from 'react';

// Componente IridescenceBackground usando patrones de React Bits:
// - useRef para acceso directo al DOM
// - useEffect para manejar el ciclo de vida y limpiar recursos
// - WebGL para renderizado eficiente
// - Shaders para efectos visuales avanzados

// Fragment shader para el efecto iridiscente
const fragmentShader = `
  precision mediump float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  // Función para generar un efecto de ruido simplex
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Función para generar colores iridiscentes
  vec3 iridescence(float angle, float intensity) {
    // Colores bases de React Bits
    vec3 color1 = vec3(0.24, 0.27, 0.90);  // Azul React Bits (#4F46E5)
    vec3 color2 = vec3(0.56, 0.39, 0.94);  // Púrpura (#8E64EE)
    vec3 color3 = vec3(0.31, 0.75, 0.90);  // Azul claro (#4FBFE6)
    
    float t1 = cos(angle + u_time * 0.5) * 0.5 + 0.5;
    float t2 = cos(angle + u_time * 0.5 + 2.094) * 0.5 + 0.5;
    float t3 = cos(angle + u_time * 0.5 + 4.188) * 0.5 + 0.5;
    
    return mix(mix(color1, color2, t1), color3, t2) * intensity;
  }
  
  void main() {
    // Normalizar coordenadas
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 center = vec2(0.5, 0.5);
    
    // Calcular distancia y ángulo desde el centro
    float dist = length(uv - center);
    
    // Crear variaciones usando ruido
    float noise_val = snoise(uv * 3.0 + u_time * 0.1) * 0.5 + 0.5;
    float angle = atan(uv.y - center.y, uv.x - center.x);
    
    // Generar patrón de ondas
    float waves = sin(dist * 20.0 - u_time * 0.5) * 0.5 + 0.5;
    
    // Influencia del mouse
    vec2 mouseNorm = u_mouse / u_resolution;
    float mouseDist = length(uv - mouseNorm) * 2.0;
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
    
    // Combinar efectos
    vec3 baseColor = vec3(0.05, 0.05, 0.1); // Color oscuro de fondo
    vec3 iridColor = iridescence(angle + noise_val * 2.0, 1.0);
    
    // Ajustar intensidad basado en ondas y mouse
    float intensity = waves * 0.3 + mouseInfluence * 0.7 + 0.2;
    vec3 finalColor = mix(baseColor, iridColor, intensity);
    
    // Suavizar bordes
    finalColor *= smoothstep(1.0, 0.7, dist);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Vertex shader (simple)
const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
  }
`;

const IridescenceBackground = ({ children, className = '', style = {} }) => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(Date.now());
  const animationRef = useRef(null);
  const programInfoRef = useRef(null);
  const bufferInfoRef = useRef(null);

  // Inicializar y configurar WebGL
  const setupWebGL = (canvas) => {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL no está disponible en este navegador.');
      return null;
    }

    // Crear shader program
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertexShader);
    gl.compileShader(vertShader);

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragmentShader);
    gl.compileShader(fragShader);

    // Verificar errores en shaders
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error('Error en vertex shader:', gl.getShaderInfoLog(vertShader));
      return null;
    }
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error('Error en fragment shader:', gl.getShaderInfoLog(fragShader));
      return null;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Error al crear el programa de shader:', gl.getProgramInfoLog(program));
      return null;
    }

    // Crear buffer con dos triangulos que cubren toda la pantalla
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Obtener ubicaciones de atributos y uniformes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    // Guardar referencia a la información del programa
    programInfoRef.current = {
      program,
      attribLocations: {
        position: positionLocation,
      },
      uniformLocations: {
        time: timeLocation,
        resolution: resolutionLocation,
        mouse: mouseLocation,
      },
    };

    bufferInfoRef.current = {
      position: positionBuffer,
    };

    return gl;
  };

  // Función de dibujo
  const drawScene = (gl) => {
    const programInfo = programInfoRef.current;
    const buffers = bufferInfoRef.current;
    if (!programInfo || !buffers) return;

    // Establecer tamaño del viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Usar el programa shader
    gl.useProgram(programInfo.program);

    // Vincular buffer de posición
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.enableVertexAttribArray(programInfo.attribLocations.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.position,
      2,          // 2 componentes por vertex
      gl.FLOAT,   // tipo de datos
      false,      // no normalizar
      0,          // stride
      0           // offset
    );

    // Enviar uniformes
    const timeInSeconds = (Date.now() - startTimeRef.current) * 0.001;
    gl.uniform1f(programInfo.uniformLocations.time, timeInSeconds);
    gl.uniform2f(
      programInfo.uniformLocations.resolution,
      gl.canvas.width,
      gl.canvas.height
    );
    gl.uniform2f(
      programInfo.uniformLocations.mouse,
      mousePosition.current.x,
      gl.canvas.height - mousePosition.current.y
    );

    // Dibujar los triangulos
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  // Inicializar y limpiar WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Función para ajustar el tamaño del canvas
    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Inicializar WebGL
    const gl = setupWebGL(canvas);
    if (!gl) return;

    // Función para seguir el mouse
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    // Función para manejar eventos touch
    const handleTouchMove = (event) => {
      if (event.touches && event.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        };
      }
    };

    // Loop de animación
    const renderLoop = () => {
      drawScene(gl);
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    // Iniciar animación y eventos
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    renderLoop();

    // Limpieza
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Limpiar recursos WebGL
      if (gl && bufferInfoRef.current) {
        gl.deleteBuffer(bufferInfoRef.current.position);
        if (programInfoRef.current) {
          gl.deleteProgram(programInfoRef.current.program);
        }
      }
    };
  }, []);

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

export default IridescenceBackground;