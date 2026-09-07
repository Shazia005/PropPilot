
import { useState } from 'react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';

export default function PropertyDetail({
  propertyId,
  pageData,
  onNavigate,
  savedIds = [],
  onSave,
  user,
}) {
  const property = pageData?.property;

  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>

          <p className="text-gray-600 mb-8">
            We could not find the property details.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('properties')}
            className="px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const title =
    property.title ||
    property.rawTitle ||
    'Property Listing';

  const location =
    property.location ||
    property.city ||
    'Location unavailable';

  const city =
    property.city ||
    'Pakistan';

  const type =
    property.type ||
    property.propertyType ||
    'House';

  const price =
    property.price ||
    property.rawPrice ||
    'Price unavailable';

  const bedrooms = Number(
    property.bedrooms ?? property.beds ?? 0
  );

  const bathrooms = Number(
    property.bathrooms ?? property.baths ?? 0
  );

  const area =
    property.area ||
    property.areaSqFt ||
    property.rawArea ||
    'N/A';

  const sourceUrl =
    property.sourceUrl ||
    property.rawLink ||
    property.link ||
    '';

  const propertyImages = [];

  if (Array.isArray(property.images)) {
    property.images.forEach((image) => {
      if (image) {
        propertyImages.push(image);
      }
    });
  }

  if (property.image) {
    propertyImages.push(property.image);
  }

  if (property.imageUrl) {
    propertyImages.push(property.imageUrl);
  }

  if (property.rawImage) {
    propertyImages.push(property.rawImage);
  }

  const images =
    propertyImages.length > 0
      ? [...new Set(propertyImages)]
      : [FALLBACK_IMAGE];

  const currentImage =
    images[activeImage] || FALLBACK_IMAGE;

  const propertyIdValue =
    property._id ||
    property.id ||
    propertyId;

  const isSaved =
    savedIds.includes(propertyIdValue);

  const description =
    'This property is located in ' +
    location +
    '. Property details and availability are based on the original listing.';

  const features = [
    bedrooms > 0
      ? bedrooms + ' Bedrooms'
      : null,
    bathrooms > 0
      ? bathrooms + ' Bathrooms'
      : null,
    area !== 'N/A'
      ? area
      : null,
    type,
    'Property Listing',
    'AI Matched',
  ].filter(Boolean);

  const handleSave = () => {
    if (onSave) {
      onSave(propertyIdValue);
    }
  };

  const handleContact = () => {
    setShowContact(true);
  };

  const handleSchedule = () => {
    setShowSchedule(true);
  };

  const handleScheduleSubmit = (event) => {
    event.preventDefault();
    setScheduled(true);
    setShowSchedule(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => onNavigate && onNavigate('properties')}
            className="hover:text-gray-900"
          >
            Properties
          </button>

          <span>/</span>

          <span className="text-gray-900 truncate max-w-xs">
            {title}
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Content */}
          <div className="lg:col-span-2">

            {/* Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

              <div className="relative h-[420px] bg-gray-100">

                <img
                  src={currentImage}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src =
                      FALLBACK_IMAGE;
                  }}
                />

                <div className="absolute top-5 left-5 flex gap-2">

                  <span className="px-4 py-2 rounded-full bg-white/95 text-sm font-semibold text-gray-800 shadow-sm">
                    {type}
                  </span>

                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-sm">
                    AI Match
                  </span>

                </div>

                <button
                  onClick={handleSave}
                  className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:scale-105 transition"
                  aria-label="Save property"
                >
                  <span
                    className={
                      isSaved
                        ? 'text-red-500 text-xl'
                        : 'text-gray-700 text-xl'
                    }
                  >
                    {isSaved ? '♥' : '♡'}
                  </span>
                </button>

                <div className="absolute bottom-5 left-5 px-4 py-2 rounded-full bg-black/60 text-white text-sm">
                  {activeImage + 1} / {images.length}
                </div>

              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto">

                  {images.map((image, index) => (
                    <button
                      key={image + index}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={
                        'w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 ' +
                        (activeImage === index
                          ? 'border-gray-900'
                          : 'border-transparent')
                      }
                    >
                      <img
                        src={image}
                        alt="Property thumbnail"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src =
                            FALLBACK_IMAGE;
                        }}
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Property Heading */}
            <div className="mt-8">

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                <div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {title}
                  </h1>

                  <p className="mt-3 text-gray-600">
                    📍 {location}
                  </p>

                </div>

                <div className="md:text-right">

                  <p className="text-3xl font-bold text-gray-900">
                    Rs {price}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {city}
                  </p>

                </div>

              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">
                  {bedrooms || '—'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Bedrooms
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">
                  {bathrooms || '—'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Bathrooms
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">
                  {area}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Area
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">
                  {type}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Property Type
                </p>
              </div>

            </div>

            {/* About */}
            <section className="mt-8 bg-white rounded-3xl p-7 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                About Property
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {description}
              </p>

            </section>

            {/* Amenities */}
            <section className="mt-6 bg-white rounded-3xl p-7 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                Amenities & Features
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#F7F5F0]"
                  >
                    <span className="text-green-600">
                      ✓
                    </span>

                    <span className="text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

            </section>

            {/* AI Match */}
            <section className="mt-6 bg-gray-900 text-white rounded-3xl p-7">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-300">
                    EstateAI Recommendation
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Strong AI Match
                  </h2>

                  <p className="text-gray-300 mt-3 leading-6">
                    This property was selected because it matches
                    the search criteria provided to the AI assistant.
                  </p>

                </div>

                <div className="hidden sm:flex w-20 h-20 rounded-full border-4 border-white/30 items-center justify-center">
                  <span className="text-2xl font-bold">
                    AI
                  </span>
                </div>

              </div>

            </section>

            {/* Location */}
            <section className="mt-6 bg-white rounded-3xl p-7 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                Location
              </h2>

              <p className="mt-2 text-gray-600">
                {location}
              </p>

              <div className="mt-5 h-64 rounded-2xl bg-gray-200 flex items-center justify-center">
                <div className="text-center">

                  <div className="text-4xl mb-2">
                    📍
                  </div>

                  <p className="font-semibold text-gray-800">
                    {location}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Map location based on the original listing
                  </p>

                </div>
              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">

            <div className="lg:sticky lg:top-24 space-y-5">

              {/* Contact Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Listed Price
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  Rs {price}
                </p>

                <div className="mt-6 space-y-3">

                  <button
                    onClick={handleContact}
                    className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
                  >
                    Contact Agent
                  </button>

                  <button
                    onClick={handleSchedule}
                    className="w-full py-3.5 rounded-xl border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition"
                  >
                    Schedule Visit
                  </button>

                </div>

                {scheduled && (
                  <div className="mt-5 p-4 rounded-xl bg-green-50 text-green-700 text-sm">
                    Visit request scheduled successfully.
                  </div>
                )}

                {showContact && (
                  <div className="mt-5 p-4 rounded-xl bg-gray-50">

                    <p className="font-semibold text-gray-900">
                      Original Listing
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Contact information is available on the
                      original Zameen listing.
                    </p>

                    {sourceUrl && (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm font-semibold text-gray-900 underline"
                      >
                        Open listing
                      </a>
                    )}

                  </div>
                )}

              </div>

              {/* Agent / Source */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Listing Source
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  Zameen Listing
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  View the original property listing for the
                  latest information and contact details.
                </p>

                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-5 w-full text-center py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition"
                  >
                    View Original Listing
                  </a>
                )}

              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                className="w-full py-4 rounded-2xl bg-white shadow-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                {isSaved
                  ? '♥ Saved to Favourites'
                  : '♡ Save to Favourites'}
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">

          <div className="w-full max-w-md bg-white rounded-3xl p-7">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-gray-900">
                Schedule a Visit
              </h2>

              <button
                onClick={() => setShowSchedule(false)}
                className="text-gray-500 hover:text-gray-900 text-xl"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleScheduleSubmit}
              className="mt-6 space-y-4"
            >

              <input
                type="date"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="time"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold"
              >
                Confirm Visit
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );

}
