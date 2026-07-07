import { motion } from 'motion/react';
import { Leaf, Award, Heart, ShieldAlert, BookOpen } from 'lucide-react';

export default function StorySection() {
  return (
    <section id="story" className="py-20 bg-[#FDFBF7] text-[#1E110A] px-4 md:px-8 relative overflow-hidden">
      {/* Small floating design accents */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-[#C89D7C]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stats & Accents */}
          <div className="lg:col-span-5 order-2 lg:order-1 grid grid-cols-2 gap-4">
            
            {/* Stat Card 1 */}
            <div className="bg-[#1E110A] text-[#EFE3C3] p-6 rounded-2xl border border-[#3D2516] flex flex-col items-start text-left shadow-lg">
              <span className="text-3xl font-sans font-black text-white">100%</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] mt-1.5">Belizean Beans</span>
              <p className="text-[11px] text-gray-400 mt-2 leading-normal">
                Sourced from family estate farms in Gallon Jug and the high peaks of Cayo.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-[#2D1B10]/5 p-6 rounded-2xl border border-gray-200 flex flex-col items-start text-left">
              <span className="text-3xl font-sans font-black text-[#2D1B10]">6K+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-1.5">Lattes Poured</span>
              <p className="text-[11px] text-gray-600 mt-2 leading-normal">
                Each cup is crafted with deliberate precision and balanced warmth.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-[#2D1B10]/5 p-6 rounded-2xl border border-gray-200 flex flex-col items-start text-left">
              <span className="text-3xl font-sans font-black text-[#2D1B10]">2018</span>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-1.5">Established</span>
              <p className="text-[11px] text-gray-600 mt-2 leading-normal">
                Serving the Cayo district as a community bridge for nearly a decade.
              </p>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-[#1E110A] text-[#EFE3C3] p-6 rounded-2xl border border-[#3D2516] flex flex-col items-start text-left shadow-lg">
              <span className="text-3xl font-sans font-black text-white">100 Mbps</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] mt-1.5">Fibre Wi-Fi</span>
              <p className="text-[11px] text-gray-400 mt-2 leading-normal">
                Perfect speed for traveling digital nomads and study groups.
              </p>
            </div>

          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] font-semibold flex items-center gap-1.5 mb-2">
              <BookOpen size={13} /> The Story of The Grind
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-[#1E110A] mb-6">
              Sourcing Soil, Spicing Community
            </h2>
            <div className="h-1 w-20 bg-[#C89D7C] rounded-full mb-8" />

            <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-sans">
              <p>
                In 2018, we saw a simple need in Santa Elena: a cozy, tropical-inspired sanctuary where locals could grab an exceptional hot brew, travelers could rest, and digital creators could find reliable power and connection. From that spark, <span className="font-bold text-gray-900">The Daily Grind Coffee Shop</span> was born.
              </p>
              
              <p>
                Our philosophy starts with the soil. We partner directly with small-scale coffee growers in Belize, notably the shade-grown Arabica estates of <span className="font-semibold text-gray-900">Gallon Jug</span>. This direct relationship guarantees that every bean is roasted in small batches to preserve its distinct chocolatey, nutty body, typical of Central American volcanic soil.
              </p>

              <p>
                But coffee is only half of our soul. The rest belongs to our kitchen. Every morning, our team heats the griddles to fry fresh, fluffy Belizean <span className="font-semibold text-[#C89D7C] underline">fry jacks</span>, preparing them alongside organic, slow-simmered black beans and farm-fresh eggs. We believe in food that honors Belizean roots while feeding contemporary mornings.
              </p>
            </div>

            {/* Quote block */}
            <div className="mt-8 p-5 rounded-2xl bg-[#EFE3C3]/30 border-l-4 border-[#C89D7C] text-left">
              <p className="text-xs italic text-gray-700 font-sans leading-relaxed">
                "We don't measure our success simply in daily transactions or espresso shots, but in the community we foster—in the stories shared over the counter and the lasting friendships made right on our wooden benches."
              </p>
              <span className="block text-[10px] font-mono uppercase text-gray-500 mt-3 font-bold">
                — Maria & Jose, Owners
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
