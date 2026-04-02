import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const whatsappLink = 'https://wa.me/233256614336';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });
      
      tl.from('.hero-label', { y: 30, opacity: 0 }, 0.2)
        .from('.line-1', { y: 40, opacity: 0 }, 0.4)
        .from('.line-2', { y: 40, opacity: 0 }, 0.6)
        .from('.hero-subheadline', { y: 30, opacity: 0 }, 0.8)
        .from('.hero-actions', { y: 30, opacity: 0 }, 1.0)
        .from(scrollIndicatorRef.current, { opacity: 0, duration: 1 }, 1.5);

      // Parallax Background using ScrollTrigger
      gsap.to(heroRef.current, {
        backgroundPosition: '50% 400px', // Move background down as you scroll down
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Fade out scroll indicator on scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'top -200px',
          scrub: true,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleStartProject = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  const handleSeeOurWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-content" ref={contentRef}>
        <span className="hero-label">Digital Infrastructure</span>
        <h1 className="hero-headline">
          <span className="line-1">Built from</span>
          <span className="line-2">zero.</span>
        </h1>
        <p className="hero-subheadline">
          We build the digital systems that run your business.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={handleStartProject}>Start a project</button>
          <button className="btn-secondary" onClick={handleSeeOurWork}>See our work</button>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
