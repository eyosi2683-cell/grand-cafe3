/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Coffee, Heart, Landmark, RefreshCw, Star, Info, Share2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, OrderItem, CustomDrink } from './types';

// Import our modular parts
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import DrinkBuilder from './components/DrinkBuilder';
import StorySection from './components/StorySection';
import CommunitySection from './components/CommunitySection';
import LocationHours from './components/LocationHours';
import OrderAheadModal from './components/OrderAheadModal';

// Import our generated image assets so Vite bundles them correctly for production
import HERO_BANNER_IMG from './assets/images/cafe_hero_banner_1783342086627.jpg';
import LATTE_ART_IMG from './assets/images/cafe_latte_art_1783342099334.jpg';
import WAFFLES_IMG from './assets/images/cafe_breakfast_waffles_1783342113732.jpg';

export default function App() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load cart from local storage if available
  useEffect(() => {
    const storedCart = localStorage.getItem('daily_grind_cart_draft');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveCart = (newCart: OrderItem[]) => {
    setCart(newCart);
    localStorage.setItem('daily_grind_cart_draft', JSON.stringify(newCart));
  };

  // Add normal menu item to the order draft
  const handleAddToDraft = (item: MenuItem) => {
    const existingIndex = cart.findIndex((i) => i.id === item.id && !i.customization);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: OrderItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      saveCart([...cart, newItem]);
    }
  };

  // Add custom crafted beverage to the order draft
  const handleAddCustomDrink = (customDrink: CustomDrink, finalPrice: number, formattedDescription: string) => {
    const customId = `custom-latte-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const newItem: OrderItem = {
      id: customId,
      name: 'Custom Handcrafted Brew',
      price: finalPrice,
      quantity: 1,
      customization: formattedDescription,
    };
    saveCart([...cart, newItem]);
  };

  // Update quantity controls
  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  // Remove single item completely
  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Clear cart on successful order
  const handleClearCart = () => {
    saveCart([]);
  };

  // Smooth scroll handler
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 85; // navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Setup dynamic scroll observer to highlight current section in navigation bar
  useEffect(() => {
    const sections = ['home', 'menu', 'builder', 'story', 'community', 'location'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // trigger early offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E110A] flex flex-col font-sans antialiased selection:bg-[#C89D7C]/30 selection:text-[#1E110A]">
      
      {/* 1. Header Bar */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={handleScrollTo}
        activeSection={activeSection}
      />

      {/* 2. Main Page Content Sections */}
      <main className="flex-grow">
        
        {/* Home / Hero Banner */}
        <Hero onScrollTo={handleScrollTo} heroImage={HERO_BANNER_IMG} />

        {/* Dynamic filterable Menu */}
        <MenuSection
          onAddToDraft={handleAddToDraft}
          latteArtImg={LATTE_ART_IMG}
          wafflesImg={WAFFLES_IMG}
        />

        {/* Interactive custom Drink Simulator */}
        <DrinkBuilder onAddCustomDrink={handleAddCustomDrink} />

        {/* Our Story & sourcing notes */}
        <StorySection />

        {/* Customer reviews & social wall */}
        <CommunitySection />

        {/* Operations schedule & physical map */}
        <LocationHours />

      </main>

      {/* 3. Interactive Sidebar Order Ahead Drawer */}
      <OrderAheadModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 4. Elegant High-Contrast Professional Footer */}
      <footer className="bg-[#1E110A] text-white pt-16 pb-8 px-4 md:px-8 border-t border-[#3D2516]/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left mb-12">
          
          {/* Col 1: Branding & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C89D7C] flex items-center justify-center text-[#1E110A]">
                <Coffee size={16} strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-lg text-white tracking-tight">The Daily Grind</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              We roast, grind, and pour with precision. Connecting Santa Elena and San Ignacio with outstanding coffee, farm-fresh breakfast, and warm community bench seats since 2018.
            </p>
            <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5 pt-2">
              <Landmark size={12} className="text-[#C89D7C]" />
              <span>Cayo District Proud • Belize</span>
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#C89D7C] mb-4 font-bold">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => handleScrollTo('home')} className="hover:text-[#C89D7C] transition-colors cursor-pointer">
                  Welcome Stage
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('menu')} className="hover:text-[#C89D7C] transition-colors cursor-pointer">
                  Gourmet & Belizean Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('builder')} className="hover:text-[#C89D7C] transition-colors cursor-pointer">
                  Beverage Simulator
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('story')} className="hover:text-[#C89D7C] transition-colors cursor-pointer">
                  Bean Sourcing & Story
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('community')} className="hover:text-[#C89D7C] transition-colors cursor-pointer">
                  Community Wall
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sourcing standards */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#C89D7C] mb-4 font-bold">Our Philosophy</h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              <p className="leading-relaxed">
                All espresso coffee is 100% shade-grown Arabica beans purchased directly from family growers in Belize's beautiful Gallon Jug forests.
              </p>
              <div className="flex items-center gap-1 text-[#C89D7C] text-[10px] font-mono font-bold">
                <Compass size={11} />
                <span>Ethically Traced • Small Batches</span>
              </div>
            </div>
          </div>

          {/* Col 4: Reach Out & Social links */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#C89D7C] mb-4 font-bold">Let's Connect</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Stop by on the George Price Highway, or give us a buzz for WhatsApp Orders.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-gray-300">
              <span className="block">📞 +501 612-3610</span>
              <span className="block">✉️ orders@thedailygrindbelize.com</span>
            </div>
            {/* Social handles mockup */}
            <div className="flex gap-3.5 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-[#2D1B10] hover:bg-[#3D2516] rounded-lg text-gray-400 hover:text-white transition-colors" title="Facebook">
                <span className="text-xs font-bold font-mono">FB</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-[#2D1B10] hover:bg-[#3D2516] rounded-lg text-gray-400 hover:text-white transition-colors" title="Instagram">
                <span className="text-xs font-bold font-mono">IG</span>
              </a>
              <a href={mapLink} target="_blank" rel="noreferrer" className="p-2 bg-[#2D1B10] hover:bg-[#3D2516] rounded-lg text-gray-400 hover:text-white transition-colors" title="Google Maps reviews">
                <span className="text-xs font-bold font-mono">MAP</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto border-t border-[#3D2516]/50 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} The Daily Grind Coffee Shop. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-3 sm:mt-0">
            Made with <Heart size={11} className="text-red-500 fill-red-500" /> in Santa Elena, Cayo District, Belize
          </p>
        </div>
      </footer>

    </div>
  );
}

const mapLink = "https://www.google.com/maps/place/The+Daily+Grind+Coffee+Shop/@17.1602256,-89.0712181,17z/data=!3m1!4b1!4m6!3m5!1s0x8f5e670018f8cb99:0xfb85d0c9340f47ba!8m2!3d17.1602256!4d-89.0712181!16s%2Fg%2F11y5g0l554";

