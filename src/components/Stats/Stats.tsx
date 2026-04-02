import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  number: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  accent: boolean;
}

const statsData: StatItem[] = [
  {
    number: 5,
    suffix: "",
    prefix: "",
    label: "Projects in production",
    sublabel: "Real systems. Real clients. Running now.",
    accent: false,
  },
  {
    number: 100,
    suffix: "%",
    prefix: "",
    label: "Build completion rate",
    sublabel: "We finish what we start.",
    accent: true,
  },
  {
    number: 3,
    suffix: "",
    prefix: "",
    label: "Cities served",
    sublabel: "Kumasi. Accra. And growing.",
    accent: false,
  },
  {
    number: 4,
    suffix: "",
    prefix: "",
    label: "Technology domains",
    sublabel: "ML. NFC. Web. Automation.",
    accent: false,
  },
];

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.stats-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Staggered Reveal and Count-up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(
        '.stat-block',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      // Count-up animation for each number
      const numbers = document.querySelectorAll('.stat-count');
      numbers.forEach((num, index) => {
        const target = statsData[index].number;
        tl.fromTo(num, 
          { textContent: 0 }, 
          { 
            textContent: target, 
            duration: 2, 
            ease: 'expo.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
            }
          }, 
          index * 0.15 + 0.2 // Stagger correctly with the block reveal
        );
      });

      // Ghost Text Parallax
      gsap.fromTo(ghostRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 0.03,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      <div className="container">
        <header className="stats-header">
          <div className="stats-label-row">
            <span className="stats-label-text">05 — By the numbers</span>
            <div className="stats-line-extender"></div>
          </div>
        </header>

        <div className="stats-grid-wrapper">
          <div className="ghost-text" ref={ghostRef}>000</div>
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-block">
                <div className={`stat-number ${stat.accent ? 'accented' : ''}`}>
                  {stat.prefix && <span className="stat-affix">{stat.prefix}</span>}
                  <span className="stat-count">0</span>
                  {stat.suffix && <span className="stat-affix">{stat.suffix}</span>}
                </div>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-sublabel">{stat.sublabel}</p>
                <div className={`stat-bottom-accent ${stat.accent ? 'accented' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
