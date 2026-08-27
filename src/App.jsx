// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedListings from './components/FeaturedListings';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FooterCTA from './components/FooterCTA';
import Properties from './pages/Properties';
import Auth from './pages/Auth';
import About from './pages/About';
import AIAssistant from './pages/AIAssistant';
import PropertyDetail from './pages/PropertyDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageData, setPageData] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const handleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'landing' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <HowItWorks />
          <FeaturedListings onNavigate={handleNavigate} onSave={handleSave} savedIds={savedIds} />
          <Testimonials />
          <FooterCTA onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === 'properties' && (
        <Properties 
          onNavigate={handleNavigate} 
          savedIds={savedIds} 
          onSave={handleSave} 
        />
      )}

      {currentPage === 'property' && (
        <PropertyDetail
          key={pageData?.id}
          propertyId={pageData?.id}
          onNavigate={handleNavigate}
          savedIds={savedIds}
          onSave={handleSave}
        />
      )}

      {currentPage === 'ai' && (
        <AIAssistant 
          onNavigate={handleNavigate} 
          savedIds={savedIds} 
          onSave={handleSave}
          initialQuery={pageData?.query || ''} 
        />
      )}

      {currentPage === 'about' && (
        <About onNavigate={handleNavigate} />
      )}

      {(currentPage === 'login' || currentPage === 'signup') && (
        <Auth 
          onNavigate={handleNavigate} 
          initialMode={currentPage === 'signup' ? 'signup' : 'login'} 
        />
      )}
    </div>
  );
}