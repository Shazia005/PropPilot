import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedListings from './components/FeaturedListings';
import Testimonials from './components/Testimonials';
import FooterCTA from './components/FooterCTA';

export default function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error('Error fetching backend listings:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#18180F] font-sans antialiased selection:bg-[#B8945A] selection:text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedListings properties={properties} />
      <Testimonials />
      <FooterCTA />
    </div>
  );
}