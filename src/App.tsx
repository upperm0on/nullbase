import React from 'react';
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

function App() {
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

export default App;
