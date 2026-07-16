import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Reusable Shader Background Hook (converted to JS)
const useShaderBackground = (shaderSource) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  // WebGL Renderer class
  class WebGLRenderer {
    constructor(canvas, scale) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2');
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = shaderSource;
      this.mouseMove = [0, 0];
      this.mouseCoords = [0, 0];
      this.pointerCoords = [0, 0];
      this.nbrOfPointers = 0;
      this.program = null;
      this.vs = null;
      this.fs = null;
      this.buffer = null;
      
      this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
      this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
    }

    updateShader(source) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas) {
      this.mouseMove = deltas;
    }

    updateMouse(coords) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader, source) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram();
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      program.resolution = gl.getUniformLocation(program, 'resolution');
      program.time = gl.getUniformLocation(program, 'time');
      program.move = gl.getUniformLocation(program, 'move');
      program.touch = gl.getUniformLocation(program, 'touch');
      program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
      program.pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(program.time, now * 1e-3);
      gl.uniform2f(program.move, ...this.mouseMove);
      gl.uniform2f(program.touch, ...this.mouseCoords);
      gl.uniform1i(program.pointerCount, this.nbrOfPointers);
      gl.uniform2fv(program.pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    constructor(element, scale) {
      this.scale = scale;
      this.active = false;
      this.pointers = new Map();
      this.lastCoords = [0, 0];
      this.moves = [0, 0];
      
      const map = (element, scale, x, y) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Set initial size
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    const resize = () => {
      if (!canvas) return;
      const newDpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * newDpr;
      canvas.height = window.innerHeight * newDpr;
      
      if (rendererRef.current) {
        rendererRef.current.updateScale(newDpr);
      }
    };

    if (rendererRef.current.test(shaderSource) === null) {
      rendererRef.current.updateShader(shaderSource);
    }
    
    const loop = (now) => {
      if (!rendererRef.current || !pointersRef.current) return;
      
      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, [shaderSource]);

  return canvasRef;
};

// Shader source adapted for a modern purple/aurora gradient to match the screenshot theme
const shaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;

#define FC gl_FragCoord.xy
#define T (time * 0.3)
#define R resolution

void main(void) {
    // Normalize pixel coordinates
    vec2 uv = FC.xy / R.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= R.x / R.y;
    
    // Fluid distortion loop
    for(float i = 1.0; i < 6.0; i++) {
        p.x += 0.3 / i * cos(i * 2.0 * p.y + T);
        p.y += 0.3 / i * cos(i * 1.5 * p.x + T);
    }
    
    // Base dark color (deep purple/blue)
    vec3 col = vec3(0.05, 0.02, 0.1);
    
    // Mix fluid colors 
    float c1 = sin(p.x + T) * 0.5 + 0.5;
    float c2 = cos(p.y - T * 0.8) * 0.5 + 0.5;
    float c3 = sin(p.x - p.y + T * 1.2) * 0.5 + 0.5;
    
    // Violet and purple shades to match the screenshot
    vec3 color1 = vec3(0.4, 0.1, 0.8); // Deep Violet
    vec3 color2 = vec3(0.2, 0.1, 0.6); // Indigo
    vec3 color3 = vec3(0.6, 0.2, 0.9); // Bright Purple
    
    col = mix(col, color1, c1 * 0.5);
    col = mix(col, color2, c2 * 0.4);
    col = mix(col, color3, c3 * 0.6);
    
    // Highlight glows at the center
    float glow = exp(-length(p) * 1.2);
    col += vec3(0.5, 0.2, 0.9) * glow * 0.4; // Center purple glow
    
    // Add subtle vignette
    float v = 1.0 - length((FC.xy - 0.5 * R) / R);
    col *= v * v * 1.5;
    
    O = vec4(col, 1.0);
}`;

export default function CinematicBackground() {
  const { scrollY } = useScroll();
  
  // Use a spring to make the scroll transition feel incredibly smooth (ease-in-out feel)
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  // Map 0 to 800px (roughly one viewport height, i.e., scrolling past hero)
  const blur = useTransform(smoothScrollY, [0, 800], [0, 12]);
  const scale = useTransform(smoothScrollY, [0, 800], [1, 1.08]);
  const brightness = useTransform(smoothScrollY, [0, 800], [100, 82]);
  const saturation = useTransform(smoothScrollY, [0, 800], [100, 90]);
  const opacity = useTransform(smoothScrollY, [0, 800], [1, 0.75]);
  
  const canvasRef = useShaderBackground(shaderSource);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0b0618] pointer-events-none">
      
      {/* Dynamic Master Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          scale,
          opacity,
          filter: useTransform(
            [blur, brightness, saturation],
            ([b, br, s]) => `blur(${b}px) brightness(${br}%) saturate(${s}%)`
          )
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover touch-none opacity-90"
        />
        
        {/* Ambient Purple Glow Overlays to keep the vibes */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      </motion.div>
    </div>
  );
}
