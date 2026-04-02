import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CaseStudy.css';

// Import project images
import nfcImg from '../../assets/show_cases/nfc.png';
import mlImg from '../../assets/show_cases/machine_learning.png';
import dentalImg from '../../assets/show_cases/dentist_site.png';
import hostelImg from '../../assets/show_cases/hostel_site.png';
import ecommerceImg from '../../assets/show_cases/e_commerce.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    tag: "Institutional infrastructure",
    client: "Kumasi Technical University",
    title: "NFC Student Verification System",
    description: "Commissioned by the SRC president. Students tap an NFC card — the system verifies identity in real time. Session keys live in the backend, not the card. The card never changes. The infrastructure handles everything.",
    stack: ["Django", "React / Vite", "PostgreSQL", "Redis", "Railway", "Vercel", "NFC / NTAG"],
    status: "Built · In deployment",
    accent: "var(--ember)",
    image: nfcImg,
  },
  {
    number: "02",
    tag: "Machine learning · Computer vision",
    client: "Personal research",
    title: "ML Hand Gesture PC Control",
    description: "A machine learning system that reads hand gestures in real time via webcam and translates them into PC controls. Built from scratch — computer vision, gesture classification, system integration. No controller needed.",
    stack: ["Python", "OpenCV", "MediaPipe", "Machine Learning"],
    status: "Built · Live",
    accent: "var(--solar)",
    image: mlImg,
  },
  {
    number: "03",
    tag: "Healthcare · Client work",
    client: "Dental Clinic, Accra",
    title: "Dental Clinic Website",
    description: "Full website for a dental practice in Accra. Appointment flow, service pages, mobile-first. A real business with real patients — built to convert visitors into bookings.",
    stack: ["React", "CSS", "Deployed"],
    status: "Built · Live",
    accent: "var(--ember)",
    image: dentalImg,
  },
  {
    number: "04",
    tag: "Hospitality · Platform",
    client: "Independent build",
    title: "Hostel Booking Platform",
    description: (
      <>
        A full hostel booking system built independently. Room listings, availability management, booking flow, user accounts. Built before null<span className="ember-text">base</span> existed — proof the ambition was always there.
      </>
    ),
    stack: ["Django", "React", "PostgreSQL", "Booking logic"],
    status: "Built · Deployed",
    accent: "var(--solar)",
    image: hostelImg,
  },
  {
    number: "05",
    tag: "Ecommerce · Infrastructure",
    client: "Independent build",
    title: "Ecommerce Base",
    description: "A complete ecommerce foundation — product listings, cart, checkout flow, order management. Built as a reusable base that can be deployed for any retail client.",
    stack: ["JavaScript", "Ecommerce logic", "Cart system"],
    status: "Built · Open source",
    accent: "var(--ember)",
    image: ecommerceImg,
  },
];

const CaseStudy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRailActive, setIsRailActive] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray('.case-panel') as HTMLElement[];
      
      // Header Entrance
      gsap.fromTo(['.section-label', '.section-title', '.section-subtext'],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: railRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: 'top top',
          end: () => `+=${railRef.current!.offsetWidth}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (projects.length - 1));
            setActiveIndex(index);
          },
          onToggle: (self) => {
            setIsRailActive(self.isActive);
          },
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray('.case-panel') as HTMLElement[];
      
      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="case-study-section" ref={sectionRef}>
      <div className="section-header container">
        <span className="section-label">04 — Real work</span>
        <h2 className="section-title">Five things we've actually built.</h2>
        <p className="section-subtext">Not concepts. Not mockups. Systems that run.</p>
      </div>

      <div className="horizontal-rail" ref={railRef}>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`case-panel ${index % 2 === 0 ? 'bg-void' : 'bg-surface'}`}
          >
            <div className="panel-accent" style={{ background: project.accent }}></div>
            
            <div className="panel-image-container">
              <img 
                src={project.image} 
                alt={project.title} 
                className="case-panel-image"
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>

            <div className="panel-ghost-number">{project.number}</div>
            
            <div className="panel-top">
              <span className="panel-tag" style={{ color: project.accent }}>{project.tag}</span>
              <h4 className="panel-client">{project.client}</h4>
            </div>

            <div className="panel-middle">
              <h3 className="panel-title">{project.title}</h3>
              <p className="panel-description">{project.description}</p>
              
              <div className="panel-stack">
                {project.stack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="stack-tag"
                    style={{ '--hover-accent': project.accent } as React.CSSProperties}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-bottom">
              <div className="status-badge" style={{ color: project.accent }}>
                {project.status}
              </div>
              <div className="panel-counter">
                {project.number} / 05
              </div>
            </div>
          </div>
        ))}
      </div>

      {isRailActive && window.innerWidth >= 768 && (
        <div className="progress-indicator">
          {projects.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudy;
