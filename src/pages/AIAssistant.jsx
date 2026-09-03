import React, { useState } from 'react';
import AIPromptBar from '../components/AIPromptBar';
import PropertyCard from '../components/PropertyCard';

export default function AIAssistant({ onNavigate, savedIds = [], onSave, initialQuery = '' }) {
  const [searchResults, setSearchResults] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResults = (data) => {
    if (Array.isArray(data)) {
      setSearchResults(data);
      setAiSummary('');
    } else if (data && typeof data === 'object') {
      setSearchResults(data.properties || []);
      setAiSummary(data.aiSummary || '');
    }
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-[#F7F5F0] font-['Outfit',sans-serif]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#B8945A]/10 border border-[#B8945A]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#B8945A] text-xs font-semibold tracking-wider uppercase">AI Property Assistant</span>
          </div>
          <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-[#18180F] italic leading-tight mb-3">
            Tell us what you're looking for.
          </h1>
          <p className="text-[#7A7568] text-base max-w-lg mx-auto">
            Describe your ideal property in plain language.
          </p>
        </div>

        {/* Embedded AI Prompt Bar Component */}
        <AIPromptBar 
          initialQuery={initialQuery}
          onSearchResults={handleResults} 
          setLoading={setLoading} 
        />

        {/* Live Search Results Displayed Right Here */}
        <div className="mt-12">
          {loading && (
            <p className="text-center text-[#B8945A] text-sm animate-pulse">Searching properties for you...</p>
          )}

          {!loading && hasSearched && searchResults.length === 0 && (
            <div className="text-center py-8 bg-white rounded-2xl border border-[#E2DDD4]">
              <p className="text-[#18180F] font-medium text-base mb-1">No properties matched your query.</p>
              <p className="text-[#7A7568] text-xs">Try broadening your search terms or budget.</p>
            </div>
          )}

          {!loading && searchResults.length > 0 && (
            <div>
              {/* AI Summary Banner */}
              {aiSummary && (
                <div className="bg-[#18180F] text-white p-5 rounded-2xl mb-8 shadow-sm border border-[#B8945A]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B8945A]">✨ AI Assistant Summary</span>
                  </div>
                  <p className="text-sm text-[#EDEAE2] leading-relaxed">{aiSummary}</p>
                </div>
              )}

              <h2 className="font-['Fraunces',serif] text-2xl font-semibold text-[#18180F] italic mb-6">
                Found Matches ({searchResults.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard
                    key={property._id || property.id}
                    property={property}
                    saved={savedIds.includes(property._id || property.id)}
                    onSave={onSave}
                    onClick={() => onNavigate && onNavigate('property', { id: property._id || property.id })}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}