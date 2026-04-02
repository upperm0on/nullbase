import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Manifesto.css';

const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Start animation when top is 80% out
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate header and line
      tl.fromTo(['.manifesto-label', '.manifesto-line-extender'], 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
      )
      // Animate sentences
      .fromTo('.manifesto-sentence',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.2 },
        '-=0.3'
      )
      // Animate solar line
      .fromTo('.manifesto-solar-line',
        { opacity: 0, scaleX: 0, transformOrigin: 'left' },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="manifesto-section" ref={sectionRef}>
      <div className="manifesto-container">
        <div className="manifesto-header">
          <span className="manifesto-label">01 — Why we exist</span>
          <div className="manifesto-line-extender"></div>
        </div>
        
        <div className="manifesto-content">
          <p className="manifesto-sentence">Technology should be invisible.</p>
          <p className="manifesto-sentence">It should run beneath everything — silent, fast, and exact.</p>
          <p className="manifesto-sentence">
            That is what null<span className="ember-text">base</span> builds.
          </p>
        </div>

        <div className="manifesto-solar-line"></div>
      </div>
    </section>
  );
};

export default Manifesto;
