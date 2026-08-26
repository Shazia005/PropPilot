import React from 'react';

export default function FooterCTA({ onNavigate }) {
  return (
    <footer className="bg-[#18180F] text-white pt-24 pb-12 font-['Outfit',sans-serif]">
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <h2 className="font-['Fraunces',serif] text-4xl md:text-6xl font-light italic mb-6">
          Ready to find your perfect property?
        </h2>
        <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto mb-10 leading-relaxed">
          Join over 4,800 satisfied clients who found their home using EstateAI's intelligent property matching.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate && onNavigate('signup')}
            className="bg-[#B8945A] hover:bg-[#a3814c] text-white px-6 py-3 rounded-xl text-xs font-semibold transition-colors"
          >
            Get Started Free
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('ai')}
            className="border border-white/20 hover:border-white text-white px-6 py-3 rounded-xl text-xs font-semibold transition-colors"
          >
            Try AI Assistant
          </button>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
        <button 
          onClick={() => onNavigate && onNavigate('landing')} 
          className="font-['Fraunces',serif] font-bold italic text-white text-base"
        >
          Estate<span className="not-italic text-[#B8945A]">AI</span>
        </button>
        <p>© 2026 EstateAI. Premium Property Intelligence.</p>
        <div className="flex gap-6">
          <button onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
          <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
          <button onClick={() => onNavigate && onNavigate('contact')} className="hover:text-white transition-colors">Contact</button>
        </div>
      </div>
    </footer>
  );
}