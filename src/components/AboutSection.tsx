import React from 'react';
import { Award, HeartHandshake, Leaf, Flame, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Farm-to-Table Freshness',
      description: 'We partner with sustainable local growers to harvest heirloom vegetables, organic herbs, and grass-fed meats delivered fresh every morning.',
    },
    {
      icon: Flame,
      title: 'Master Artisanal Fire',
      description: 'Our open-flame hardwood grill and volcanic stone oven reach 850°F, infusing authentic smoky char and tender juiciness into every dish.',
    },
    {
      icon: Award,
      title: 'Uncompromising Culinary Craft',
      description: 'Every sauce, slow-braised ragù, sourdough crust, and dessert is prepared from scratch by seasoned executive chefs with global experience.',
    },
    {
      icon: HeartHandshake,
      title: 'Warm & Memorable Hospitality',
      description: 'Whether you dine in our ambient candlelit hall or enjoy rapid delivery at home, your culinary satisfaction is our unwavering commitment.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#16171b] border-y border-[#262830] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#f76707]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The FLAVORA Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
            Where Passion Meets Culinary Excellence
          </h2>
          <p className="text-sm sm:text-base text-[#ede7dd]/70 leading-relaxed font-normal">
            FLAVORA was founded on a simple yet uncompromising standard: delicious food should evoke wonder, 
            energize the soul, and bring people together across an unforgettable dining experience.
          </p>
        </div>

        {/* 2-Column Split: Story & Interior Ambience Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Narrative Content (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 bg-[#1a1b1f] p-8 sm:p-10 rounded-2xl border border-[#2b2d35]">
            <span className="text-xs font-semibold text-[#f76707] uppercase tracking-widest">
              Our Journey & Sourcing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7f4ed] leading-snug">
              Every Ingredient Has a Story, Every Dish Has a Soul.
            </h3>
            <p className="text-sm text-[#ede7dd]/80 leading-relaxed">
              From our custom-blended prime Angus cuts seared at blistering heat, to our 72-hour cold-fermented
              sourdough dough imported from Naples tradition, we refuse to take shortcuts. We believe that true luxury
              in dining is the purity of taste.
            </p>
            <p className="text-sm text-[#ede7dd]/80 leading-relaxed">
              When you step inside FLAVORA, the rich aroma of hardwood smoke, simmering San Marzano tomatoes,
              and aromatic white truffles welcomes you into an intimate sanctuary crafted for celebration.
            </p>

            {/* Chef signature quote */}
            <div className="pt-4 border-t border-[#2b2d35] flex items-center justify-between">
              <div>
                <div className="font-serif font-bold text-[#f7f4ed] text-base">Chef Julian Moreau</div>
                <div className="text-xs text-[#ede7dd]/60">Executive Culinary Director & Co-Founder</div>
              </div>
              <div className="font-serif italic text-[#f76707] text-lg">FLAVORA</div>
            </div>
          </div>

          {/* Ambience Photography (6 cols) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#2b2d35] min-h-[360px] lg:min-h-full">
            <img
              src="/src/assets/images/flavora_dining_ambience_1793366465847.jpg"
              alt="FLAVORA Luxury Restaurant Dining Room Ambience"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs text-[#f76707] uppercase font-semibold tracking-wider">
                Intimate Atmosphere
              </span>
              <p className="font-serif text-lg font-bold text-[#f7f4ed]">
                Designed for celebrations, cozy gatherings, and culinary explorers.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#1a1b1f] border border-[#2b2d35] hover:border-[#f76707]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#22242a] flex items-center justify-center text-[#f76707] mb-4 group-hover:bg-[#f76707] group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#f7f4ed] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#ede7dd]/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
