import React, { useEffect, useState } from 'react';
import API from '../api';

export default function PropertyDetail({ propertyId, onNavigate }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [chatOpen, setChatOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await API.get(`/properties/${propertyId}`);

        setProperty(res.data);
      } catch (err) {
        console.error('Failed to fetch property:', err);
        setError(
          err.response?.data?.message ||
            'Unable to load property details.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    const message = userMsg.trim();

    if (!message || chatLoading) return;

    setChatHistory((prev) => [
      ...prev,
      {
        role: 'user',
        text: message,
      },
    ]);

    setUserMsg('');
    setChatLoading(true);

    try {
      const res = await API.post('/ai/property-chat', {
        message,
        propertyContext: property,
      });

      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            res.data?.reply ||
            'Sorry, I could not generate a response.',
        },
      ]);
    } catch (err) {
      console.error('Property chat error:', err);

      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            err.response?.data?.message ||
            'Sorry, something went wrong while contacting the AI assistant.',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E2DDD4] border-t-[#B8945A] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#7A7568]">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] pt-24 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E2DDD4] p-8 text-center">
          <h2 className="font-['Fraunces',serif] text-3xl text-[#18180F] mb-3">
            Property Not Found
          </h2>

          <p className="text-sm text-[#7A7568] mb-6">
            {error || 'This property could not be found.'}
          </p>

          <button
            onClick={() => onNavigate && onNavigate('properties')}
            className="px-6 py-3 bg-[#18180F] text-white rounded-xl text-sm font-medium hover:bg-[#B8945A] transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const images =
    property.images?.length > 0
      ? property.images
      : property.image
        ? [property.image]
        : [];

  const features = Array.isArray(property.features)
    ? property.features
    : [];

  const area =
    property.area ||
    property.areaSqFt ||
    property.size ||
    'N/A';

  const bedrooms =
    property.bedrooms ??
    property.beds ??
    'N/A';

  const bathrooms =
    property.bathrooms ??
    property.baths ??
    'N/A';

  const propertyType =
    property.type ||
    property.propertyType ||
    'Property';

  const price =
    typeof property.price === 'number'
      ? `₨ ${property.price.toLocaleString()}`
      : property.price || 'Price on request';

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-16 font-['Outfit',sans-serif]">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => onNavigate && onNavigate('properties')}
          className="text-sm text-[#7A7568] hover:text-[#B8945A] transition-colors"
        >
          ← Back to Properties
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-[#EDEAE2] rounded-2xl overflow-hidden aspect-[4/3]">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={property.title || 'Property'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#7A7568]">
                  No Image Available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.slice(0, 4).map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="aspect-square rounded-xl overflow-hidden bg-[#EDEAE2]"
                  >
                    <img
                      src={image}
                      alt={`${property.title || 'Property'} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property information */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#B8945A] font-semibold mb-3">
              {propertyType}
            </p>

            <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-[#18180F] leading-tight mb-4">
              {property.title || 'Beautiful Property'}
            </h1>

            <p className="text-[#7A7568] text-base mb-6">
              📍 {property.location || property.city || 'Location unavailable'}
            </p>

            {/* Price */}
            <div className="bg-[#18180F] rounded-2xl p-6 mb-6">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
                Asking Price
              </p>

              <p className="text-3xl font-semibold text-[#B8945A]">
                {price}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white rounded-xl border border-[#E2DDD4] p-4 text-center">
                <p className="text-2xl font-semibold text-[#18180F]">
                  {bedrooms}
                </p>
                <p className="text-xs text-[#7A7568] mt-1">
                  Bedrooms
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E2DDD4] p-4 text-center">
                <p className="text-2xl font-semibold text-[#18180F]">
                  {bathrooms}
                </p>
                <p className="text-xs text-[#7A7568] mt-1">
                  Bathrooms
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E2DDD4] p-4 text-center">
                <p className="text-2xl font-semibold text-[#18180F]">
                  {area}
                </p>
                <p className="text-xs text-[#7A7568] mt-1">
                  Area
                </p>
              </div>
            </div>

            {/* AI Assistant */}
            <button
              onClick={() => setChatOpen(true)}
              className="w-full bg-[#B8945A] text-white rounded-xl py-4 font-medium hover:bg-[#18180F] transition-colors"
            >
              ✨ Ask Gemini About This Property
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2DDD4] p-7">
            <h2 className="font-['Fraunces',serif] text-2xl font-semibold text-[#18180F] mb-4">
              About This Property
            </h2>

            <p className="text-[#7A7568] leading-7">
              {property.description ||
                'No description is available for this property.'}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-[#E2DDD4] p-7">
            <h2 className="font-['Fraunces',serif] text-2xl font-semibold text-[#18180F] mb-4">
              Features
            </h2>

            {features.length > 0 ? (
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="flex items-center gap-3 text-sm text-[#7A7568]"
                  >
                    <span className="text-[#B8945A]">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#7A7568]">
                No features listed.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#18180F] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[#B8945A] text-xs uppercase tracking-widest font-semibold">
                  Gemini AI Assistant
                </p>

                <h3 className="text-white font-['Fraunces',serif] text-xl mt-1">
                  Ask About This Property
                </h3>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-5 bg-[#F7F5F0] space-y-4">
              {chatHistory.length === 0 && (
                <div className="bg-white rounded-xl p-4 border border-[#E2DDD4]">
                  <p className="text-sm text-[#18180F]">
                    Hi! 👋 Ask me anything about this property,
                    such as price, bedrooms, location, investment
                    potential, or features.
                  </p>
                </div>
              )}

              {chatHistory.map((chat, index) => (
                <div
                  key={`${chat.role}-${index}`}
                  className={`flex ${
                    chat.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                      chat.role === 'user'
                        ? 'bg-[#18180F] text-white'
                        : 'bg-white text-[#18180F] border border-[#E2DDD4]'
                    }`}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E2DDD4] rounded-xl px-4 py-3 text-sm text-[#7A7568]">
                    Gemini is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleChatSubmit}
              className="p-4 border-t border-[#E2DDD4] flex gap-3"
            >
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Ask something about this property..."
                disabled={chatLoading}
                className="flex-1 px-4 py-3 bg-[#F7F5F0] border border-[#E2DDD4] rounded-xl text-sm outline-none focus:border-[#B8945A]"
              />

              <button
                type="submit"
                disabled={chatLoading || !userMsg.trim()}
                className="px-5 py-3 bg-[#18180F] text-white rounded-xl text-sm font-medium hover:bg-[#B8945A] transition-colors disabled:opacity-50"
              >
                {chatLoading ? '...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}