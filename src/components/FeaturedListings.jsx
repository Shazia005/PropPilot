import React from 'react';
import { Heart, Bed, Bath, Square } from 'lucide-react';

const mockListings = [
  {
    id: 1,
    tag: 'Villa',
    price: 'Rs 4.5 Cr',
    title: 'Modern Villa with Infinity Pool',
    location: 'DHA Phase 5, Islamabad',
    beds: 5,
    baths: 5,
    sqft: '4,800',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    tag: 'House',
    price: 'Rs 2.75 Cr',
    title: 'Contemporary Family Home',
    location: 'Bahria Town, Islamabad',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    tag: 'Penthouse',
    price: 'Rs 3.2 Cr',
    title: 'Luxury Penthouse with City Views',
    location: 'Blue Area, Islamabad',
    beds: 3,
    baths: 3,
    sqft: '2,800',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  }
];

export default function FeaturedListings({ properties = [], savedIds = [], onSave, onNavigate }) {
  const listingsToDisplay = properties.length > 0 ? properties : mockListings;

  const formatPrice = (val) => {
    if (!val) return 'Contact for Price';
    return String(val).trim();
  };

  return (
    <section id="properties" className="py-20 bg-white font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B8945A] block mb-2">
              Featured Listings
            </span>
            <h2 className="font-['Fraunces',serif] text-4xl font-light italic text-[#18180F]">
              Handpicked Properties
            </h2>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('properties')}
            className="text-xs font-semibold text-[#18180F] underline underline-offset-4 hover:text-[#B8945A] transition-colors cursor-pointer"
          >
            View all listings
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listingsToDisplay.map((item) => {
            const itemId = item._id || item.id;
            const isSaved = savedIds.includes(itemId);

            return (
              <div 
                key={itemId} 
                onClick={() => onNavigate && onNavigate('property', { id: itemId, property: item })}
                className="group bg-[#F7F5F0] rounded-2xl overflow-hidden border border-[#E2DDD4] transition-all hover:shadow-xl cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title || 'Property'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#18180F] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {item.type || item.tag || 'Featured'}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSave) onSave(itemId, item);
                    }}
                    className={`absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full transition-colors ${
                      isSaved ? 'text-red-500' : 'text-[#18180F] hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                  <div className="absolute bottom-4 left-4 font-['Fraunces',serif] text-xl font-bold italic text-white drop-shadow-md">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-base text-[#18180F] mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-[#7A7568] mb-4">{item.location}</p>

                  <div className="flex items-center gap-4 text-xs text-[#7A7568] pt-3 border-t border-[#E2DDD4]">
                    <span className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-[#B8945A]" /> {item.bedrooms || item.beds || 0} Beds</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-[#B8945A]" /> {item.bathrooms || item.baths || 0} Baths</span>
                    <span className="flex items-center gap-1.5"><Square className="w-3.5 h-3.5 text-[#B8945A]" /> {item.areaSqFt || item.sqft || item.area || 'N/A'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}