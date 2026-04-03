import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardPage.css';

gsap.registerPlugin(ScrollTrigger);

const CardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very faint background Parallax
      gsap.to('.bg-verified', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Monolith heavy entrance
      gsap.fromTo('.monolith-token', 
        { scale: 0.85, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 2.5, ease: 'power4.out', delay: 0.2 }
      );
      
      // Clean text entrance
      gsap.fromTo('.clean-title', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, delay: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.system-badge',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1, delay: 1, ease: 'power2.out' }
      );
      
    }, containerRef);

    // Minor 3D hover on token
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Very subtle for the monolith. Feels heavier.
      gsap.to('.monolith-token-wrapper', {
        rotateY: x * 15,
        rotateX: -y * 15,
        transformPerspective: 1500,
        duration: 2.5,
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
    <div className="card-page-monolith" ref={containerRef}>
      <div className="bg-verified">VERIFIED</div>
      <div className="ambient-ember-soft"></div>

      {/* System Operational Badge */}
      <div className="system-badge">
        <div className="status-dot"></div>
        <span>System Operational</span>
      </div>

      <header className="logo-header ui-overlay">
        <Link to="/" className="site-logo">
          null<span className="ember-text">base</span>
        </Link>
      </header>

      {/* Main Focus: The Monolith */}
      <div className="system-core">
        <div className="typo-infrastructure">INFRASTRUCTURE</div>

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

        <h1 className="clean-title">NFC Identity Infrastructure</h1>
      </div>

      <section className="terminal-footer ui-overlay simple-footer">
        <div className="label-header">
           <h2 className="terminal-subtitle">Status: <span className="status-good">Online</span></h2>
        </div>

        <div className="label-body">
           <p className="clean-desc">
             High-availability identity verification. 
             Secure, physical access systems engineered for scale.
           </p>
        </div>

        <div className="label-footer">
          <div className="spec-list">
            {contacts.map((item, idx) => (
              <a key={idx} href={item.href} className="spec-item clean-spec">
                <span className="spec-label">{item.label}</span>
                <span className="spec-value">{item.detail}</span>
                <ArrowUpRight size={14} className="spec-arrow" />
              </a>
            ))}
          </div>
        </div>

        <nav className="label-nav">
          <Link to="/" className="nav-exhibit-btn clean-btn">
            Return to nullbase.co
          </Link>
        </nav>
      </section>

    </div>
  );
};

export default CardPage;

