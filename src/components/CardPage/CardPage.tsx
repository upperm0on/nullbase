import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CardPage.css';

const CardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Monolith entrance
      gsap.fromTo('.monolith-token-wrapper', 
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.8, ease: 'expo.out', delay: 0.2 }
      );
      
      // Headline and CTA entrance
      gsap.fromTo(['.gate-headline', '.actions-hub'], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, stagger: 0.2, ease: 'power2.out' }
      );

      gsap.fromTo('.system-badge',
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1, ease: 'power2.out' }
      );
      
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to('.monolith-token-wrapper', {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 1200,
        duration: 2,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const triggerPulse = () => {
    gsap.killTweensOf('.pulse-wave-ring');
    gsap.fromTo('.pulse-wave-ring', 
      { scale: 1, opacity: 0.6, display: 'block' },
      { scale: 3, opacity: 0, duration: 1.5, ease: "power2.out", onComplete: () => {
        gsap.set('.pulse-wave-ring', { display: 'none' });
      }}
    );
  };

  const contacts = [
    { label: 'WhatsApp', detail: '+233 256614336', href: 'https://wa.me/233256614336' },
    { label: 'Email', detail: 'barimahyawamponsah1844@gmail.com', href: 'mailto:barimahyawamponsah1844@gmail.com' },
  ];

  return (
    <div className="card-page-gate" ref={containerRef}>
      <div className="ambient-radial-glow"></div>

      <div className="system-badge">
        <div className="status-dot"></div>
        <span>System Operational</span>
      </div>

      <header className="logo-header ui-overlay">
        <Link to="/" className="site-logo">
          null<span className="ember-text">base</span>
        </Link>
      </header>

      <main className="gate-content">
        <div className="monolith-token-wrapper" onClick={triggerPulse}>
          <div className="pulse-wave-ring"></div>
          <div className="monolith-token">
            <svg className="nfc-icon-clean" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8.24316C6.5 6.24316 9.5 5.24316 12 5.24316C14.5 5.24316 17.5 6.24316 20 8.24316" strokeLinecap="round"/>
              <path d="M6 12.2432C8 10.7432 10 10.2432 12 10.2432C14 10.2432 16 10.7432 18 12.2432" strokeLinecap="round"/>
              <path d="M8 16.2432C9.5 15.2432 10.5 14.7432 12 14.7432C13.5 14.7432 14.5 15.2432 16 16.2432" strokeLinecap="round"/>
              <circle cx="12" cy="19.2432" r="1" fill="currentColor" stroke="none"/>
            </svg>
            <div className="monolith-chip"></div>
          </div>
        </div>

        <h1 className="gate-headline">NFC Identity Infrastructure</h1>
        <p className="gate-subtext">Secure physical-to-digital access engineered for stability.</p>

        <div className="actions-hub">
          <Link to="/" className="primary-gate-cta">
            Enter nullbase.co
          </Link>

          <div className="secondary-contacts">
            {contacts.map((item, idx) => (
              <a key={idx} href={item.href} className="contact-chip">
                <span>{item.label}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="gate-footer">
        <span className="footer-status">Status: Online</span>
      </footer>
    </div>
  );
};

export default CardPage;

