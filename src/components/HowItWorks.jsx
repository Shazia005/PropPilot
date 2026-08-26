import React from 'react';

export default function HowItWorks({ onNavigate }) {
  const steps = [
    { step: '01', title: 'Describe your requirements', desc: 'Type naturally: "I want a 4-bedroom house in Islamabad under 3 crore with a garden and parking."' },
    { step: '02', title: 'AI extracts preferences', desc: 'Our system parses budget, location, bedrooms, property type, and desired features from your text.' },
    { step: '03', title: 'Ranked results appear', desc: 'Properties are scored and ranked by compatibility, with clear explanations for each match.' },
  ];

  return (
    <section className="py-24 bg-[#F7F5F0] font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#B8945A] text-xs font-semibold tracking-widest uppercase mb-4">How It Works</p>
            <h2 className="font-['Fraunces',serif] text-4xl md:text-5xl font-semibold text-[#18180F] italic leading-tight mb-6">
              Tell us what you need.<br />Our AI does the rest.
            </h2>
            <p className="text-[#7A7568] leading-relaxed mb-10">
              No complex filters. No endless scrolling. Simply describe your ideal property in your own words — budget, location, size, and any features you want — and our AI extracts every detail and surfaces the properties that match best.
            </p>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-5">
                  <span className="font-['Fraunces',serif] text-3xl font-light italic text-[#B8945A]/50 leading-none mt-0.5 w-8 flex-shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-[#18180F] mb-1">{item.title}</h3>
                    <p className="text-[#7A7568] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('ai')}
              className="mt-10 inline-flex items-center gap-2 bg-[#18180F] text-[#F7F5F0] font-medium text-sm px-6 py-3 rounded-lg hover:bg-[#2a2a1a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
              Try AI Assistant Free
            </button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl border border-[#E2DDD4] shadow-xl overflow-hidden">
              <div className="bg-[#18180F] px-5 py-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#B8945A]" />
                <span className="text-white/60 text-xs font-medium">EstateAI Assistant</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-[#F7F5F0] rounded-xl p-4">
                  <p className="text-[#18180F] text-sm leading-relaxed">"I need a modern 5-bedroom house in Islamabad under 3 crore with parking and a garden."</p>
                </div>
                <div className="border border-[#E2DDD4] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-[#B8945A] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-[#18180F]">AI Understanding</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['Budget', 'Up to ₨3 Crore'],
                      ['Location', 'Islamabad'],
                      ['Bedrooms', '5+'],
                      ['Features', 'Parking, Garden'],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-[#F7F5F0] rounded-lg px-3 py-2">
                        <p className="text-[#7A7568] text-xs">{k}</p>
                        <p className="text-[#18180F] text-xs font-semibold">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-[#E2DDD4] rounded-xl">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=60&h=60&fit=crop&auto=format" alt="Property" className="w-14 h-14 rounded-lg object-cover bg-[#EDEAE2]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-medium text-[#18180F]">F-7 Family Home</p>
                      <span className="bg-[#B8945A] text-white text-xs font-bold px-2 py-0.5 rounded-full">94%</span>
                    </div>
                    <p className="text-xs text-[#7A7568]">F-7 Sector · 5 Beds · ₨2.9 Cr</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#B8945A]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}