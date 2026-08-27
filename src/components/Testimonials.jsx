import React from 'react';

const mockTestimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Homebuyer in Islamabad',
    text: 'EstateAI helped me find our dream home in DHA Phase 5 within days. The AI matching understood exactly what we needed.',
    avatar: 'S',
  },
  {
    name: 'Tariq Mehmood',
    role: 'Property Investor',
    text: 'The search precision is unmatched. Describing my budget and preferences in plain text saved me weeks of manual searching.',
    avatar: 'T',
  },
  {
    name: 'Ayesha Khan',
    role: 'First-time Buyer',
    text: 'Transparent listings and intelligent recommendations. It made buying my first penthouse completely stress-free.',
    avatar: 'A',
  },
];

export default function Testimonials({ testimonials = [] }) {
  const testimonialsToDisplay = testimonials.length > 0 ? testimonials : mockTestimonials;

  return (
    <section className="py-24 bg-[#F7F5F0] font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-[#B8945A] text-xs font-semibold tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-['Fraunces',serif] text-4xl font-semibold text-[#18180F] italic">
            Trusted by thousands
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsToDisplay.map((t, idx) => (
            <div 
              key={t.name || idx} 
              className="bg-white rounded-xl p-6 border border-[#E2DDD4] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-4 h-4 text-[#B8945A]" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#18180F] text-sm leading-relaxed mb-5 italic">
                "{t.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#B8945A] flex items-center justify-center text-white text-sm font-bold uppercase">
                  {t.avatar || (t.name ? t.name.charAt(0) : 'U')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18180F]">{t.name}</p>
                  <p className="text-xs text-[#7A7568]">{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}