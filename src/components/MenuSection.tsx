import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Check, Coffee, Croissant, Egg, Flame } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';
import { INITIAL_MENU_ITEMS } from '../data';

interface MenuSectionProps {
  onAddToDraft: (item: MenuItem) => void;
  latteArtImg: string;
  wafflesImg: string;
}

type CategoryTab = 'all' | 'coffee' | 'iced' | 'breakfast' | 'pastry';

export default function MenuSection({ onAddToDraft, latteArtImg, wafflesImg }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleAddToDraft = (item: MenuItem) => {
    onAddToDraft(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const tabs: { id: CategoryTab; label: string; icon: any }[] = [
    { id: 'all', label: 'Full Menu', icon: Coffee },
    { id: 'coffee', label: 'Hot Specialty', icon: Coffee },
    { id: 'iced', label: 'Iced & Cold', icon: Flame },
    { id: 'breakfast', label: 'Local Breakfast', icon: Egg },
    { id: 'pastry', label: 'Fresh Pastries', icon: Croissant },
  ];

  // Map generated images or fallbacks
  const getMenuItemImage = (id: string, category: string) => {
    if (id === 'c1' || id === 'c2') return latteArtImg;
    if (id === 'b2') return wafflesImg;
    
    // Nice premium curated photos from picsum/unsplash that fit the aesthetic perfectly
    if (category === 'coffee') {
      return `https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600`;
    } else if (category === 'iced') {
      return `https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600`;
    } else if (category === 'breakfast') {
      if (id === 'b1') { // Fry Jacks
        return `https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600`;
      }
      return `https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600`;
    } else { // pastry
      return `https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600`;
    }
  };

  const filteredItems = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 bg-[#FDFBF7] text-[#1E110A] px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] font-semibold">Handcrafted Flavors</span>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-[#1E110A] tracking-tight mt-2 mb-4">
            Curated For Everyday Rituals
          </h2>
          <div className="h-1 w-20 bg-[#C89D7C] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-600">
            Enjoy our dual currency system! All prices are listed in <span className="font-bold text-[#1E110A]">Belize Dollars (BZ$)</span>. <br className="hidden sm:inline" />
            Exchange rate is anchored at <span className="text-gray-900 font-semibold">2 BZ$ = 1 USD</span>. We gladly accept cash and local transfers.
          </p>
        </div>

        {/* Search and Filter Container */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-gray-200">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start" id="menu-category-tabs">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`menu-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#1E110A] text-[#EFE3C3] shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#1E110A]'
                  }`}
                >
                  <TabIcon size={14} className={isSelected ? 'text-[#C89D7C]' : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80" id="menu-search-wrapper">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search coffee or snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all text-gray-800 shadow-sm"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          id="menu-items-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const itemImg = getMenuItemImage(item.id, item.category);
              const bzPrice = item.price;
              const usdPrice = (item.price / 2).toFixed(2);
              const isAdded = addedItemIds[item.id];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between group transition-all"
                >
                  {/* Image & Price Tag */}
                  <div className="relative overflow-hidden h-52 shrink-0">
                    <img
                      src={itemImg}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#1E110A]/90 backdrop-blur-sm text-[#EFE3C3] px-3 py-1.5 rounded-xl font-mono text-xs font-bold border border-[#3D2516] shadow flex flex-col items-end">
                      <span className="text-white">BZ$ {bzPrice.toFixed(2)}</span>
                      <span className="text-[10px] text-[#C89D7C]">US$ {usdPrice}</span>
                    </div>

                    {/* Category pill */}
                    <div className="absolute bottom-3 left-3 bg-[#C89D7C] text-[#1E110A] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.category === 'local' ? 'Belizean Special' : item.category}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex flex-col justify-between flex-grow text-left">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags?.map((tag) => (
                          <span key={tag} className="bg-amber-50 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C89D7C] transition-colors leading-tight mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Add Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400">Order Code: #{item.id}</span>
                      <button
                        id={`btn-add-menu-${item.id}`}
                        onClick={() => handleAddToDraft(item)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#2D1B10] hover:bg-[#1E110A] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} strokeWidth={2.5} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            Add to Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400 font-sans">
              <p className="text-lg font-medium">No coffee or dishes found matching that search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="mt-4 text-[#C89D7C] font-semibold underline text-sm hover:text-[#B78C6A]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Order Info Banner */}
        <div className="mt-16 bg-[#2D1B10] rounded-2xl p-6 md:p-8 border border-[#3D2516] flex flex-col md:flex-row items-center justify-between text-left gap-6">
          <div className="max-w-xl">
            <h4 className="text-lg font-bold text-white mb-2">Want something totally tailored?</h4>
            <p className="text-xs text-[#EFE3C3]/80 leading-relaxed">
              Use our interactive **Custom Drink Builder** below to specify exact espresso counts, milk types, syrup flavors, and temperatures. Add your custom concoction right into your draft bag!
            </p>
          </div>
          <button
            id="menu-goto-builder-btn"
            onClick={() => {
              const el = document.getElementById('builder');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shrink-0"
          >
            Go to Drink Builder
          </button>
        </div>

      </div>
    </section>
  );
}
