import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Vision.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isPulse?: boolean;
}

const Vision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number | null }>({ x: 0, y: null });
  const lastMouseMoveRef = useRef<number>(0);

  // ScrollTrigger Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.vision-label', 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.vision-headline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo('.vision-paragraphs p',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.vision-stat',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.4'
      );

      // Canvas Parallax
      gsap.to(canvasWrapperRef.current, {
        yPercent: -15, // Move slightly up as you scroll past
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Canvas Fade In
      gsap.fromTo(canvasWrapperRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initNodes = (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < 40; i++) {
        const isSolar = Math.random() > 0.7;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1, // Speed 0.2 to 0.5 range approx
          vy: (Math.random() - 0.5) * 1,
          radius: Math.random() * 2 + 2,
          color: isSolar ? 'rgba(255, 208, 0, 0.4)' : 'rgba(255, 77, 0, 0.6)',
          isPulse: i === 0 // First node is the pulse node
        });
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      if (containerRef.current && canvas) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        if (nodesRef.current.length === 0) {
          initNodes(width, height);
        }
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const pulseRadius = 4 + Math.abs(Math.sin(time / 500)) * 8; // 3s cycle approx (Math.sin is 2pi)

      // Update and Draw Nodes
      nodes.forEach((node, i) => {
        // Mouse Attraction
        if (mouseRef.current.y !== null && !('ontouchstart' in window)) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            node.vx += dx * 0.0005;
            node.vy += dy * 0.0005;
          }
        }

        // Limit speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 0.5;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw Lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            if (dist < 60) {
              ctx.strokeStyle = 'rgba(255, 77, 0, 0.4)';
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = 'rgba(255, 77, 0, 0.15)';
              ctx.lineWidth = 0.5;
            }
            ctx.stroke();
          }
        }

        // Draw Node
        ctx.beginPath();
        if (node.isPulse) {
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 208, 0, 0.8)';
        } else {
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
        }
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    resize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseMoveRef.current < 16) return;
    lastMouseMoveRef.current = now;

    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.y = null;
  };

  return (
    <section id="vision" className="vision-section" ref={sectionRef}>
      <div className="container vision-grid">
        <div className="vision-visual" ref={containerRef}>
          <div className="canvas-wrapper" ref={canvasWrapperRef}>
            <canvas 
              ref={canvasRef} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>

        <div className="vision-content">
          <span className="vision-label">02 — What's possible</span>
          <h2 className="vision-headline">Infrastructure that disappears into life.</h2>
          
          <div className="vision-paragraphs">
            <p>The best technology is the kind you stop noticing. It runs beneath your restaurant, your hotel, your campus — silent, fast, and exact.</p>
            <p>null<span className="ember-text">base</span> builds that layer. The systems that handle your payments, your staff, your customers, your data — so you can focus on the thing you actually built.</p>
            <p>This is what we mean by digital infrastructure. Not a website. The foundation.</p>
          </div>

          <div className="vision-stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">of our builds run in production</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
