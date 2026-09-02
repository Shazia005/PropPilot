import React, { useState } from 'react';

export default function Navbar({ page, currentPage, user, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const name = user?.name || user?.user?.name || 'User';
  const firstInitial = name.charAt(0).toUpperCase();
  const displayName = name.split(' ')[0];

  // Accepts either prop safely and converts to lowercase
  const activePage = String(page || currentPage || '').toLowerCase();

  const links = [
    { id: 'landing', label: 'Home', matches: ['landing', 'home'] },
    { id: 'properties', label: 'Properties', matches: ['properties', 'property'] },
    { id: 'ai', label: 'AI Assistant', matches: ['ai', 'ai-assistant', 'assistant'] },
    { id: 'about', label: 'About', matches: ['about'] },
  ];

  const handleNavClick = (targetId) => {
    if (onNavigate) onNavigate(targetId);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0] border-b border-[#E2DDD4] font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick(user ? 'dashboard' : 'landing')}
          className="font-['Fraunces',serif] text-xl font-semibold tracking-tight text-[#18180F] italic cursor-pointer"
        >
          Estate<span className="not-italic text-[#B8945A]">AI</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = link.matches.includes(activePage);

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm transition-all cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#5C3D1E] font-extrabold border-b-2 border-[#5C3D1E]' // Dark Brown Bold & Underline
                    : 'text-[#7A7568] font-medium hover:text-[#5C3D1E]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#B8945A] text-white flex items-center justify-center text-xs font-medium">
                  {firstInitial}
                </div>
                <span className="text-xs text-[#18180F] font-medium">
                  {displayName}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-[#7A7568] hover:text-[#18180F] transition-colors ml-1 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('login')}
                className="text-xs font-medium text-[#7A7568] hover:text-[#18180F] transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick('signup')}
                className="text-xs font-medium bg-[#18180F] text-[#F7F5F0] px-4 py-2 rounded-md hover:bg-[#2a2a1a] transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-[#18180F] p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E2DDD4] bg-[#F7F5F0] px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => {
            const isActive = link.matches.includes(activePage);

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm text-left transition-colors cursor-pointer ${
                  isActive ? 'text-[#5C3D1E] font-bold' : 'text-[#7A7568] font-medium'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}