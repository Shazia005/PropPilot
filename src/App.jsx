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
  // =========================================================
  // USER
  // =========================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

  const [currentPage, setCurrentPage] = useState(() =>
    user ? 'dashboard' : 'landing'
  );

  const [pageData, setPageData] = useState(null);

  // =========================================================
  // SAVED PROPERTIES
  // =========================================================

  const [savedIds, setSavedIds] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  // =========================================================
  // AI SEARCH STATE (persists across navigation)
  // =========================================================

  const [aiProperties, setAiProperties] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // =========================================================
  // AI SEARCH STATE (preserved across navigation)
  // =========================================================

  const [aiSearchState, setAiSearchState] = useState({
    properties: [],
    aiSummary: '',
    isAISearch: false,
    lastQuery: '',
  });

  // =========================================================
  // AI SEARCH STATE (persists across navigation)
  // =========================================================

  const [aiProperties, setAiProperties] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // =========================================================
  // LOAD SAVED PROPERTIES
  // =========================================================

  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      setSavedProperties([]);
      return;
    }

    API.get('/auth/saved-properties')
      .then((res) => {
        const saved = res.data.savedProperties || [];

        console.log('Loaded saved properties:', saved);

        // Store complete property objects
        setSavedProperties(saved);

        // Create ID list for heart/save buttons
        const ids = saved.map((item) =>
          typeof item === 'string'
            ? item
            : item.id
        );

        setSavedIds(ids);
      })
      .catch((err) => {
        console.error(
          'Failed to load saved properties:',
          err
        );

        setSavedIds([]);
        setSavedProperties([]);
      });
  }, [user]);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);

    window.scrollTo(0, 0);
  };

  // =========================================================
  // AI SEARCH HANDLERS
  // =========================================================

  const handleAISearchResults = (data) => {
    if (!data || !Array.isArray(data.properties)) {
      return;
    }

    const usedIds = new Set();

    const normalizedProperties = data.properties.map(
      (property, index) => {
        const originalId =
          property.id ||
          property._id ||
          property.sourceUrl ||
          `ai-property-${Date.now()}-${index}`;

        let uniqueId = String(originalId);
        let counter = 1;

        while (usedIds.has(uniqueId)) {
          uniqueId = `${String(originalId)}-${counter}`;
          counter += 1;
        }

        usedIds.add(uniqueId);

        return {
          ...property,
          id: uniqueId,
          _id: property._id || undefined,
          title: property.title || property.rawTitle || 'Property Listing',
          location: property.location || property.city || 'Location unavailable',
          city: property.city || '',
          type: property.type || property.propertyType || 'House',
          bedrooms: Number(property.bedrooms ?? property.beds ?? 0),
          bathrooms: Number(property.bathrooms ?? property.baths ?? 0),
          area: property.area || property.areaSqFt || 'N/A',
          image: property.image || property.imageUrl || '',
          imageUrl: property.imageUrl || property.image || '',
          sourceUrl: property.sourceUrl || property.rawLink || property.link || '',
        };
      }
    );

    setAiProperties(normalizedProperties);
    setAiSummary(data.searchSummary || data.aiSummary || '');
    setIsAISearch(true);
  };

  const clearAISearch = () => {
    setIsAISearch(false);
    setAiSummary('');
    setAiProperties([]);
  };

  // =========================================================
  // UPDATE AI SEARCH STATE (called from Properties)
  // =========================================================

  const handleAISearchUpdate = (searchState) => {
    setAiSearchState(searchState);
  };

  // =========================================================
  // LOGIN / SIGNUP SUCCESS
  // =========================================================

  const handleAuthSuccess = (userData) => {
    setUser(userData);

    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );

    setCurrentPage('dashboard');

    window.scrollTo(0, 0);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    setSavedIds([]);
    setSavedProperties([]);

    setCurrentPage('landing');
    setPageData(null);

    window.scrollTo(0, 0);
  };

  // =========================================================
  // SAVE / UNSAVE PROPERTY
  // =========================================================

  const handleSave = async (propertyId, property) => {
    // User must be logged in
    if (!user) {
      alert(
        'Please log in to save properties to your account.'
      );

      handleNavigate('login');

      return;
    }

    // Make sure we have an ID
    const finalPropertyId = String(
      propertyId ||
        property?.id ||
        property?._id ||
        property?.sourceUrl ||
        ''
    );

    if (!finalPropertyId) {
      console.error(
        'Cannot save property: Property ID is missing.'
      );

      return;
    }

    // Check if already saved
    const isAlreadySaved =
      savedIds.includes(finalPropertyId);

    // =======================================================
    // OPTIMISTIC UI UPDATE
    // =======================================================

    setSavedIds((prev) =>
      isAlreadySaved
        ? prev.filter(
            (id) => id !== finalPropertyId
          )
        : [...prev, finalPropertyId]
    );

    // If removing, remove from saved property objects too
    if (isAlreadySaved) {
      setSavedProperties((prev) =>
        prev.filter(
          (item) =>
            String(
              item.id ||
                item._id ||
                item.sourceUrl ||
                ''
            ) !== finalPropertyId
        )
      );
    }

    // =======================================================
    // SEND TO BACKEND
    // =======================================================

    try {
      const propertyToSave = {
        ...(property || {}),
        id: finalPropertyId,
      };

      console.log(
        'Saving property:',
        propertyToSave
      );

      const res = await API.post(
        '/auth/save-property',
        {
          property: propertyToSave,
        }
      );

      // =====================================================
      // UPDATE FRONTEND WITH BACKEND DATA
      // =====================================================

      if (res.data?.savedProperties) {
        const saved =
          res.data.savedProperties;

        console.log(
          'Updated saved properties:',
          saved
        );

        // Save complete property objects
        setSavedProperties(saved);

        // Extract IDs
        const ids = saved.map((item) =>
          typeof item === 'string'
            ? item
            : item.id
        );

        setSavedIds(ids);
      }
    } catch (err) {
      console.error(
        'Failed to save property:',
        err
      );

      // =====================================================
      // ROLLBACK UI IF REQUEST FAILS
      // =====================================================

      if (isAlreadySaved) {
        // It was supposed to be removed,
        // but backend failed.
        setSavedIds((prev) => [
          ...prev,
          finalPropertyId,
        ]);

        // Restore the property object
        if (property) {
          setSavedProperties((prev) => [
            ...prev,
            {
              ...property,
              id: finalPropertyId,
            },
          ]);
        }
      } else {
        // It was supposed to be added,
        // but backend failed.
        setSavedIds((prev) =>
          prev.filter(
            (id) => id !== finalPropertyId
          )
        );
      }

      alert(
        'Failed to update saved properties. Please try again.'
      );
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F7F5F0]">

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <Navbar
        onNavigate={handleNavigate}
        page={currentPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* ===================================================
          DASHBOARD
      =================================================== */}

      {currentPage === 'dashboard' && (
        <Dashboard
          user={user}
          onNavigate={handleNavigate}
          savedIds={savedIds}
          savedProperties={savedProperties}
          onSave={handleSave}
          onLogout={handleLogout}
        />
      )}

      {/* ===================================================
          LANDING PAGE
      =================================================== */}

      {currentPage === 'landing' && (
        <>
          <Hero
            onNavigate={handleNavigate}
          />

          <HowItWorks />

          <FeaturedListings
            onNavigate={handleNavigate}
            onSave={handleSave}
            savedIds={savedIds}
          />

          <Testimonials />

          <FooterCTA
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* ===================================================
          PROPERTIES PAGE
      =================================================== */}

      {currentPage === 'properties' && (
        <Properties
          onNavigate={handleNavigate}
          savedIds={savedIds}
          onSave={handleSave}
          initialQuery={
            pageData?.search ||
            pageData?.query ||
            ''
          }
          aiProperties={aiProperties}
          setAiProperties={setAiProperties}
          aiSummary={aiSummary}
          setAiSummary={setAiSummary}
          isAISearch={isAISearch}
          setIsAISearch={setIsAISearch}
          aiLoading={aiLoading}
          setAiLoading={setAiLoading}
        />
      )}

      {/* ===================================================
          PROPERTY DETAIL PAGE
      =================================================== */}

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

      {/* ===================================================
          AI ASSISTANT
      =================================================== */}

      {currentPage === 'ai' && (
        <AIAssistant
          onNavigate={handleNavigate}
          savedIds={savedIds}
          onSave={handleSave}
          initialQuery={
            pageData?.query || ''
          }
        />
      )}

      {/* ===================================================
          ABOUT PAGE
      =================================================== */}

      {currentPage === 'about' && (
        <About
          onNavigate={handleNavigate}
        />
      )}

      {/* ===================================================
          LOGIN / SIGNUP
      =================================================== */}

      {(currentPage === 'login' ||
        currentPage === 'signup') && (
        <Auth
          onNavigate={handleNavigate}
          onAuth={handleAuthSuccess}
          initialMode={
            currentPage === 'signup'
              ? 'signup'
              : 'login'
          }
        />
      )}

    </div>
  );
}