import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
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
