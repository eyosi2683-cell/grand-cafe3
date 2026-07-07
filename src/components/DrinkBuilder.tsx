import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Flame, RotateCcw, Plus, Check, ThermometerSnowflake, Sparkles } from 'lucide-react';
import { CustomDrink, MenuItem } from '../types';

interface DrinkBuilderProps {
  onAddCustomDrink: (customDrink: CustomDrink, finalPrice: number, formattedDescription: string) => void;
}

export default function DrinkBuilder({ onAddCustomDrink }: DrinkBuilderProps) {
  // Setup local builder state
  const [drink, setDrink] = useState<CustomDrink>({
    size: 'medium',
    milk: 'whole',
    espressoShots: 2,
    flavor: 'none',
    temperature: 'hot',
    sweetness: 'regular',
  });

  const [isAdded, setIsAdded] = useState(false);

  // Constants for pricing (in BZ$)
  const BASE_PRICE = 6.00;

  const PRICE_ADDONS = useMemo(() => ({
    size: {
      small: 0.00,
      medium: 1.50,
      large: 3.00,
    },
    milk: {
      none: 0.00,
      whole: 0.00,
      soy: 1.00,
      almond: 1.50,
      oat: 1.50,
    },
    shots: (count: number) => {
      if (count <= 1) return 0.00;
      return (count - 1) * 1.50; // $1.50 per extra shot
    },
    flavor: {
      none: 0.00,
      vanilla: 1.00,
      caramel: 1.00,
      hazelnut: 1.00,
      pumpkin: 1.25,
    }
  }), []);

  // Calculate dynamic price
  const totalPrice = useMemo(() => {
    let price = BASE_PRICE;
    price += PRICE_ADDONS.size[drink.size];
    price += PRICE_ADDONS.milk[drink.milk];
    price += PRICE_ADDONS.shots(drink.espressoShots);
    price += PRICE_ADDONS.flavor[drink.flavor];
    return price;
  }, [drink, PRICE_ADDONS]);

  const usdPrice = (totalPrice / 2).toFixed(2);

  // Formatted string for cart item
  const formattedCustomDescription = useMemo(() => {
    const sizeStr = drink.size.charAt(0).toUpperCase() + drink.size.slice(1);
    const tempStr = drink.temperature.charAt(0).toUpperCase() + drink.temperature.slice(1);
    const milkStr = drink.milk === 'none' ? 'No Milk' : `${drink.milk.charAt(0).toUpperCase() + drink.milk.slice(1)} Milk`;
    const shotsStr = `${drink.espressoShots} Espresso Shot${drink.espressoShots > 1 ? 's' : ''}`;
    const syrupStr = drink.flavor === 'none' ? 'No Syrup' : `${drink.flavor.charAt(0).toUpperCase() + drink.flavor.slice(1)} Syrup`;
    const sweetStr = `${drink.sweetness.charAt(0).toUpperCase() + drink.sweetness.slice(1)} Sweetness`;

    return `${sizeStr} ${tempStr} Latte with ${shotsStr}, ${milkStr}, ${syrupStr}, ${sweetStr}`;
  }, [drink]);

  const handleReset = () => {
    setDrink({
      size: 'medium',
      milk: 'whole',
      espressoShots: 2,
      flavor: 'none',
      temperature: 'hot',
      sweetness: 'regular',
    });
  };

  const handleAddClick = () => {
    onAddCustomDrink(drink, totalPrice, formattedCustomDescription);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Determine layers heights and colors for visualization
  const visualizationLayers = useMemo(() => {
    // total cup representation is 100% height
    // base espresso is always present (e.g. 20% to 35% depending on shots)
    const espressoHeight = Math.min(15 + drink.espressoShots * 8, 45);
    
    // milk alternative height
    const milkHeight = drink.milk === 'none' ? 0 : (90 - espressoHeight - (drink.flavor !== 'none' ? 8 : 0));
    
    // syrup height
    const syrupHeight = drink.flavor === 'none' ? 0 : 8;

    // foam height remains constant at top (e.g. 10%)
    const foamHeight = drink.milk === 'none' ? 0 : 10;

    return {
      espresso: espressoHeight,
      milk: milkHeight,
      syrup: syrupHeight,
      foam: foamHeight,
    };
  }, [drink]);

  return (
    <section id="builder" className="py-20 bg-[#1E110A] text-white px-4 md:px-8 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C89D7C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={13} /> Custom Crafting Station
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight mt-2 mb-4 text-white">
            Build Your Perfect Brew
          </h2>
          <div className="h-1 w-20 bg-[#C89D7C] mx-auto rounded-full mb-4" />
          <p className="text-sm text-[#EFE3C3]/80 leading-relaxed">
            Tailor every parameter of your espresso or iced drink. Watch our responsive coffee simulator update in real-time as you tweak size, shots, syrups, and milk substitutes.
          </p>
        </div>

        {/* Main Grid: Visualizer vs Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Cup Rendering Section (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#25150D] p-8 rounded-2xl border border-[#3D2516] relative h-[450px]">
            
            {/* Ice floaters animation or Steam rising */}
            <div className="h-12 w-full flex justify-center relative overflow-visible">
              {drink.temperature === 'hot' ? (
                <div className="flex gap-4 justify-center items-end h-full">
                  <span className="w-1.5 h-8 bg-white/20 rounded-full animate-[pulse_1.5s_infinite] blur-[1px]" />
                  <span className="w-1.5 h-12 bg-white/35 rounded-full animate-[pulse_1.2s_infinite_0.3s] blur-[1.5px]" />
                  <span className="w-1.5 h-9 bg-white/20 rounded-full animate-[pulse_1.7s_infinite_0.6s] blur-[1px]" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-full gap-2">
                  <div className="w-4 h-4 bg-white/40 border border-white/60 rotate-45 rounded-sm animate-bounce" />
                  <div className="w-3 h-3 bg-white/30 border border-white/50 -rotate-12 rounded-sm animate-pulse" />
                  <div className="w-4 h-4 bg-white/40 border border-white/60 rotate-12 rounded-sm animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Coffee Cup Container */}
            <div className="relative w-56 h-64 border-b-8 border-x-4 border-white/10 rounded-b-[45px] overflow-hidden flex flex-col justify-end shadow-2xl bg-black/10">
              
              {/* Overlay Glass Reflection Line */}
              <div className="absolute inset-y-0 left-6 w-4 bg-white/5 skew-x-6 z-20 pointer-events-none" />

              {/* Dynamic Coffee Liquids Layer Rendering */}
              <AnimatePresence>
                {/* 1. Foam Layer (Top) */}
                {visualizationLayers.foam > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${visualizationLayers.foam}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="bg-[#FBF4E4] border-b border-[#F5EAD2] flex items-center justify-center text-[10px] font-mono font-bold text-gray-500 z-10"
                    title="Foam / Microfoam"
                  >
                    <span>Fluffy Foam</span>
                  </motion.div>
                )}

                {/* 2. Milk / Water Layer (Middle) */}
                {visualizationLayers.milk > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${visualizationLayers.milk}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                    className={`flex items-center justify-center text-xs font-mono font-bold text-[#4E311F]/80 ${
                      drink.milk === 'none' ? 'bg-[#2A160C]' : 'bg-[#DCC09C]'
                    }`}
                  >
                    <span>{drink.milk === 'none' ? 'Espresso Base' : `${drink.milk.toUpperCase()} MILK`}</span>
                  </motion.div>
                )}

                {/* 3. Espresso Shot Layer (Bottom-middle) */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${visualizationLayers.espresso}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="bg-[#301B11] flex items-center justify-center text-xs font-mono font-bold text-[#EFE3C3]/80 border-t border-black/20"
                >
                  <span>ESPRESSO ({drink.espressoShots} SHOT)</span>
                </motion.div>

                {/* 4. Syrup Flavor Drizzle (Bottom) */}
                {visualizationLayers.syrup > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${visualizationLayers.syrup}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                    className={`flex items-center justify-center text-[9px] font-mono font-bold text-white uppercase ${
                      drink.flavor === 'caramel' ? 'bg-[#9C581E]' :
                      drink.flavor === 'vanilla' ? 'bg-[#F2DCA2]' :
                      drink.flavor === 'hazelnut' ? 'bg-[#5F3D1C]' : 'bg-[#D28C4B]'
                    }`}
                  >
                    <span>{drink.flavor} Syrup</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price tag floating below cup */}
            <div className="mt-8 text-center">
              <span className="block text-xs font-mono uppercase text-gray-400">Total Brew Cost</span>
              <span className="text-3xl font-sans font-black text-[#C89D7C] tracking-tight">
                BZ$ {totalPrice.toFixed(2)}
              </span>
              <span className="block text-xs font-mono text-[#EFE3C3]/65 mt-0.5">
                Approx. US$ {usdPrice}
              </span>
            </div>

          </div>

          {/* Controls Form Section (Col span 7) */}
          <div className="lg:col-span-7 bg-[#25150D]/60 p-6 md:p-8 rounded-2xl border border-[#3D2516] flex flex-col gap-6" id="builder-controls">
            
            {/* 1. Temp Selector */}
            <div className="text-left">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-2.5">Temperature</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDrink(prev => ({ ...prev, temperature: 'hot' }))}
                  className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 border transition-all ${
                    drink.temperature === 'hot'
                      ? 'bg-amber-600 border-amber-600 text-white shadow-lg'
                      : 'bg-[#2D1B10] border-[#3D2516] text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <Flame size={14} /> Hot Latte
                </button>
                <button
                  onClick={() => setDrink(prev => ({ ...prev, temperature: 'iced' }))}
                  className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 border transition-all ${
                    drink.temperature === 'iced'
                      ? 'bg-sky-600 border-sky-600 text-white shadow-lg'
                      : 'bg-[#2D1B10] border-[#3D2516] text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <ThermometerSnowflake size={14} /> Iced Over Ice
                </button>
              </div>
            </div>

            {/* 2. Cup Size Selector */}
            <div className="text-left">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-2.5">Cup Size</label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map((sz) => {
                  const sizeDetails = {
                    small: { label: 'Small', vol: '8 oz', addon: '+$0.00' },
                    medium: { label: 'Medium', vol: '12 oz', addon: '+$1.50 BZ' },
                    large: { label: 'Large', vol: '16 oz', addon: '+$3.00 BZ' },
                  }[sz];
                  
                  return (
                    <button
                      key={sz}
                      onClick={() => setDrink(prev => ({ ...prev, size: sz }))}
                      className={`p-3 rounded-xl cursor-pointer border flex flex-col items-center transition-all ${
                        drink.size === sz
                          ? 'bg-[#C89D7C] border-[#C89D7C] text-[#1E110A] font-bold shadow-md'
                          : 'bg-[#2D1B10] border-[#3D2516] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wide font-black">{sizeDetails.label}</span>
                      <span className="text-[10px] opacity-75 mt-0.5">{sizeDetails.vol}</span>
                      <span className="text-[9px] font-mono mt-1 block px-1.5 py-0.5 bg-black/10 rounded font-bold">{sizeDetails.addon}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Espresso Shots Count */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C]">Espresso Shots</label>
                <span className="text-xs text-gray-400 font-mono">+$1.50 BZ per extra shot</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((shotsCount) => (
                  <button
                    key={shotsCount}
                    onClick={() => setDrink(prev => ({ ...prev, espressoShots: shotsCount }))}
                    className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold cursor-pointer border transition-all ${
                      drink.espressoShots === shotsCount
                        ? 'bg-[#EFE3C3] border-[#EFE3C3] text-[#1E110A] shadow'
                        : 'bg-[#2D1B10] border-[#3D2516] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {shotsCount} Shot{shotsCount > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Milk Options */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C]">Milk Base</label>
                <span className="text-xs text-gray-400 font-mono">Nut milk options available</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {(['none', 'whole', 'soy', 'almond', 'oat'] as const).map((mk) => {
                  const milkLabel = mk === 'none' ? 'No Milk' : mk.charAt(0).toUpperCase() + mk.slice(1);
                  const milkCost = PRICE_ADDONS.milk[mk] === 0 ? 'Free' : `+$${PRICE_ADDONS.milk[mk].toFixed(2)}`;

                  return (
                    <button
                      key={mk}
                      onClick={() => setDrink(prev => ({ ...prev, milk: mk }))}
                      className={`py-2 rounded-xl text-[10px] font-bold uppercase cursor-pointer border flex flex-col items-center justify-center transition-all ${
                        drink.milk === mk
                          ? 'bg-[#C89D7C] border-[#C89D7C] text-[#1E110A]'
                          : 'bg-[#2D1B10] border-[#3D2516] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <span className="text-center leading-none mb-1">{milkLabel}</span>
                      <span className="text-[8px] opacity-75 font-mono bg-black/10 px-1 rounded">{milkCost}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Syrup & Flavor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-2">Flavored Syrup</label>
                <select
                  id="flavor-syrup-select"
                  value={drink.flavor}
                  onChange={(e) => setDrink(prev => ({ ...prev, flavor: e.target.value as any }))}
                  className="w-full px-3 py-3 bg-[#2D1B10] text-[#EFE3C3] rounded-xl border border-[#3D2516] text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#C89D7C]"
                >
                  <option value="none">No Syrup (Free)</option>
                  <option value="vanilla">Vanilla Syrup (+$1.00 BZ)</option>
                  <option value="caramel">Caramel Syrup (+$1.00 BZ)</option>
                  <option value="hazelnut">Hazelnut Syrup (+$1.00 BZ)</option>
                  <option value="pumpkin">Pumpkin Spice (+$1.25 BZ)</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-2">Sweetness Level</label>
                <select
                  id="sweetness-level-select"
                  value={drink.sweetness}
                  onChange={(e) => setDrink(prev => ({ ...prev, sweetness: e.target.value as any }))}
                  className="w-full px-3 py-3 bg-[#2D1B10] text-[#EFE3C3] rounded-xl border border-[#3D2516] text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#C89D7C]"
                >
                  <option value="none">Unsweetened (None)</option>
                  <option value="half">Half Sweet</option>
                  <option value="regular">Regular Sweet</option>
                  <option value="extra">Extra Sweet</option>
                </select>
              </div>
            </div>

            {/* Reset and Add Actions */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-[#3D2516]/60">
              <button
                id="btn-reset-builder"
                onClick={handleReset}
                className="p-3.5 rounded-xl border border-[#3D2516] text-gray-400 hover:text-white hover:bg-[#2D1B10] cursor-pointer transition-colors flex items-center justify-center"
                title="Reset customizations"
              >
                <RotateCcw size={16} />
              </button>

              <button
                id="btn-add-custom-drink"
                onClick={handleAddClick}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} strokeWidth={2.5} /> Added Custom Drink!
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add Custom Brew to Order
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
