import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface AnimatedBackgroundProps {
  variant?: 'grid' | 'particles' | 'flow';
}

export default function AnimatedBackground({ variant = 'particles' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Animation variables
    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 100;
    
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      speedFactor: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = Math.random() * 0.4 - 0.2;
        this.directionY = Math.random() * 0.4 - 0.2;
        this.size = Math.random() * 2 + 0.5;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.25})`; // Blueish color
        this.speedFactor = Math.random() * 0.5 + 0.5;
      }
      
      update() {
        if (this.x < 0 || this.x > canvas.width) {
          this.directionX = -this.directionX;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.directionY = -this.directionY;
        }
        
        this.x += this.directionX * this.speedFactor;
        this.y += this.directionY * this.speedFactor;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    const generateParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const drawGridLines = () => {
      if (!ctx) return;
      const gridSize = 30;
      const gridOpacity = 0.07;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };
    
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (variant === 'grid' || variant === 'flow') {
        drawGridLines();
      }
      
      if (variant === 'particles' || variant === 'flow') {
        for (const particle of particles) {
          particle.update();
          particle.draw();
        }
        
        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    generateParticles();
    animate();
    
    // Add mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const repelForce = 0.1;
          particle.x -= Math.cos(angle) * repelForce;
          particle.y -= Math.sin(angle) * repelForce;
        }
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <BackgroundContainer ref={containerRef}>
      <Canvas ref={canvasRef} />
    </BackgroundContainer>
  );
}

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
