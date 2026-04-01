import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > 200) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    // Disable parallax on mobile
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      // Still need to handle scroll indicator visibility on mobile
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) setShowScrollIndicator(false);
        else setShowScrollIndicator(true);
      }, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax calculation
  const parallaxStyle = {
    backgroundPositionY: window.innerWidth >= 768 ? `calc(50% + ${scrollY * 0.4}px)` : 'center'
  };

  return (
    <section className="hero-section" style={parallaxStyle}>
      <div className="hero-content">
        <span className="hero-label">Digital Infrastructure</span>
        <h1 className="hero-headline">
          <span className="line-1">Built from</span>
          <span className="line-2">zero.</span>
        </h1>
        <p className="hero-subheadline">
          We build the digital systems that run your business.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Start a project</button>
          <button className="btn-secondary">See our work</button>
        </div>
      </div>

      {showScrollIndicator && (
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      )}
    </section>
  );
};

export default Hero;
