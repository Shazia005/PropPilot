// AIAssistant.jsx
import React, { useState } from 'react';

const SUGGESTIONS = [
  "I have a budget of 3 crore and want a 5-bedroom house in Islamabad with parking and a garden.",
  "Looking for a modern villa in DHA Islamabad under 5 crore with a swimming pool.",
  "Need a 3-bedroom apartment in Lahore under 2 crore with gym and parking.",
  "Find me a 4-bedroom house in Karachi with a garden, under 2.5 crore.",
];

export default function AIAssistant({ onNavigate, initialQuery = '' }) {
  const [text, setText] = useState(initialQuery);

  const handleSearch = (searchQuery = text) => {
    if (!searchQuery.trim()) return;
    if (onNavigate) {
      onNavigate('properties', { query: searchQuery });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#B8945A]/10 border border-[#B8945A]/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-3.5 h-3.5 text-[#B8945A]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
            <span className="text-[#B8945A] text-xs font-semibold tracking-wider uppercase">AI Property Assistant</span>
          </div>
          <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-[#18180F] italic leading-tight mb-4">
            Tell us what you're looking for.
          </h1>
          <p className="text-[#7A7568] text-base max-w-lg mx-auto">
            Describe your ideal property in plain language. Our system parses budget, location, bedrooms, and features.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DDD4] shadow-lg overflow-hidden mb-8">
          <div className="p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. I have a budget of 2 crore and want a 5-bedroom house in Islamabad with parking and a garden…"
              rows={3}
              className="w-full text-[#18180F] placeholder-[#C5BFB5] text-sm leading-relaxed bg-transparent outline-none resize-none"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2DDD4] bg-[#FDFCFA]">
            <p className="text-xs text-[#C5BFB5]">Press Enter to search · Shift+Enter for new line</p>
            <button
              type="button"
              onClick={() => handleSearch()}
              className="flex items-center gap-2 bg-[#18180F] hover:bg-[#2a2a1a] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
              Find Properties
            </button>
          </div>
        </div>

        <div className="mb-12">
          <p className="text-xs text-[#7A7568] font-medium mb-3 uppercase tracking-wider">Try an example</p>
          <div className="flex flex-col gap-2">
            {SUGGESTIONS.map((s, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setText(s);
                  handleSearch(s);
                }}
                className="text-left text-sm text-[#7A7568] bg-white border border-[#E2DDD4] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#FAFAF8] hover:border-[#B8945A] transition-all"
              >
                <span className="text-[#B8945A] mr-2">"</span>{s}<span className="text-[#B8945A]">"</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}