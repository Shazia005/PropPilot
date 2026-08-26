import React from 'react';
import { Bed, Bath, Square, MapPin, Sparkles } from 'lucide-react';

export default function PropertyCard({ property }) {
  return (
    <div className="bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={property.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> AI Verified
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-[var(--color-muted-foreground)] text-xs font-medium mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.location}</span>
        </div>
        <h3 className="font-display font-bold text-xl mb-2 text-[var(--color-foreground)] line-clamp-1">{property.title}</h3>
        <p className="text-[var(--color-muted-foreground)] text-sm mb-4 line-clamp-2">{property.description}</p>

        <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)] border-t border-b border-[var(--color-border)] py-2.5 mb-4">
          <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-[var(--color-accent)]" /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-[var(--color-accent)]" /> {property.bathrooms} Baths</span>
          <span className="flex items-center gap-1.5"><Square className="w-4 h-4 text-[var(--color-accent)]" /> {property.areaSqFt} sqft</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--color-muted-foreground)] block">Price</span>
            <span className="font-bold text-lg text-[var(--color-accent)]">${Number(property.price).toLocaleString()}</span>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-muted)] transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}