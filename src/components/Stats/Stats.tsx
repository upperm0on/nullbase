import React, { useEffect, useRef, useState } from 'react';
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

const animateValue = (
  setter: (val: number) => void,
  target: number,
  duration: number
) => {
  const start = performance.now();
  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    setter(Math.floor(eased * target));
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setter(target);
    }
  };
  requestAnimationFrame(tick);
};

const StatBlock: React.FC<{ stat: StatItem; delay: number; startAnimate: boolean }> = ({ stat, delay, startAnimate }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (startAnimate && !hasAnimated.current) {
      hasAnimated.current = true;
      setTimeout(() => {
        animateValue(setCount, stat.number, 2000);
      }, delay);
    }
  }, [startAnimate, stat.number, delay]);

  return (
    <div className="stat-block">
      <div className={`stat-number ${stat.accent ? 'accented' : ''}`}>
        {stat.prefix && <span className="stat-affix">{stat.prefix}</span>}
        {count}
        {stat.suffix && <span className="stat-affix">{stat.suffix}</span>}
      </div>
      <h3 className="stat-label">{stat.label}</h3>
      <p className="stat-sublabel">{stat.sublabel}</p>
      <div className={`stat-bottom-accent ${stat.accent ? 'accented' : ''}`}></div>
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [startAnimate, setStartAnimate] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          }
        }
      );

      // Stat Blocks Staggered Fade Up
      gsap.fromTo(
        '.stat-block',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }, sectionRef);

    // Intersection Observer for Count-up
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      <div className="container">
        <header className="stats-header" ref={headerRef}>
          <div className="stats-label-row">
            <span className="stats-label-text">05 — By the numbers</span>
            <div className="stats-line-extender"></div>
          </div>
        </header>

        <div className="stats-grid-wrapper">
          <div className="ghost-text">000</div>
          <div className="stats-grid" ref={statsGridRef}>
            {statsData.map((stat, index) => (
              <StatBlock 
                key={index} 
                stat={stat} 
                delay={index * 150} 
                startAnimate={startAnimate} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
