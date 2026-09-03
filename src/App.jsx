import React, { useState, useEffect } from 'react';
import API from './api';
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
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentPage, setCurrentPage] = useState(() => (user ? 'dashboard' : 'landing'));
  const [pageData, setPageData] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  // Load saved properties from Express API when user is logged in
  useEffect(() => {
    if (user) {
      const userId = user._id || user.id;
      API.get(`/auth/favorites/${userId}`)
        .then((res) => {
          // Extract array of property IDs (handles populated objects or string IDs)
          const ids = res.data.map((item) => (typeof item === 'object' ? item._id || item.id : item));
          setSavedIds(ids);
        })
        .catch((err) => {
          console.error('Failed to load user favorites:', err);
        });
    } else {
      setSavedIds([]);
    }
  }, [user]);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSavedIds([]);
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  // Persist toggled favorites to backend
  const handleSave = async (propertyId) => {
    if (!user) {
      alert('Please log in to save properties to your account.');
      handleNavigate('login');
      return;
    }

    // Optimistic UI update
    const isAlreadySaved = savedIds.includes(propertyId);
    setSavedIds((prev) =>
      isAlreadySaved ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );

    try {
      const userId = user._id || user.id;
      const res = await API.post('/auth/favorites', { userId, propertyId });
      if (res.data?.savedProperties) {
        setSavedIds(res.data.savedProperties);
      }
    } catch (err) {
      console.error('Failed to toggle favorite on backend:', err);
      // Revert state if backend request failed
      setSavedIds((prev) =>
        isAlreadySaved ? [...prev, propertyId] : prev.filter((id) => id !== propertyId)
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar 
        onNavigate={handleNavigate} 
        page={currentPage} 
        user={user} 
        onLogout={handleLogout} 
      />

      {currentPage === 'dashboard' && (
        <Dashboard
          user={user}
          onNavigate={handleNavigate}
          savedIds={savedIds}
          onSave={handleSave}
          onLogout={handleLogout}
        />
      )}

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
          initialQuery={pageData?.search || pageData?.query || ''} 
        />
      )}

      {currentPage === 'property' && (
        <PropertyDetail
          key={pageData?.id}
          propertyId={pageData?.id}
          pageData={pageData}
          user={user}
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
          onAuth={handleAuthSuccess}
          initialMode={currentPage === 'signup' ? 'signup' : 'login'} 
        />
      )}
    </div>
  );
}