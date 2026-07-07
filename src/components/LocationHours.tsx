import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, Mail, Navigation, Send, Check } from 'lucide-react';

export default function LocationHours() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate sending message
    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  const mapLink = "https://www.google.com/maps/place/The+Daily+Grind+Coffee+Shop/@17.1602256,-89.0712181,17z/data=!3m1!4b1!4m6!3m5!1s0x8f5e670018f8cb99:0xfb85d0c9340f47ba!8m2!3d17.1602256!4d-89.0712181!16s%2Fg%2F11y5g0l554";

  return (
    <section id="location" className="py-20 bg-[#FDFBF7] text-[#1E110A] px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] font-semibold">Visit The Daily Grind</span>
          <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight mt-2 mb-4">
            Where to Find Us
          </h2>
          <div className="h-1 w-20 bg-[#C89D7C] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-500">
            Located right on the main corridor connecting Santa Elena and San Ignacio. Stop by on your way to the Mayan ruins, or settle in for a relaxing remote workday.
          </p>
        </div>

        {/* Layout: Info & Map vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Location Info & Map Panel (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            
            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* Address */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2D1B10]/5 text-[#C89D7C] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Coffee Address</h4>
                  <p className="text-sm text-gray-800 font-semibold mt-1">
                    George Price Highway, <br />
                    Santa Elena, Cayo, Belize
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Opposite the stadium entrance</p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2D1B10]/5 text-[#C89D7C] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Opening Hours</h4>
                  <p className="text-sm text-gray-850 font-bold mt-1">
                    Mon – Sat: <span className="font-medium">6:30 AM – 6:00 PM</span>
                  </p>
                  <p className="text-sm text-gray-850 font-bold mt-0.5">
                    Sunday: <span className="font-medium">7:30 AM – 2:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized vector map representation */}
            <div className="relative bg-[#25150D] rounded-2xl p-6 border border-[#3D2516] flex flex-col items-center justify-center h-80 overflow-hidden shadow-lg select-none">
              
              {/* Abstract map canvas rendering inside (very creative & professional) */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                {/* River path */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,220 C 150,220 200,80 350,80 C 450,80 500,180 700,180" fill="none" stroke="#2563EB" strokeWidth="24" strokeLinecap="round" />
                  {/* Grid lines */}
                  <line x1="100" y1="0" x2="100" y2="400" stroke="white" strokeWidth="1" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeWidth="1" />
                  <line x1="500" y1="0" x2="500" y2="400" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="150" x2="700" y2="150" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="280" x2="700" y2="280" stroke="white" strokeWidth="1" />
                </svg>
              </div>

              {/* Labels on Map representation */}
              <div className="absolute top-12 left-10 text-gray-400 font-mono text-[10px] uppercase">San Ignacio Town</div>
              <div className="absolute bottom-16 right-16 text-gray-400 font-mono text-[10px] uppercase">Santa Elena Hills</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-[#C89D7C] text-[#1E110A] flex items-center justify-center shadow-2xl border-4 border-white"
                >
                  <MapPin size={24} strokeWidth={2.5} />
                </motion.div>
                <div className="bg-[#1E110A] text-white px-3 py-1.5 rounded-lg text-xs font-bold font-sans border border-[#C89D7C] shadow-lg mt-3">
                  The Daily Grind Coffee Shop
                </div>
              </div>

              {/* River label */}
              <div className="absolute top-[110px] left-1/3 -rotate-12 text-blue-400 font-mono text-[9px] uppercase tracking-widest font-semibold">
                Macal River Bridge
              </div>

              {/* Outbound Map CTA button */}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-4 py-2 bg-white hover:bg-gray-100 text-[#1E110A] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-gray-200 transition-all flex items-center gap-1.5"
              >
                <Navigation size={13} className="text-amber-700" />
                Get Directions
              </a>

            </div>

          </div>

          {/* Contact Inquiry Form (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between text-left">
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Drop Us a Line</h3>
              <p className="text-xs text-gray-500 mb-6">
                Have a question about large group bookings, event rentals, catering, or need help ordering? Message our Santa Elena shop owner directly!
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    placeholder="Jane Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    id="contact-message-textarea"
                    rows={4}
                    placeholder="What would you like to ask or tell us?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-3.5 bg-[#2D1B10] hover:bg-[#1E110A] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                >
                  <Send size={13} />
                  Send Inquiry Message
                </button>
              </form>
            </div>

            {/* Contact Micro Info Footer */}
            <div className="border-t border-gray-100 pt-6 mt-6 flex flex-col gap-2.5 text-xs text-gray-500 font-mono">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#C89D7C]" />
                <span>+501 612-3610 (Call / WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#C89D7C]" />
                <span>orders@thedailygrindbelize.com</span>
              </div>
            </div>

            {/* Overlay Sent Confirmation */}
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h4 className="text-lg font-bold text-[#2D1B10] mb-2">Message Received!</h4>
                  <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                    We've got your note and we will reply as soon as possible. Thank you for connecting with us!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
