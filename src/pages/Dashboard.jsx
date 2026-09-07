
import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Dashboard({
  user,
  onNavigate,
  savedIds = [],
  savedProperties = [],
  onSave,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Load preferences from localStorage or set defaults
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('user_preferences');

    return saved
      ? JSON.parse(saved)
      : {
          city: 'Islamabad',
          budget: 'Rs3 Cr',
          bedrooms: '4+',
        };
  });

  const [formCity, setFormCity] = useState(preferences.city);
  const [formBudget, setFormBudget] = useState(preferences.budget);
  const [formBedrooms, setFormBedrooms] = useState(preferences.bedrooms);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const userName = user?.name || user?.user?.name || 'User';
  const userEmail = user?.email || user?.user?.email || '';

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();

    const updated = {
      city: formCity,
      budget: formBudget,
      bedrooms: formBedrooms,
    };

    setPreferences(updated);

    localStorage.setItem(
      'user_preferences',
      JSON.stringify(updated)
    );

    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-16 font-['Outfit',sans-serif]">

      {/* ==================== WELCOME HEADER ==================== */}
      <div className="bg-[#18180F] text-white pt-10 pb-8 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[#B8945A] text-[11px] font-semibold tracking-widest uppercase mb-2">
                Your Dashboard
              </p>

              <h1 className="font-['Fraunces',serif] text-3xl md:text-4xl font-semibold italic mb-1">
                Welcome back, {userName.toLowerCase()}.
              </h1>

              <p className="text-white/40 text-xs mb-8">
                {userEmail}
              </p>
            </div>

            <button
              onClick={onLogout}
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* ==================== QUICK STATS ==================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-['Fraunces',serif] text-2xl font-semibold italic text-white mb-1">
                {savedProperties.length}
              </p>

              <p className="text-[11px] text-white/50">
                Saved Properties
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-['Fraunces',serif] text-2xl font-semibold italic text-white mb-1">
                {preferences.budget}
              </p>

              <p className="text-[11px] text-white/50">
                Budget
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-['Fraunces',serif] text-2xl font-semibold italic text-[#B8945A]">
                {preferences.city}
              </p>

              <p className="text-[11px] text-white/50">
                Preferred City
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-['Fraunces',serif] text-2xl font-semibold italic text-white mb-1">
                {preferences.bedrooms}
              </p>

              <p className="text-[11px] text-white/50">
                Min Bedrooms
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ==================== TABS ==================== */}
      <div className="bg-[#F7F5F0] border-b border-[#E2DDD4]">
        <div className="max-w-7xl mx-auto px-6 flex gap-8 text-xs font-medium">

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#B8945A] text-[#18180F]'
                : 'border-transparent text-[#7A7568]'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-[#B8945A] text-[#18180F]'
                : 'border-transparent text-[#7A7568]'
            }`}
          >
            Saved ({savedProperties.length})
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'preferences'
                ? 'border-[#B8945A] text-[#18180F]'
                : 'border-transparent text-[#7A7568]'
            }`}
          >
            Preferences
          </button>

        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ================================================== */}
        {/* OVERVIEW TAB */}
        {/* ================================================== */}

        {activeTab === 'overview' && (
          <div>

            {/* AI Recommendations */}
            <div className="mb-12">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-2">

                  <div className="w-5 h-5 rounded-full bg-[#B8945A] text-white flex items-center justify-center text-xs">
                    ✦
                  </div>

                  <h2 className="font-['Fraunces',serif] text-xl font-semibold italic text-[#18180F]">
                    Your Saved Properties
                  </h2>

                </div>

                <button
                  onClick={() => onNavigate('properties')}
                  className="text-xs text-[#B8945A] hover:underline font-medium"
                >
                  Find more
                </button>

              </div>

              {savedProperties.length === 0 ? (

                <div className="text-center py-16 bg-white rounded-xl border border-[#E2DDD4]">

                  <p className="text-[#18180F] font-medium text-sm mb-1">
                    Start exploring properties
                  </p>

                  <p className="text-xs text-[#7A7568] mb-4">
                    Use EstateAI to find properties matching your budget and preferences.
                  </p>

                  <button
                    onClick={() => onNavigate('properties')}
                    className="bg-[#18180F] text-white text-xs px-4 py-2 rounded-lg"
                  >
                    Search Properties
                  </button>

                </div>

              ) : (

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {savedProperties.slice(0, 3).map((property) => {

                    const propertyId =
                      property.id ||
                      property._id ||
                      property.sourceUrl;

                    return (
                      <PropertyCard
                        key={propertyId}
                        property={property}
                        onClick={() =>
                          onNavigate('property', {
                            id: propertyId,
                            property: property,
                          })
                        }
                        saved={savedIds.includes(propertyId)}
                        onSave={onSave}
                      />
                    );
                  })}

                </div>

              )}

            </div>

            {/* Recently Viewed / More Properties */}
            <div>

              <div className="flex items-center justify-between mb-6">

                <h2 className="font-['Fraunces',serif] text-xl font-semibold italic text-[#18180F]">
                  Continue Exploring
                </h2>

                <button
                  onClick={() => onNavigate('properties')}
                  className="text-xs text-[#7A7568] hover:text-[#18180F]"
                >
                  Browse all
                </button>

              </div>

              <div className="bg-white border border-[#E2DDD4] rounded-xl p-8 text-center">

                <p className="text-[#18180F] font-medium text-sm mb-1">
                  Looking for your next property?
                </p>

                <p className="text-xs text-[#7A7568] mb-4">
                  Tell our AI assistant what you are looking for and get matching listings.
                </p>

                <button
                  onClick={() => onNavigate('properties')}
                  className="bg-[#18180F] text-white text-xs px-5 py-2.5 rounded-lg hover:bg-[#2a2a1a]"
                >
                  Explore Properties
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================================================== */}
        {/* SAVED TAB */}
        {/* ================================================== */}

        {activeTab === 'saved' && (
          <div>

            <h2 className="font-['Fraunces',serif] text-xl font-semibold italic text-[#18180F] mb-6">
              Saved Properties ({savedProperties.length})
            </h2>

            {savedProperties.length === 0 ? (

              <div className="text-center py-16 bg-white rounded-xl border border-[#E2DDD4]">

                <p className="text-[#18180F] font-medium text-sm mb-1">
                  No saved properties yet.
                </p>

                <p className="text-xs text-[#7A7568] mb-4">
                  Click the heart icon on any property card to save it to your dashboard.
                </p>

                <button
                  onClick={() => onNavigate('properties')}
                  className="bg-[#18180F] text-white text-xs px-4 py-2 rounded-lg"
                >
                  Browse Properties
                </button>

              </div>

            ) : (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {savedProperties.map((property) => {

                  const propertyId =
                    property.id ||
                    property._id ||
                    property.sourceUrl;

                  return (
                    <PropertyCard
                      key={propertyId}
                      property={property}
                      onClick={() =>
                        onNavigate('property', {
                          id: propertyId,
                          property: property,
                        })
                      }
                      saved={true}
                      onSave={onSave}
                    />
                  );
                })}

              </div>

            )}

          </div>
        )}

        {/* ================================================== */}
        {/* PREFERENCES TAB */}
        {/* ================================================== */}

        {activeTab === 'preferences' && (
          <div className="max-w-2xl bg-white border border-[#E2DDD4] rounded-2xl p-6">

            <h2 className="font-['Fraunces',serif] text-xl font-semibold italic text-[#18180F] mb-2">
              Your AI Search Preferences
            </h2>

            <p className="text-xs text-[#7A7568] mb-6">
              EstateAI uses these criteria to recommend matching homes for you.
            </p>

            <form
              onSubmit={handlePreferencesSubmit}
              className="space-y-4"
            >

              {/* CITY */}
              <div>
                <label className="text-xs font-medium text-[#18180F] mb-1 block">
                  Preferred City
                </label>

                <input
                  type="text"
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  placeholder="e.g. Islamabad, Lahore"
                  className="w-full px-4 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
                />
              </div>

              {/* BUDGET */}
              <div>
                <label className="text-xs font-medium text-[#18180F] mb-1 block">
                  Max Budget
                </label>

                <input
                  type="text"
                  value={formBudget}
                  onChange={(e) => setFormBudget(e.target.value)}
                  placeholder="e.g. Rs3 Cr"
                  className="w-full px-4 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
                />
              </div>

              {/* BEDROOMS */}
              <div>
                <label className="text-xs font-medium text-[#18180F] mb-1 block">
                  Minimum Bedrooms
                </label>

                <select
                  value={formBedrooms}
                  onChange={(e) => setFormBedrooms(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
                >
                  <option value="1+">1+ Bedroom</option>
                  <option value="2+">2+ Bedrooms</option>
                  <option value="3+">3+ Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
              </div>

              {/* SUCCESS MESSAGE */}
              {saveSuccess && (
                <p className="text-green-600 text-xs bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  Preferences updated successfully!
                </p>
              )}

              {/* SAVE */}
              <button
                type="submit"
                className="bg-[#18180F] text-white text-xs font-medium px-5 py-2.5 rounded-lg transition-colors hover:bg-[#2a2a1a]"
              >
                Save Preferences
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}