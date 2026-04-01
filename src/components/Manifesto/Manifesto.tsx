import React, { useEffect, useRef, useState } from 'react';
import './Manifesto.css';

const Manifesto: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="manifesto" 
      className={`manifesto-section ${isVisible ? 'visible' : ''}`} 
      ref={sectionRef}
    >
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
