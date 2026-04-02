import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Manifesto from './components/Manifesto/Manifesto';
import Vision from './components/Vision/Vision';
import Services from './components/Services/Services';
import CaseStudy from './components/CaseStudy/CaseStudy';
import Megatech from './components/Megatech/Megatech';
import Stats from './components/Stats/Stats';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import CardPage from './components/CardPage/CardPage';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function Home() {
  return (
    <div className="app-wrapper">
      <Navbar />
      
      <main>
        <Hero />
        <Manifesto />
        <Vision />
        <Services />
        <CaseStudy />
        <Megatech />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  // Refresh ScrollTrigger on route change
  useEffect(() => {
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </SmoothScroll>
  );
}

export default App;
