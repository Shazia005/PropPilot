// About.jsx
import React from 'react';

export default function About({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 pt-16 pb-12">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <p className="text-[#B8945A] text-xs font-semibold tracking-widest uppercase mb-4">
          About EstateAI
        </p>

        <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-[#18180F] italic leading-tight mb-6">
          Intelligent property search for Pakistan.
        </h1>

        <p className="text-[#7A7568] text-sm md:text-base leading-relaxed mb-4 max-w-xl">
          EstateAI combines a curated database of premium properties with large language model technology to make finding your ideal home effortless, transparent, and precise.
        </p>

        <p className="text-[#7A7568] text-sm md:text-base leading-relaxed mb-8 max-w-xl">
          Founded in Islamabad, we operate across Pakistan's major cities, working with verified agents and developers to bring you the most accurate and up-to-date listings.
        </p>

        <button
          onClick={() => onNavigate('ai')}
          className="bg-[#18180F] hover:bg-black text-[#F7F5F0] text-sm font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Try AI Assistant
        </button>
      </div>
    </div>
  );
}