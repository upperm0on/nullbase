import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

interface Service {
  number: string;
  tag: string;
  title: string;
  description: string | React.ReactNode;
}

const services: Service[] = [
  {
    number: "01",
    tag: "Project-based",
    title: "Custom web & mobile apps",
    description: "End-to-end builds for your business. Booking systems, ordering platforms, customer portals. You own the product — we build and maintain it."
  },
  {
    number: "02",
    tag: "Project + retainer",
    title: "Digital infrastructure & automation",
    description: "Internal tools, dashboards, workforce systems, payment integrations. NFC-powered solutions — menus, verification, access control — built into the layer."
  },
  {
    number: "03",
    tag: "Recurring revenue",
    title: "SaaS products",
    description: (
      <>
        Platforms null<span className="ember-text">base</span> owns and licenses. Subscription access for institutions and businesses. You pay monthly — we run it, maintain it, and scale it.
      </>
    )
  },
  {
    number: "04",
    tag: "Flat fee",
    title: "Digital consulting",
    description: "We audit your operations, map what you need, and either build it or direct you. The entry point for everything else."
  }
];

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="services" 
      className={`services-section ${isVisible ? 'visible' : ''}`} 
      ref={sectionRef}
    >
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
            <div 
              key={service.number} 
              className="service-card"
              style={{ animationDelay: `${0.2 + index * 0.1}s` } as React.CSSProperties}
            >
              <div className="ghost-number">{service.number}</div>
              <div className="service-tag">{service.tag}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <div className="service-footer">
                <span className="learn-more">Learn more</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
