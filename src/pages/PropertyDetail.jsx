import { useState, useEffect } from 'react';

// Fallback properties matching Properties.jsx data model
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
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Private Pool', 'Fruit Orchards', 'Barbecue Area', 'Guard Room'],
    description: 'Expansive private resort estate perfect for weekend getaways and grand outdoor entertainments.',
    agent: { name: 'Sara Khan', phone: '+92 321 9876543', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format' }
  }
];

export default function PropertyDetail({ propertyId, onNavigate, savedIds = [], onSave, user, propertiesData }) {
  const allProperties = propertiesData || mockProperties;
  // Safely find matching property by ID
  const property = allProperties.find((p) => String(p.id) === String(propertyId)) || allProperties[0];

  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [visitScheduled, setVisitScheduled] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setShowContact(false);
    setVisitScheduled(false);
  }, [propertyId]);

  if (!property) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#7A7568] mb-4">Property not found.</p>
          <button onClick={() => onNavigate('properties')} className="text-[#B8945A] font-medium hover:underline">
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedIds.includes(property.id);
  const propertyImages = property.images || [property.imageUrl] || [];
  const agent = property.agent || { name: 'Property Agent', phone: '+92 300 1234567', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format' };
  const features = property.features || ['Parking', 'Security'];

  return (
    <div className="min-h-screen pt-16 bg-[#F7F5F0]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-[#7A7568]">
          <button onClick={() => onNavigate('properties')} className="hover:text-[#18180F] transition-colors">Properties</button>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          <span className="text-[#18180F] font-medium">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-[#EDEAE2]">
                <img
                  src={propertyImages[activeImage] || propertyImages[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 text-[#18180F] text-xs font-medium px-3 py-1.5 rounded-full">
                    {property.type}
                  </span>
                  {property.matchScore !== undefined && (
                    <span className="bg-[#B8945A] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {property.matchScore}% AI Match
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onSave(property.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                >
                  {isSaved ? (
                    <svg className="w-5 h-5 fill-[#B8945A] text-[#B8945A]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                  )}
                </button>
              </div>
              {propertyImages.length > 1 && (
                <div className="flex gap-3">
                  {propertyImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-colors bg-[#EDEAE2] ${
                        activeImage === i ? 'border-[#B8945A]' : 'border-transparent hover:border-[#E2DDD4]'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl border border-[#E2DDD4] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#18180F] italic mb-1">
                    {property.title}
                  </h1>
                  <p className="text-[#7A7568] text-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                    {property.location}, {property.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl font-semibold text-[#18180F] italic">₨ {property.price} Cr</p>
                  <p className="text-xs text-[#7A7568] mt-0.5">PKR {(property.price * 10000000).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 py-5 border-t border-b border-[#E2DDD4] mb-5">
                {[
                  { label: 'Bedrooms', value: property.bedrooms },
                  { label: 'Bathrooms', value: property.bathrooms },
                  { label: 'Area', value: `${(property.area || property.areaSqFt || 0).toLocaleString()} sqft` },
                  { label: 'Type', value: property.type },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center bg-[#F7F5F0] rounded-xl py-3">
                    <p className="font-semibold text-[#18180F] text-sm">{value}</p>
                    <p className="text-xs text-[#7A7568] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-[#18180F] mb-3">About this property</h3>
              <p className="text-[#7A7568] text-sm leading-relaxed">{property.description || 'No detailed description available.'}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-[#E2DDD4] p-6">
              <h3 className="font-semibold text-[#18180F] mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#18180F]">
                    <div className="w-5 h-5 rounded-full bg-[#B8945A]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#B8945A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Match Section */}
            {property.matchScore !== undefined && property.matchReason && (
              <div className="bg-gradient-to-br from-[#B8945A]/10 to-[#B8945A]/5 border border-[#B8945A]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#B8945A] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#18180F] text-sm">Why this matches you</h3>
                    <span className="text-[#B8945A] text-xs font-bold">{property.matchScore}% AI Match Score</span>
                  </div>
                </div>
                <div className="h-2 bg-[#B8945A]/20 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-[#B8945A] rounded-full transition-all duration-1000"
                    style={{ width: `${property.matchScore}%` }}
                  />
                </div>
                <p className="text-sm text-[#7A7568] leading-relaxed">{property.matchReason}</p>
              </div>
            )}
          </div>

          {/* Right: Agent + CTA */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#E2DDD4] p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="font-display text-4xl font-semibold text-[#18180F] italic">₨ {property.price} Cr</p>
                <p className="text-xs text-[#7A7568] mt-1">{(property.area || property.areaSqFt || 0).toLocaleString()} sqft · {property.bedrooms} Beds · {property.bathrooms} Baths</p>
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="flex-1 bg-[#18180F] hover:bg-[#2a2a1a] text-white font-medium text-sm py-3 rounded-lg transition-colors"
                >
                  Contact Agent
                </button>
                <button
                  onClick={() => setVisitScheduled(true)}
                  className="flex-1 border border-[#E2DDD4] hover:border-[#B8945A] text-[#18180F] font-medium text-sm py-3 rounded-lg transition-colors"
                >
                  {visitScheduled ? '✓ Scheduled' : 'Schedule Visit'}
                </button>
              </div>

              {visitScheduled && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                  <p className="text-green-700 text-xs font-medium">Visit request sent! Agent will contact you within 24 hours.</p>
                </div>
              )}

              {showContact && (
                <div className="mb-4 bg-[#F7F5F0] rounded-xl p-4 text-sm">
                  <p className="font-medium text-[#18180F] mb-1">{agent.name}</p>
                  <p className="text-[#7A7568]">{agent.phone}</p>
                </div>
              )}

              {/* Agent Card */}
              <div className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-xl">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover bg-[#EDEAE2]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#18180F]">{agent.name}</p>
                  <p className="text-xs text-[#7A7568]">Property Agent</p>
                </div>
              </div>

              <button
                onClick={() => onSave(property.id)}
                className="w-full mt-4 flex items-center justify-center gap-2 border border-[#E2DDD4] hover:border-[#B8945A] text-sm text-[#7A7568] hover:text-[#B8945A] py-3 rounded-lg transition-colors"
              >
                {isSaved ? (
                  <>
                    <svg className="w-4 h-4 fill-[#B8945A] text-[#B8945A]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Saved to Favourites
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                    Save to Favourites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
