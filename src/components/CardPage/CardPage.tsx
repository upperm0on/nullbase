import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { Phone, Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CardPage.css';

// 6 Highly Curated Cinematic Tech Assets (Prioritizing Black Individuals in Tech)
const movieStills = {
  front: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1500&auto=format&fit=crop', // Black man VR
  back: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1500&auto=format&fit=crop', // Black woman tech/screen
  right: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1500&auto=format&fit=crop', // Black woman scientist/hardware
  left: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1500&auto=format&fit=crop', // The Android (kept as requested)
  top: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1500&auto=format&fit=crop', // Matrix/Code
  bottom: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1500&auto=format&fit=crop' // VR Immersion
};

const CardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Reveal Sequence
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

      tl.fromTo('.true-cube', { scale: 0.5, opacity: 0, rotateX: 45, rotateY: 45 }, { scale: 1, opacity: 1, rotateX: 0, rotateY: 0, duration: 2.5 })
        .fromTo('.logo-header', { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, '-=2')
        .fromTo('.char', 
          { y: 50, opacity: 0, rotateX: -90 }, 
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 1 },
          '-=1.5'
        )
        .fromTo('.exhibit-label-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=1');

      // Subtle Background Ambient Glow
      gsap.to('.ambient-ember', {
        opacity: 0.25,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    // 2. Infinite 3D Tumbling Logic for the Rubik's Cube
    let xAngle = 0;
    let yAngle = 0;
    let zAngle = 0;

    const interval = setInterval(() => {
      if (!cubeRef.current) return;

      // Select a random face index to show (0 to 5)
      // 0: Front, 1: Back, 2: Right, 3: Left, 4: Top, 5: Bottom
      const nextFace = Math.floor(Math.random() * 6);
      
      let targetX = 0;
      let targetY = 0;

      // Define rotational targets that keep images VERTICALLY UPRIGHT
      switch(nextFace) {
        case 0: targetX = 0;   targetY = 0;    break; // Front
        case 1: targetX = 0;   targetY = 180;  break; // Back
        case 2: targetX = 0;   targetY = -90;  break; // Right
        case 3: targetX = 0;   targetY = 90;   break; // Left
        case 4: targetX = -90; targetY = 0;    break; // Top
        case 5: targetX = 90;  targetY = 0;    break; // Bottom
      }

      // Tween the cube to these specific "Upright" angles
      gsap.to(cubeRef.current, {
        rotateX: targetX,
        rotateY: targetY,
        rotateZ: 0, 
        duration: 0.8, 
        ease: 'power3.out'
      });
    }, 4500);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const contacts = [
    { label: 'WA', detail: '+233 256614336', href: 'https://wa.me/233256614336' },
    { label: 'TEL', detail: '+233 256614336', href: 'tel:+233256614336' },
    { label: 'IDX', detail: 'barimahyawamponsah1844@gmail.com', href: 'mailto:barimahyawamponsah1844@gmail.com' },
  ];

  return (
    <div className="card-page-void" ref={containerRef}>
      <div className="void-grain"></div>
      <div className="ambient-ember"></div>

      <header className="logo-header">
        <Link to="/" className="site-logo">
          null<span className="ember-text">base</span>
        </Link>
      </header>

      {/* True 3D CSS Rubik's Cube Feature */}
      <div className="scene">
        <div className="true-cube" ref={cubeRef}>
          <div className="cube-face cube-front" style={{ backgroundImage: `url(${movieStills.front})` }}>
            <div className="face-overlay"></div>
          </div>
          <div className="cube-face cube-back" style={{ backgroundImage: `url(${movieStills.back})` }}>
            <div className="face-overlay"></div>
          </div>
          <div className="cube-face cube-right" style={{ backgroundImage: `url(${movieStills.right})` }}>
            <div className="face-overlay"></div>
          </div>
          <div className="cube-face cube-left" style={{ backgroundImage: `url(${movieStills.left})` }}>
            <div className="face-overlay"></div>
          </div>
          <div className="cube-face cube-top" style={{ backgroundImage: `url(${movieStills.top})` }}>
            <div className="face-overlay"></div>
          </div>
          <div className="cube-face cube-bottom" style={{ backgroundImage: `url(${movieStills.bottom})` }}>
            <div className="face-overlay"></div>
          </div>
        </div>
      </div>

      <section className="exhibit-label-card">
        <div className="label-header">
          <div className="profile-heading">
            <h1 className="name-line ember">{splitText('BARIMAH')}</h1>
            <h1 className="name-line">{splitText('YAW AMPONSAH')}</h1>
          </div>
          <div className="label-badge">01 // SYS.02</div>
        </div>

        <div className="label-body">
          <p className="editorial-monograph">
            Digital infrastructure for the next generation of business. 
            Architecting systems that scale silently and infinitely.
          </p>
        </div>

        <div className="label-footer">
          <div className="spec-list">
            {contacts.map((item, idx) => (
              <a key={idx} href={item.href} className="spec-item">
                <span className="spec-label">{item.label}</span>
                <span className="spec-value">{item.detail}</span>
                <ArrowUpRight size={12} className="spec-arrow" />
              </a>
            ))}
          </div>
        </div>

        <nav className="label-nav">
          <Link to="/" className="nav-exhibit-btn">
            EXPLORE ARCHIVES &rarr; NULLBASE.CO
          </Link>
        </nav>
      </section>

    </div>
  );
};

export default CardPage;
