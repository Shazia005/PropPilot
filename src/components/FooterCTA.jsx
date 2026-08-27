import React from 'react';

export default function FooterCTA({ onNavigate }) {
  return (
    <footer className="bg-[#18180F] text-white pt-24 font-['Outfit',sans-serif]">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h2 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-white italic mb-6">
          Ready to find your perfect property?
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Join over 4,800 satisfied clients who found their home using EstateAI's intelligent property matching.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate && onNavigate('signup')}
            className="bg-[#B8945A] hover:bg-[#a07d4a] text-white font-medium px-8 py-4 rounded-lg transition-colors text-sm"
          >
            Get Started Free
          </button>
          <button
            onClick={() => onNavigate && onNavigate('ai')}
            className="border border-white/20 text-white hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-colors text-sm"
          >
            Try AI Assistant
          </button>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            onClick={() => onNavigate && onNavigate('landing')}
            className="font-['Fraunces',serif] text-white text-lg italic font-semibold cursor-pointer"
          >
            Estate<span className="not-italic text-[#B8945A]">AI</span>
          </p>
          <p className="text-white/40 text-sm">
            © 2026 EstateAI. Premium Property Intelligence.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <button 
              onClick={() => onNavigate && onNavigate('privacy')} 
              className="hover:text-white/70 transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('terms')} 
              className="hover:text-white/70 transition-colors"
            >
              Terms
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('contact')} 
              className="hover:text-white/70 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}