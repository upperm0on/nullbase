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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Entrance
      gsap.fromTo(
        ['.megatech-title', '.megatech-accent'],
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Parallax Background
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="megatech-interlude" ref={sectionRef}>
      <div className="megatech-content" ref={contentRef}>
        <h2 className="megatech-title">We think at this scale.</h2>
        <span className="megatech-accent">null<span className="ember-text">base</span>.</span>
      </div>
      <div className="solar-edge-detail"></div>
    </section>
  );
};

export default Megatech;
