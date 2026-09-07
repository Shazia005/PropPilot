import React from 'react';

// Local fallback image — does not depend on any external website
const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#EDEAE2"/>
      <text
        x="400"
        y="285"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#7A7568"
        font-family="Arial, sans-serif"
        font-size="28"
      >
        No Image Available
      </text>
      <text
        x="400"
        y="325"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#A49D91"
        font-family="Arial, sans-serif"
        font-size="16"
      >
        Estate AI
      </text>
    </svg>
  `);

export default function PropertyCard({
  property = {},
  onClick,
  saved = false,
  onSave,
}) {
  const {
    id,
    _id,
    imageUrl,
    image,
    type,
    tag,
    price,
    title,
    location,
    bedrooms,
    beds,
    bathrooms,
    baths,
    areaSqFt,
    sqft,
    area,
  } = property;

const propertyId = _id || id || property.sourceUrl;
  const displayImage = imageUrl || image || FALLBACK_IMAGE;

  const displayType = type || tag || 'Property';

  const displayBeds = bedrooms ?? beds ?? 0;

  const displayBaths = bathrooms ?? baths ?? 0;

  const displaySqFt = areaSqFt || sqft || area || 'N/A';

  const formatPrice = (val) => {
    if (!val) return 'Contact for Price';

    if (typeof val === 'number') {
      return `Rs ${val.toLocaleString()}`;
    }

    if (
      typeof val === 'string' &&
      !val.toLowerCase().includes('rs')
    ) {
      return `Rs ${val}`;
    }

    return val;
  };

  const handleSave = (e) => {
    e.stopPropagation();

    if (onSave) {
onSave(propertyId, property);    }
  };

  const handleImageError = (e) => {
    // Prevent an infinite loop if the image itself fails
    if (e.currentTarget.src !== FALLBACK_IMAGE) {
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-[#E2DDD4]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18180F]/5">
        <img
          src={displayImage}
          alt={title || 'Property'}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Property Type Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#18180F] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          {displayType}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#18180F] hover:text-[#B8945A] hover:bg-white transition-all shadow-sm"
          aria-label="Save Property"
        >
          <svg
            className="w-4 h-4"
            fill={saved ? '#B8945A' : 'none'}
            stroke={saved ? '#B8945A' : 'currentColor'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-4 text-white">
          <span className="font-['Fraunces',serif] italic text-xl md:text-2xl font-bold drop-shadow-md">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-[#18180F] text-base leading-snug group-hover:text-[#B8945A] transition-colors line-clamp-1">
            {title || 'Untitled Property'}
          </h3>

          <p className="text-xs text-[#7A7568] mt-1 line-clamp-1">
            {location || 'Location upon request'}
          </p>
        </div>

        {/* Key Specs Footer */}
        <div className="flex items-center gap-4 text-[#7A7568] text-xs pt-4 mt-4 border-t border-[#E2DDD4]/60">
          {/* Bedrooms */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
              />
            </svg>

            <span>{displayBeds} Beds</span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>

            <span>{displayBaths} Baths</span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v16.5h16.5"
              />
            </svg>

            <span>{displaySqFt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}