import { useState } from 'react';

export default function Nav({ page, user, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'landing', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'ai', label: 'AI Assistant' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#E2DDD4] font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="font-['Fraunces',serif] text-xl font-semibold tracking-tight text-[#18180F] italic"
        >
          Estate<span className="not-italic text-[#B8945A]">AI</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-colors ${
                page === link.id
                  ? 'text-[#18180F] font-semibold'
                  : 'text-[#7A7568] hover:text-[#18180F]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 text-sm text-[#7A7568] hover:text-[#18180F] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#B8945A] flex items-center justify-center text-white text-xs font-semibold">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                {user.name ? user.name.split(' ')[0] : 'User'}
              </button>
              <button
                onClick={onLogout}
                className="text-sm text-[#7A7568] hover:text-[#18180F] transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-[#7A7568] hover:text-[#18180F] transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="text-sm font-medium bg-[#18180F] text-[#F7F5F0] px-4 py-2 rounded-md hover:bg-[#2a2a1a] transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-[#18180F] p-2"
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
        <div className="md:hidden border-t border-[#E2DDD4] bg-[#F7F5F0] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              className={`text-sm font-medium text-left transition-colors ${page === link.id ? 'text-[#18180F] font-semibold' : 'text-[#7A7568]'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-[#E2DDD4]">
            {user ? (
              <>
                <button onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }} className="text-sm font-medium text-[#18180F]">Dashboard</button>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className="text-sm text-[#7A7568]">Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => { onNavigate('login'); setMenuOpen(false); }} className="text-sm font-medium text-[#7A7568]">Login</button>
                <button onClick={() => { onNavigate('signup'); setMenuOpen(false); }} className="text-sm font-medium bg-[#18180F] text-[#F7F5F0] px-4 py-2 rounded-md">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}