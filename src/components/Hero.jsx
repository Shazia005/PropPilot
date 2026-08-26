import React from 'react';

export default function Hero({ query, setQuery, onSearch, onNavigate, stats = [] }) {
  const defaultStats = [
    { value: '1,240+', label: 'Properties Listed' },
    { value: '4,800+', label: 'Happy Clients' },
    { value: 'Rs 12B+', label: 'Transactions' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const statsToDisplay = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="relative min-h-screen bg-[#18180F] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center font-['Outfit',sans-serif] flex flex-col justify-between">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />

      {/* Main Content Area */}
      <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-20 z-10 text-center flex-1 flex flex-col justify-center items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8945A] animate-pulse" />
          <span className="text-white/90 text-[11px] font-medium tracking-widest uppercase">
            AI-Powered Property Search
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['Fraunces',serif] text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] italic mb-6 max-w-3xl">
          Find a Property That Fits Your Life &amp; Budget.
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-lg md:text-base mb-10 leading-relaxed max-w-xl font-normal">
          Describe your dream home in plain language. Our AI understands your needs and finds the perfect match from thousands of verified listings.
        </p>

        {/* Search Bar Form */}
        <form onSubmit={onSearch} className="w-full max-w-2xl mb-10">
          <div className="flex items-center bg-white rounded-2xl p-2 shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 4-bedroom house in Islamabad under 3 crore with garden..."
              className="flex-1 px-5 py-3 text-[#18180F] placeholder-[#7A7568]/70 text-xs md:text-sm bg-transparent outline-none"
            />
            <button
              type="submit"
              className="bg-[#B8945A] hover:bg-[#a07d4a] text-white font-medium text-xs md:text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Find with AI
            </button>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-6">
          <button
            onClick={() => onNavigate && onNavigate('properties')}
            className="border border-white/30 hover:border-white text-white font-medium text-xs md:text-sm px-6 py-3 rounded-xl transition-colors bg-black/20 backdrop-blur-sm"
          >
            Explore Properties
          </button>
          <button
            onClick={() => onNavigate && onNavigate('ai')}
            className="flex items-center gap-2 text-white/90 hover:text-white text-xs md:text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
            Try AI Assistant
          </button>
        </div>

      </div>

      {/* Glassmorphism Bottom Stats Bar */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/15 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {statsToDisplay.map((s) => (
            <div key={s.label}>
              <p className="font-['Fraunces',serif] text-2xl md:text-3xl font-light text-white italic tracking-tight">
                {s.value}
              </p>
              <p className="text-white/75 text-[11px] font-normal mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}