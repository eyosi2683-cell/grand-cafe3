import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, ShoppingBag, Menu, X, Clock, HelpCircle } from 'lucide-react';
import { OrderItem } from '../types';

interface HeaderProps {
  cart: OrderItem[];
  onOpenCart: () => void;
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ cart, onOpenCart, onScrollTo, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'builder', label: 'Drink Builder' },
    { id: 'story', label: 'Our Story' },
    { id: 'community', label: 'Community' },
    { id: 'location', label: 'Location & Hours' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <>
      {/* Top micro-banner */}
      <div className="bg-[#2D1B10] text-[#EFE3C3] text-xs py-1.5 px-4 flex justify-between items-center font-mono select-none z-50 relative">
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-[#C89D7C]" />
          <span>Open Today: 6:30 AM – 6:00 PM</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>George Price Highway, Santa Elena, Belize</span>
          <span className="text-[#C89D7C]">•</span>
          <span>+501 612-3610</span>
        </div>
        <div className="flex items-center gap-1 hover:text-white cursor-pointer" onClick={() => handleLinkClick('location')}>
          <span className="underline">Order Ahead Available</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        id="main-nav-bar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1E110A]/95 backdrop-blur-md shadow-lg border-b border-[#3D2516]/50 py-3'
            : 'bg-[#1E110A] md:bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#C89D7C] flex items-center justify-center text-[#1E110A] group-hover:scale-105 transition-transform">
              <Coffee size={22} strokeWidth={2.5} />
            </div>
            <div>
              <span className="block font-sans font-bold text-lg md:text-xl text-white tracking-tight leading-none">
                The Daily Grind
              </span>
              <span className="block text-[10px] font-mono text-[#C89D7C] uppercase tracking-widest mt-0.5">
                Coffee Shop • Belize
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer relative py-2 ${
                  activeSection === link.id
                    ? 'text-[#C89D7C]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C89D7C] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions (Bag & Mobile toggle) */}
          <div className="flex items-center gap-4">
            <button
              id="header-bag-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#2D1B10] hover:bg-[#3D2516] border border-[#3D2516] text-[#EFE3C3] hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              aria-label="View Order Draft"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    id="bag-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#C89D7C] text-[#1E110A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#2D1B10] hover:bg-[#3D2516] border border-[#3D2516] text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#1E110A] border-b border-[#3D2516] overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-2 px-3 rounded-lg text-base font-semibold tracking-wide transition-colors ${
                      activeSection === link.id
                        ? 'bg-[#2D1B10] text-[#C89D7C]'
                        : 'text-gray-300 hover:bg-[#2D1B10]/50 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t border-[#3D2516] pt-4 mt-2 text-xs font-mono text-[#C89D7C]/75 flex flex-col gap-2">
                  <span>📍 George Price Highway, Santa Elena, Cayo</span>
                  <span>📞 +501 612-3610</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
