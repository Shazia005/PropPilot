import React, { useState, useEffect } from 'react';
import API from '../api';
import ContactAgentModal from '../components/ContactAgentModal';

export default function PropertyDetail({ propertyId, user, onNavigate, savedIds = [], onSave }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitScheduled, setVisitScheduled] = useState(false);

  // Property AI Chat State
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (propertyId) {
      setLoading(true);
      API.get(`/properties/${propertyId}`)
        .then((res) => {
          setProperty(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch property details:', err);
          setLoading(false);
        });
    }
    setActiveImage(0);
    setIsModalOpen(false);
    setVisitScheduled(false);
    setChatHistory([]);
    setChatQuestion('');
  }, [propertyId]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuestion.trim() || chatLoading) return;

    const userMsg = chatQuestion.trim();
    setChatQuestion('');
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const res = await API.post('/ai/property-chat', {
        property,
        userQuestion: userMsg,
      });

      setChatHistory((prev) => [...prev, { role: 'assistant', text: res.data.answer }]);
    } catch (err) {
      console.error('Property chat error:', err);
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Sorry, I failed to process your question. Please try again.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center bg-[#F7F5F0]">
        <p className="text-[#7A7568] text-sm">Loading details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#F7F5F0]">
        <div className="text-center">
          <p className="text-[#7A7568] mb-4">Property not found.</p>
          <button onClick={() => onNavigate('properties')} className="text-[#B8945A] font-medium hover:underline">
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  const propId = property._id || property.id;
  const isSaved = savedIds.includes(propId);
  const propertyImages = property.images?.length > 0 ? property.images : [property.image || property.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];
  const agent = property.agent || { name: 'Property Agent', phone: '+92 300 1234567', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format' };
  const features = property.features || ['Parking', 'Security'];

  return (
    <div className="min-h-screen pt-16 bg-[#F7F5F0] font-['Outfit',sans-serif]">
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
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-[#EDEAE2]">
                <img
                  src={propertyImages[activeImage] || propertyImages[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 text-[#18180F] text-xs font-medium px-3 py-1.5 rounded-full">
                    {property.type || property.category || 'Property'}
                  </span>
                </div>
                <button
                  onClick={() => onSave(propId)}
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

            {/* Main Details */}
            <div className="bg-white rounded-2xl border border-[#E2DDD4] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-['Fraunces',serif] text-2xl md:text-3xl font-semibold text-[#18180F] italic mb-1">
                    {property.title}
                  </h1>
                  <p className="text-[#7A7568] text-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                    {property.location}, {property.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-['Fraunces',serif] text-3xl font-semibold text-[#18180F] italic">
                    {typeof property.price === 'number' ? `₨ ${property.price} Cr` : property.price}
                  </p>
                  {typeof property.price === 'number' && (
                    <p className="text-xs text-[#7A7568] mt-0.5">PKR {(property.price * 10000000).toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 py-5 border-t border-b border-[#E2DDD4] mb-5">
                {[
                  { label: 'Bedrooms', value: property.bedrooms || property.beds || 0 },
                  { label: 'Bathrooms', value: property.bathrooms || property.baths || 0 },
                  { label: 'Area', value: `${(property.area || property.areaSqFt || 0).toLocaleString()} sqft` },
                  { label: 'Type', value: property.type || property.category || 'N/A' },
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
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#E2DDD4] p-6 sticky top-24 space-y-6">
              <div className="text-center">
                <p className="font-['Fraunces',serif] text-4xl font-semibold text-[#18180F] italic">
                  {typeof property.price === 'number' ? `₨ ${property.price} Cr` : property.price}
                </p>
                <p className="text-xs text-[#7A7568] mt-1">
                  {(property.area || property.areaSqFt || 0).toLocaleString()} sqft · {property.bedrooms || property.beds} Beds · {property.bathrooms || property.baths} Baths
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-[#18180F] hover:bg-[#2a2a1a] text-white font-medium text-sm py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Contact Agent
                </button>
                <button
                  onClick={() => setVisitScheduled(true)}
                  className="flex-1 border border-[#E2DDD4] hover:border-[#B8945A] text-[#18180F] font-medium text-sm py-3 rounded-lg transition-colors cursor-pointer"
                >
                  {visitScheduled ? '✓ Scheduled' : 'Schedule Visit'}
                </button>
              </div>

              {visitScheduled && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                  <p className="text-green-700 text-xs font-medium">Visit request sent! Agent will contact you within 24 hours.</p>
                </div>
              )}

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

              {/* AI Property Assistant Chat Drawer */}
              <div className="border-t border-[#EDEAE2] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8945A] mb-2 flex items-center gap-1.5">
                  🤖 Ask AI About This Listing
                </h4>
                
                <div className="max-h-48 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
                  {chatHistory.length === 0 && (
                    <p className="text-[#7A7568] italic text-[11px]">
                      Ask questions like "Is this price negotiable?" or "What are the nearest schools?"
                    </p>
                  )}
                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-[#18180F] text-white ml-4'
                          : 'bg-[#F7F5F0] text-[#18180F] border border-[#E2DDD4] mr-4'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {chatLoading && (
                    <p className="text-[#B8945A] text-[11px] animate-pulse">AI is typing response...</p>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 bg-[#F7F5F0] border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="px-3 py-2 bg-[#B8945A] text-white rounded-lg text-xs font-medium hover:bg-[#a07d4a] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Ask
                  </button>
                </form>
              </div>

              <button
                onClick={() => onSave(propId)}
                className="w-full flex items-center justify-center gap-2 border border-[#E2DDD4] hover:border-[#B8945A] text-sm text-[#7A7568] hover:text-[#B8945A] py-3 rounded-lg transition-colors cursor-pointer"
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

      {/* Inquiry Modal */}
      <ContactAgentModal
        property={property}
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}