import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.footer-logo', '.footer-link', '.footer-copyright'],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-logo">
          null<span className="ember-text">base</span>
        </div>
        
        <nav className="footer-nav">
          <button onClick={() => scrollToSection('work')} className="footer-link">Work</button>
          <button onClick={() => scrollToSection('services')} className="footer-link">Services</button>
          <button onClick={() => scrollToSection('contact')} className="footer-link">Contact</button>
          <Link to="/card" className="footer-link ember-link">Digital Card</Link>
          <a 
            href="https://github.com/upperm0on" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            GitHub
          </a>
        </nav>
        
        <div className="footer-copyright">
          © 2025 Nullbase. Built from zero.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
