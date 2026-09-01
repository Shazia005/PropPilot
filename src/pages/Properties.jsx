import React, { useState, useEffect } from 'react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';
import AIPromptBar from '../components/AIPromptBar';

const CITIES = ['All Cities', 'Islamabad', 'Lahore', 'Karachi'];
const TYPES = ['All Types', 'House', 'Villa', 'Apartment', 'Penthouse', 'Farmhouse'];
const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Most Bedrooms'];

export default function Properties({ onNavigate, savedIds = [], onSave }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState('');

  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [maxBudget, setMaxBudget] = useState(10);
  const [minBeds, setMinBeds] = useState(0);
  const [sort, setSort] = useState('Recommended');
  const [search, setSearch] = useState('');

  // Fetch properties from Express API on mount
  useEffect(() => {
    API.get('/properties')
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch properties:', err);
        setLoading(false);
      });
  }, []);

  // Callback to handle incoming AI Agent results from <AIPromptBar />
  const handleAISearchResults = (data) => {
    if (data.properties) {
      setProperties(data.properties);
    }
    if (data.aiSummary) {
      setAiSummary(data.aiSummary);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center bg-[#F7F5F0]">
        <p className="text-[#7A7568] text-sm">Loading live properties...</p>
      </div>
    );
  }

  const filtered = properties
    .filter((p) => {
      if (city !== 'All Cities' && p.city !== city) return false;
      if (type !== 'All Types' && p.type !== type) return false;
      if (p.price && typeof p.price === 'number' && p.price > maxBudget) return false;
      if (minBeds > 0 && p.bedrooms && p.bedrooms < minBeds) return false;
      if (
        search &&
        !p.title?.toLowerCase().includes(search.toLowerCase()) &&
        !p.location?.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return (a.price || 0) - (b.price || 0);
      if (sort === 'Price: High to Low') return (b.price || 0) - (a.price || 0);
      if (sort === 'Most Bedrooms') return (b.bedrooms || 0) - (a.bedrooms || 0);
      return 0;
    });

  return (
    <div className="min-h-screen pt-16 bg-[#F7F5F0] font-['Outfit',sans-serif]">
      {/* Header */}
      <div className="bg-[#18180F] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#B8945A] text-xs font-semibold tracking-widest uppercase mb-3">Property Listings</p>
          <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-white italic mb-4">
            All Properties
          </h1>
          <p className="text-white/60 text-base max-w-lg">
            Browse our full portfolio or search using our autonomous Gemini AI Agent.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* AI Autonomous Prompt Bar */}
        <div className="mb-10">
          <AIPromptBar onSearchResults={handleAISearchResults} />
        </div>

        {/* AI Insights Summary Box (Visible after an AI search) */}
        {aiSummary && (
          <div className="bg-white border-l-4 border-[#B8945A] rounded-r-2xl p-5 mb-8 shadow-sm">
            <p className="text-xs font-semibold uppercase text-[#B8945A] tracking-wider mb-1">
              ✨ Gemini AI Search Insights
            </p>
            <p className="text-sm text-[#18180F]">{aiSummary}</p>
          </div>
        )}

        {/* Traditional Manual Filters */}
        <div className="bg-white rounded-2xl border border-[#E2DDD4] p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or area…"
              className="sm:col-span-2 lg:col-span-1 px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] placeholder-[#C5BFB5] outline-none focus:border-[#B8945A] transition-colors"
            />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] outline-none focus:border-[#B8945A] transition-colors"
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] outline-none focus:border-[#B8945A] transition-colors"
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#7A7568]">Max Budget: ₨{maxBudget} Cr</label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseFloat(e.target.value))}
                className="accent-[#B8945A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#7A7568]">Min Bedrooms: {minBeds === 0 ? 'Any' : minBeds + '+'}</label>
              <input
                type="range"
                min={0}
                max={6}
                step={1}
                value={minBeds}
                onChange={(e) => setMinBeds(parseInt(e.target.value))}
                className="accent-[#B8945A]"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E2DDD4]">
            <p className="text-sm text-[#7A7568]">
              <span className="font-semibold text-[#18180F]">{filtered.length}</span> properties found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A7568]">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm text-[#18180F] bg-transparent border-none outline-none font-medium cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E2DDD4]">
            <p className="text-[#7A7568] text-sm mb-3">No properties match your current filters.</p>
            <button
              onClick={() => { setCity('All Cities'); setType('All Types'); setMaxBudget(10); setMinBeds(0); setSearch(''); }}
              className="text-sm text-[#B8945A] font-medium hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <PropertyCard
                key={p._id || p.id}
                property={p}
                onClick={() => onNavigate && onNavigate('property', { id: p._id || p.id })}
                saved={savedIds.includes(p._id || p.id)}
                onSave={onSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}