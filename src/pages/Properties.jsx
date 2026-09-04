import React, { useEffect, useState } from 'react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';
import AIPromptBar from '../components/AIPromptBar';

const CITIES = [
  'All Cities',
  'Islamabad',
  'Lahore',
  'Karachi',
  'Rawalpindi',
  'Peshawar',
];

const TYPES = [
  'All Types',
  'House',
  'Villa',
  'Apartment',
  'Penthouse',
  'Farmhouse',
];

const SORT_OPTIONS = [
  'Recommended',
  'Price: Low to High',
  'Price: High to Low',
  'Most Bedrooms',
];

export default function Properties({
  onNavigate,
  savedIds = [],
  onSave,
  initialQuery = '',
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState('');

  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [maxBudget, setMaxBudget] = useState(10);
  const [minBeds, setMinBeds] = useState(0);
  const [sort, setSort] = useState('Recommended');
  const [search, setSearch] = useState('');

  // Load normal database properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get('/properties');

        if (Array.isArray(res.data)) {
          setProperties(res.data);
        } else if (Array.isArray(res.data?.properties)) {
          setProperties(res.data.properties);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle AI search results
  const handleAISearchResults = (data) => {
    if (!data || !Array.isArray(data.properties)) {
      console.error('Invalid AI search response:', data);
      return;
    }

    const usedIds = new Set();

    const normalizedProperties = data.properties.map((property, index) => {
      const originalId =
        property.id ||
        property._id ||
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

        // Guaranteed unique ID
        id: uniqueId,

        // Support both backend DB properties and AI properties
        _id: property._id || undefined,

        title:
          property.title ||
          property.rawTitle ||
          'Property Listing',

        location:
          property.location ||
          property.city ||
          'Location unavailable',

        city:
          property.city ||
          extractCity(property.location),

        type:
          property.type ||
          property.propertyType ||
          'House',

        bedrooms: Number(
          property.bedrooms ??
            property.beds ??
            0
        ),

        bathrooms: Number(
          property.bathrooms ??
            property.baths ??
            0
        ),

        area:
          property.area ||
          property.areaSqFt ||
          'N/A',

        image:
          property.image ||
          property.imageUrl ||
          '',
      };
    });

    setProperties(normalizedProperties);

    if (data.aiSummary) {
      setAiSummary(data.aiSummary);
    }
  };

  // Try to determine city from location text
  const extractCity = (location = '') => {
    const locationText = String(location).toLowerCase();

    if (locationText.includes('islamabad')) {
      return 'Islamabad';
    }

    if (locationText.includes('lahore')) {
      return 'Lahore';
    }

    if (locationText.includes('karachi')) {
      return 'Karachi';
    }

    if (locationText.includes('rawalpindi')) {
      return 'Rawalpindi';
    }

    if (locationText.includes('peshawar')) {
      return 'Peshawar';
    }

    return '';
  };

  // Convert price into a number where possible
  const getPriceValue = (property) => {
    if (typeof property.price === 'number') {
      return property.price;
    }

    if (!property.price) {
      return 0;
    }

    const priceText = String(property.price)
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/₨/g, '')
      .trim();

    const numberMatch = priceText.match(/[\d.]+/);

    if (!numberMatch) {
      return 0;
    }

    const number = parseFloat(numberMatch[0]);

    if (priceText.includes('crore') || priceText.includes('cr')) {
      return number;
    }

    if (
      priceText.includes('million') ||
      priceText.includes('m')
    ) {
      return number / 10;
    }

    if (
      priceText.includes('lakh') ||
      priceText.includes('lac')
    ) {
      return number / 100;
    }

    return number;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center bg-[#F7F5F0]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#E2DDD4] border-t-[#B8945A] rounded-full animate-spin mb-4" />

          <p className="text-[#7A7568] text-sm">
            Loading live properties...
          </p>
        </div>
      </div>
    );
  }

  const filtered = properties
    .filter((property) => {
      const propertyCity =
        property.city ||
        extractCity(property.location);

      const propertyType =
        property.type ||
        property.propertyType ||
        'House';

      const bedrooms = Number(
        property.bedrooms ??
          property.beds ??
          0
      );

      const priceValue = getPriceValue(property);

      if (
        city !== 'All Cities' &&
        propertyCity &&
        propertyCity.toLowerCase() !== city.toLowerCase()
      ) {
        return false;
      }

      if (
        type !== 'All Types' &&
        propertyType.toLowerCase() !== type.toLowerCase()
      ) {
        return false;
      }

      if (
        priceValue > 0 &&
        priceValue > maxBudget
      ) {
        return false;
      }

      if (
        minBeds > 0 &&
        bedrooms > 0 &&
        bedrooms < minBeds
      ) {
        return false;
      }

      if (search) {
        const searchText = search.toLowerCase();

        const title =
          property.title?.toLowerCase() || '';

        const location =
          property.location?.toLowerCase() || '';

        if (
          !title.includes(searchText) &&
          !location.includes(searchText)
        ) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') {
        return (
          getPriceValue(a) -
          getPriceValue(b)
        );
      }

      if (sort === 'Price: High to Low') {
        return (
          getPriceValue(b) -
          getPriceValue(a)
        );
      }

      if (sort === 'Most Bedrooms') {
        return (
          Number(b.bedrooms ?? b.beds ?? 0) -
          Number(a.bedrooms ?? a.beds ?? 0)
        );
      }

      return 0;
    });

  const resetFilters = () => {
    setCity('All Cities');
    setType('All Types');
    setMaxBudget(10);
    setMinBeds(0);
    setSearch('');
    setSort('Recommended');
  };

  return (
    <div className="min-h-screen pt-16 bg-[#F7F5F0] font-['Outfit',sans-serif]">

      {/* Hero */}
      <div className="bg-[#18180F] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#B8945A] text-xs font-semibold tracking-widest uppercase mb-3">
            Property Listings
          </p>

          <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-white italic mb-4">
            All Properties
          </h1>

          <p className="text-white/60 text-base max-w-lg">
            Browse our full portfolio or search using our autonomous Gemini AI Agent.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* AI Search */}
        <div className="mb-10">
          <AIPromptBar
            initialQuery={initialQuery}
            onSearchResults={handleAISearchResults}
          />
        </div>

        {/* AI Summary */}
        {aiSummary && (
          <div className="bg-white border-l-4 border-[#B8945A] rounded-r-2xl p-5 mb-8 shadow-sm">
            <p className="text-xs font-semibold uppercase text-[#B8945A] tracking-wider mb-1">
              ✨ Gemini AI Search Insights
            </p>

            <p className="text-sm text-[#18180F]">
              {aiSummary}
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#E2DDD4] p-5 mb-8 shadow-sm">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by title or area..."
              className="sm:col-span-2 lg:col-span-1 px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] placeholder-[#C5BFB5] outline-none focus:border-[#B8945A] transition-colors"
            />

            {/* City */}
            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] outline-none focus:border-[#B8945A] transition-colors"
            >
              {CITIES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="px-4 py-2.5 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] outline-none focus:border-[#B8945A] transition-colors"
            >
              {TYPES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* Budget */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#7A7568]">
                Max Budget: ₨{maxBudget} Cr
              </label>

              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={maxBudget}
                onChange={(e) =>
                  setMaxBudget(
                    parseFloat(e.target.value)
                  )
                }
                className="accent-[#B8945A]"
              />
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#7A7568]">
                Min Bedrooms:{' '}
                {minBeds === 0
                  ? 'Any'
                  : `${minBeds}+`}
              </label>

              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={minBeds}
                onChange={(e) =>
                  setMinBeds(
                    parseInt(
                      e.target.value,
                      10
                    )
                  )
                }
                className="accent-[#B8945A]"
              />
            </div>
          </div>

          {/* Results + Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-[#E2DDD4]">

            <p className="text-sm text-[#7A7568]">
              <span className="font-semibold text-[#18180F]">
                {filtered.length}
              </span>{' '}
              properties found
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A7568]">
                Sort by:
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="text-sm text-[#18180F] bg-transparent border-none outline-none font-medium cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Property Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E2DDD4]">

            <div className="text-4xl mb-4">
              🏠
            </div>

            <p className="text-[#7A7568] text-sm mb-3">
              No properties match your current filters.
            </p>

            <button
              onClick={resetFilters}
              className="text-sm text-[#B8945A] font-medium hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {filtered.map((property, index) => {
              const propertyId =
                property.id ||
                property._id ||
                `property-${index}`;

              return (
                <PropertyCard
                  key={propertyId}
                  property={property}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(
                        'property',
                        {
                          id: propertyId,
                        }
                      );
                    }
                  }}
                  saved={savedIds.includes(
                    propertyId
                  )}
                  onSave={onSave}
                />
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}