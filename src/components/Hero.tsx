import { motion } from 'motion/react';
import { Compass, ShoppingCart, ArrowRight, Heart, Award, Wifi } from 'lucide-react';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
  heroImage: string;
}

export default function Hero({ onScrollTo, heroImage }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-[#1E110A] text-[#FDFBF7] py-16 lg:py-24 px-4 md:px-8">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C89D7C]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D1B10]/40 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D1B10] border border-[#3D2516] text-[#C89D7C] text-xs font-mono uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89D7C] animate-pulse" />
            Santa Elena’s Favorite Neighborhood Spot
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Sip Slow. <br />
            <span className="text-[#C89D7C]">Grind Daily.</span> <br />
            Connect Always.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#EFE3C3]/80 font-sans leading-relaxed max-w-lg mb-8"
          >
            Welcome to <span className="text-white font-medium">The Daily Grind Coffee Shop</span>, where premium hand-roasted Cayo beans meet the comforting warmth of fresh Belizean breakfast. Whether you are refuel-seeking, working, or laughing with friends, find your home with us on the George Price Highway.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-explore-menu-btn"
              onClick={() => onScrollTo('menu')}
              className="px-8 py-4 bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 group w-full sm:w-auto"
            >
              Explore Our Menu
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-build-drink-btn"
              onClick={() => onScrollTo('builder')}
              className="px-8 py-4 bg-transparent hover:bg-[#2D1B10]/40 border border-[#C89D7C]/50 hover:border-[#C89D7C] text-[#C89D7C] hover:text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Build Custom Drink
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Styled Banner Frame */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2D1B10]"
          >
            {/* The main generated image */}
            <img
              src={heroImage}
              alt="The Daily Grind Coffee Shop Interior"
              className="w-full h-[320px] md:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Quick Info Badge floating on image */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1E110A]/90 backdrop-blur-md p-4 rounded-xl border border-[#3D2516]/50 flex justify-between items-center text-left">
              <div>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-[#C89D7C]">Our Roastery</span>
                <span className="text-sm font-semibold text-white">100% Organic Cayo Beans</span>
              </div>
              <div className="bg-[#C89D7C] text-[#1E110A] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
                <span>★ 4.9</span>
                <span className="text-[10px] text-[#1E110A]/80 font-normal">(230+ Reviews)</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative Floating Card */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="hidden sm:flex absolute -top-4 -right-4 bg-[#2D1B10] p-4 rounded-xl border border-[#3D2516] shadow-lg items-center gap-3 max-w-[200px]"
          >
            <div className="p-2 bg-[#C89D7C]/10 text-[#C89D7C] rounded-lg">
              <Wifi size={20} />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Nomad Heaven</span>
              <span className="text-[10px] font-mono text-gray-400">High Speed 100 Mbps</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-[#3D2516]/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-[#2D1B10] border border-[#3D2516] flex items-center justify-center text-[#C89D7C] shrink-0">
            <Award size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Premium Coffee</h3>
            <p className="text-xs text-[#EFE3C3]/70 mt-1">Rich, aromatic single-origin beans locally sourced and roasted right here in Cayo.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-[#2D1B10] border border-[#3D2516] flex items-center justify-center text-[#C89D7C] shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Local Belizean Breakfast</h3>
            <p className="text-xs text-[#EFE3C3]/70 mt-1">Fluffy golden fry jacks, authentic refried black beans, and handcrafted breakfast rolls.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-[#2D1B10] border border-[#3D2516] flex items-center justify-center text-[#C89D7C] shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Community Hub</h3>
            <p className="text-xs text-[#EFE3C3]/70 mt-1">A cozy tropical-modern atmosphere designed for connecting, creating, and unwinding.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
