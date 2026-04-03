import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardPage.css';

gsap.registerPlugin(ScrollTrigger);

const MOCK_LOGS = [
  "SYS_INIT: OK",
  "PCSC_READER_1: CONNECTED",
  "POLLING_ISO14443A...",
  "UID_DETECTED: 04:A2:8E...",
  "AUTH_HANDSHAKE_INIT",
  "DECRYPT_SESSION_KEY...",
  "TOKEN_VERIFIED(2048bit)",
  "ACCESS_GRANTED_SEC_4",
  "DB_SYNC_LATENCY: 12ms",
  "UPTIME: 99.98%",
  "LOAD_BALANCER: OPTIMAL",
  "ENCRYPT_KEY_GEN_256..."
];

const TerminalLogs = ({ position }: { position: string }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let iteration = Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = `> ${MOCK_LOGS[iteration % MOCK_LOGS.length]}`;
        const updated = [...prev, newLog];
        if (updated.length > 4) updated.shift();
        return updated;
      });
      iteration++;
    }, 1200 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`telemetry-node pos-${position}`}>
      {logs.map((log, i) => (
        <div key={i} className="log-line">{log}</div>
      ))}
      <div className="log-cursor">_</div>
    </div>
  );
};

const CardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to('.bg-verified', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Token entrance
      gsap.fromTo('.glass-token', 
        { scale: 0.8, opacity: 0, rotateY: 15, rotateX: 10 },
        { scale: 1, opacity: 1, rotateY: 0, rotateX: 0, duration: 2, ease: 'power3.out' }
      );

      // Entrance staggered logs
      gsap.fromTo('.telemetry-node', 
        { opacity: 0 }, 
        { opacity: 0.4, duration: 1, stagger: 0.2, delay: 0.5 }
      );
      
      // Glitch text entrance
      gsap.fromTo('.glitch-title', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, delay: 0.8, ease: 'power2.out' }
      );
      
    }, containerRef);

    // Minor 3D hover on token
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to('.glass-token', {
        rotateY: x * 30,
        rotateX: -y * 30,
        transformPerspective: 1000,
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

  const contacts = [
    { label: 'WA', detail: '+233 256614336', href: 'https://wa.me/233256614336' },
    { label: 'TEL', detail: '+233 256614336', href: 'tel:+233256614336' },
  ];

  return (
    <div className="card-page-void pulse-ui" ref={containerRef}>
      <div className="bg-verified">VERIFIED</div>
      <div className="ambient-ember pulse-ambient"></div>

      <TerminalLogs position="tl" />
      <TerminalLogs position="tr" />
      <TerminalLogs position="bl" />
      <TerminalLogs position="br" />

      <header className="logo-header ui-overlay">
        <Link to="/" className="site-logo">
          null<span className="ember-text">base</span>
        </Link>
      </header>

      {/* Main Pulse Focal Point */}
      <div className="system-core">
        {/* Expanding Rings */}
        <div className="pulse-wave wave-1"></div>
        <div className="pulse-wave wave-2"></div>
        <div className="pulse-wave wave-3"></div>

        {/* Huge Typo Intersecting Behind */}
        <div className="typo-infrastructure">INFRASTRUCTURE</div>

        {/* Central Glassmorphic Token */}
        <div className="glass-token">
          <div className="token-glow"></div>
          {/* Glowing NFC Coil SVG */}
          <svg className="nfc-coil" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="20" width="70" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="25" y="30" width="50" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="35" y="40" width="30" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="4" fill="currentColor" className="sensor-core" />
          </svg>
          <div className="token-chip"></div>
        </div>

        <h1 className="glitch-title" data-text="NFC VERIFICATION">NFC VERIFICATION</h1>
      </div>

      <section className="terminal-footer ui-overlay">
        <div className="label-header">
           <h2 className="terminal-subtitle">SYSTEM STATUS: <span className="ember-text blink">ACTIVE</span></h2>
        </div>

        <div className="label-body">
           <p className="monospace-desc">
             Architecting digital infrastructure that scales silently. 
             Secure identity verification protocol running flawlessly.
           </p>
        </div>

        <div className="label-footer">
          <div className="spec-list">
            {contacts.map((item, idx) => (
              <a key={idx} href={item.href} className="spec-item mono-spec">
                <span className="spec-label">[{item.label}]</span>
                <span className="spec-value">{item.detail}</span>
                <ArrowUpRight size={14} className="spec-arrow" />
              </a>
            ))}
          </div>
        </div>

        <nav className="label-nav">
          <Link to="/" className="nav-exhibit-btn mono-btn">
            &gt; RETURN TO CORE_INDEX
          </Link>
        </nav>
      </section>

    </div>
  );
};

export default CardPage;

