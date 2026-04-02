import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

// Import images
import webMobileIcon from '../../assets/services/web_n_mobile.png';
import infraIcon from '../../assets/services/digital_infrastructure.png';
import saasIcon from '../../assets/services/saas.png';
import consultingIcon from '../../assets/services/digital_consulting.png';

interface Service {
  number: string;
  tag: string;
  title: string;
  description: string | React.ReactNode;
  image: string;
}

const services: Service[] = [
  {
    number: "01",
    tag: "Project-based",
    title: "Custom web & mobile apps",
    description: "End-to-end builds for your business. Booking systems, ordering platforms, customer portals. You own the product — we build and maintain it.",
    image: webMobileIcon
  },
  {
    number: "02",
    tag: "Project + retainer",
    title: "Digital infrastructure & automation",
    description: "Internal tools, dashboards, workforce systems, payment integrations. NFC-powered solutions — menus, verification, access control — built into the layer.",
    image: infraIcon
  },
  {
    number: "03",
    tag: "Recurring revenue",
    title: "SaaS products",
    description: (
      <>
        Platforms null<span className="ember-text">base</span> owns and licenses. Subscription access for institutions and businesses. You pay monthly — we run it, maintain it, and scale it.
      </>
    ),
    image: saasIcon
  },
  {
    number: "04",
    tag: "Flat fee",
    title: "Digital consulting",
    description: "We audit your operations, map what you need, and either build it or direct you. The entry point for everything else.",
    image: consultingIcon
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.service-item');
      
      items.forEach((item, i) => {
        const visual = item.querySelector('.service-visual');
        const info = item.querySelector('.service-info');
        const bg = item.querySelector('.service-bg-parallax');
        const title = item.querySelector('.service-title-overlay');
        const textElements = item.querySelectorAll('.service-tag, .service-description, .service-footer');
        
        // Visual side entrance
        gsap.fromTo(visual, 
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Info side entrance
        gsap.fromTo(info,
          { x: i % 2 === 0 ? 100 : -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Title entrance delay
        gsap.fromTo(title,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Text elements staggered entrance
        gsap.fromTo(textElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Parallax background
        gsap.to(bg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-container">
        <header className="services-header">
          <div className="services-label-row">
            <span className="services-label">03 — What we build</span>
            <div className="services-line-extender"></div>
          </div>
          <h2 className="services-heading">The full stack of your business.</h2>
        </header>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.number} className="service-item">
              <div className="service-visual">
                <div className="service-image-wrapper">
                  <div 
                    className="service-bg-parallax" 
                    style={{ backgroundImage: `url(${service.image})` }} 
                  />
                  <div className="service-image-overlay" />
                </div>
                <h3 className="service-title-overlay">{service.title}</h3>
              </div>
              
              <div className="service-info">
                <div className="service-number-bg">{service.number}</div>
                <div className="service-tag">{service.tag}</div>
                <div className="service-description">{service.description}</div>
                <div className="service-footer">
                  <span className="learn-more">Learn more</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
