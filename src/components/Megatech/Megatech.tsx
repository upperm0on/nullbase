import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Megatech.css';

// Hero image: SpaceX Falcon 9 night launch
// Source: https://www.flickr.com/photos/spacex/ (CC0 Public Domain)
// Download any night launch image, rename to megatech.jpg
// Drop into /src/assets/megatech.jpg

gsap.registerPlugin(ScrollTrigger);

const Megatech: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="megatech-interlude" ref={sectionRef}>
      <div className="megatech-content" ref={textRef}>
        <h2 className="megatech-title">We think at this scale.</h2>
        <span className="megatech-accent">null<span className="ember-text">base</span>.</span>
      </div>
      <div className="solar-edge-detail"></div>
    </section>
  );
};

export default Megatech;
