import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const mockProperties = [
  {
    id: '1',
    city: 'Islamabad',
    type: 'Villa',
    price: 4.5,
    title: 'Modern Villa with Infinity Pool',
    location: 'DHA Phase 5, Islamabad',
    bedrooms: 5,
    bathrooms: 5,
    area: 4800,
    areaSqFt: '4,800',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Swimming Pool', 'Garden', 'Balcony', 'Solar Panels', 'CCTV Security'],
    description: 'An architectural masterpiece with floor-to-ceiling glass walls, scenic views, and high-end luxury interior finishes.',
    agent: { name: 'Zain Ahmed', phone: '+92 300 1234567', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format' }
  },
  {
    id: '2',
    city: 'Islamabad',
    type: 'House',
    price: 2.75,
    title: 'Contemporary Family Home',
    location: 'Bahria Town, Islamabad',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    areaSqFt: '3,200',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format'
    ],
    features: ['Car Porch', 'Lawn', 'Terrace', 'Servant Quarter'],
    description: 'Beautiful modern family home situated in a quiet, gated neighborhood with premium security and quick access to commercial centers.',
    agent: { name: 'Sara Khan', phone: '+92 321 9876543', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format' }
  },
  {
    id: '3',
    city: 'Islamabad',
    type: 'Penthouse',
    price: 3.2,
    title: 'Luxury Penthouse with City Views',
    location: 'Blue Area, Islamabad',
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    areaSqFt: '2,800',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Elevator', 'Gym', 'High Ceiling', 'Underground Parking'],
    description: 'Stunning modern penthouse located right in the heart of the business hub, featuring full city skyline views and executive amenities.',
    agent: { name: 'Zain Ahmed', phone: '+92 300 1234567', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format' }
  },
  {
    id: '4',
    city: 'Lahore',
    type: 'Apartment',
    price: 1.4,
    title: 'Modern Executive Flat',
    location: 'Gulberg, Lahore',
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    areaSqFt: '1,500',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['24/7 Power Backup', 'Elevator', 'Security Desk'],
    description: 'Sleek and minimalist apartment ideal for working professionals or small families seeking premium lifestyle convenience.',
    agent: { name: 'Ali Hassan', phone: '+92 333 4567890', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format' }
  },
  {
    id: '5',
    city: 'Karachi',
    type: 'Farmhouse',
    price: 6.5,
    title: 'Luxury Farmhouse Residence',
    location: 'Malir, Karachi',
    bedrooms: 6,
    bathrooms: 6,
    area: 8000,
    areaSqFt: '8,000',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Private Pool', 'Fruit Orchards', 'Barbecue Area', 'Guard Room'],
    description: 'Expansive private resort estate perfect for weekend getaways and grand outdoor entertainments.',
    agent: { name: 'Sara Khan', phone: '+92 321 9876543', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format' }
  }
];

const CITIES = ['All Cities', 'Islamabad', 'Lahore', 'Karachi'];
const TYPES = ['All Types', 'House', 'Villa', 'Apartment', 'Penthouse', 'Farmhouse'];
const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Most Bedrooms'];

export default function Properties({ onNavigate, savedIds = [], onSave, properties = mockProperties }) {
  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [maxBudget, setMaxBudget] = useState(10);
  const [minBeds, setMinBeds] = useState(0);
  const [sort, setSort] = useState('Recommended');
  const [search, setSearch] = useState('');

  const filtered = properties
    .filter((p) => {
      if (city !== 'All Cities' && p.city !== city) return false;
      if (type !== 'All Types' && p.type !== type) return false;
      if (p.price > maxBudget) return false;
      if (minBeds > 0 && p.bedrooms < minBeds) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Most Bedrooms') return b.bedrooms - a.bedrooms;
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
            Browse our full portfolio of verified premium properties across Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
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
            <p className="text-sm text-[#7A7568]"><span className="font-semibold text-[#18180F]">{filtered.length}</span> properties found</p>
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

        {/* Grid */}
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
                key={p.id}
                property={p}
                onClick={() => onNavigate && onNavigate('property', { id: p.id })}
                saved={savedIds.includes(p.id)}
                onSave={onSave}
              />
            ))}
          </div>
        )}

        {/* AI Nudge */}
        <div className="mt-12 bg-[#18180F] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-['Fraunces',serif] text-2xl font-semibold text-white italic mb-2">Not finding the right fit?</h3>
            <p className="text-white/60 text-sm">Let our AI search for you — just describe what you need in plain language.</p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('ai')}
            className="flex-shrink-0 flex items-center gap-2 bg-[#B8945A] hover:bg-[#a07d4a] text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
            Try AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}