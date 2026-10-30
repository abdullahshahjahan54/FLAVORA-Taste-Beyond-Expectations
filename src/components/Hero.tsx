import React from 'react';
import { ArrowRight, Sparkles, Clock, Star, Flame, Utensils } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useRestaurant();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Subtle warm ambient backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#f76707]/12 via-[#ff922b]/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-12 right-12 w-96 h-96 bg-[#f76707]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Unboxed Brand Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
              <Flame className="w-4 h-4 text-[#f76707]" />
              <span>Taste Beyond Expectations</span>
              <span className="text-[#ede7dd]/40">·</span>
              <span className="text-[#ede7dd]/70">Modern Gourmet Dining</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#f7f4ed] leading-[1.08] text-balance">
              Good Food.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] via-[#f76707] to-[#e8590c]">
                Great Mood.
              </span>{' '}
              Unforgettable Taste.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#ede7dd]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience artisanal wood-fired pizzas, prime dry-aged smash burgers, smoked BBQ cuts,
              and handcrafted pasta. Fresh organic ingredients elevated by master culinary craftsmanship.
            </p>

            {/* Two Primary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] rounded-xl shadow-lg shadow-[#f76707]/25 hover:shadow-xl hover:shadow-[#f76707]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                  setIsCartOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#f7f4ed] bg-[#1e2026] hover:bg-[#282a32] border border-[#2e313b] hover:border-[#f76707]/50 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm"
              >
                <Utensils className="w-4 h-4 text-[#f76707]" />
                <span>Order Now</span>
              </button>
            </div>

            {/* Highlights Metadata Strip */}
            <div className="pt-6 border-t border-[#262830] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#f7f4ed]">
                  <Star className="w-4 h-4 text-[#f76707] fill-[#f76707]" />
                  <span className="tabular-nums">4.9 / 5.0</span>
                </div>
                <div className="text-xs text-[#ede7dd]/60 mt-0.5">Over 2,400+ Diners</div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#f7f4ed]">
                  <Clock className="w-4 h-4 text-[#f76707]" />
                  <span className="tabular-nums">30 Mins</span>
                </div>
                <div className="text-xs text-[#ede7dd]/60 mt-0.5">Average Delivery</div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#f7f4ed]">
                  <Sparkles className="w-4 h-4 text-[#f76707]" />
                  <span>100% Fresh</span>
                </div>
                <div className="text-xs text-[#ede7dd]/60 mt-0.5">Farm Direct Daily</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Food Photography Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#f76707]/40 via-amber-600/20 to-transparent rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-700" />

              {/* Main Food Photo Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2e313b] bg-[#16171b] shadow-2xl">
                <img
                  src="/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg"
                  alt="FLAVORA Gourmet Table Spread featuring signature smash burger and wood-fired pizza"
                  className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Measured Scrim for rich contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/20" />

                {/* Floating Dish Spotlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#16171b]/90 backdrop-blur-md border border-[#2e313b]/80 rounded-xl flex items-center justify-between gap-3 shadow-xl">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f76707]">
                      Chef's Signature Selection
                    </span>
                    <h2 className="text-sm font-bold text-[#f7f4ed] font-serif">
                      Prime Wagyu Smash & Truffle Fries
                    </h2>
                    <p className="text-xs text-[#ede7dd]/60">Freshly ground daily · Double sharp cheddar</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-[#f7f4ed] font-mono tabular-nums">
                      $19.50
                    </span>
                    <a
                      href="#menu"
                      className="block text-[11px] font-medium text-[#f76707] hover:underline"
                    >
                      View in Menu →
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
