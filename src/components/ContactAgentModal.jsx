import React, { useState, useEffect } from 'react';
import API from '../api';

export default function ContactAgentModal({ property, user, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user?.name || user?.user?.name || '',
        email: user?.email || user?.user?.email || '',
        phone: '',
        message: `Hi, I am interested in ${property?.title || 'this property'}. Please send me more details.`,
      });
      setError('');
      setSuccess(false);
    }
  }, [isOpen, user, property]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post('/inquiries', {
        propertyId: property?._id || property?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        userId: user?._id || user?.id || null,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-['Outfit',sans-serif]">
      <div className="bg-white border border-[#E2DDD4] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <p className="text-[#B8945A] text-[11px] font-semibold tracking-widest uppercase mb-1">
          Direct Agent Contact
        </p>
        <h2 className="font-['Fraunces',serif] text-2xl font-semibold italic text-[#18180F] mb-4">
          Inquire about property
        </h2>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl p-4 text-center my-6">
            ✓ Inquiry sent successfully! An agent will contact you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-3">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-[#18180F] block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#18180F] block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#18180F] block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#18180F] block mb-1">Message</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E2DDD4] rounded-lg text-xs outline-none focus:border-[#B8945A] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#18180F] text-white text-xs font-medium py-3 rounded-xl hover:bg-[#2a2a1a] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Sending Message...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}