import React from 'react';
import { Tag, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const SpecialOffers: React.FC = () => {
  const { specialOffers, claimOfferDeal } = useRestaurant();

  const activeOffers = specialOffers.filter((o) => o.isActive);

  return (
    <section id="offers" className="py-20 lg:py-28 bg-[#16171b] border-t border-[#262830] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f76707]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            <Tag className="w-3.5 h-3.5" />
            <span>Curated Bundles & Exclusive Deals</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
            Special Combos & Family Feasts
          </h2>
          <p className="text-sm sm:text-base text-[#ede7dd]/70 font-normal">
            Treat your family or feast with friends with our chef-crafted gourmet packages at exceptional limited-time savings.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#1a1b1f] border border-[#2b2d35] hover:border-[#f76707]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Banner */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#1f2026]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b1f] via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-[#f76707] text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                      {offer.discountTag}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-[#ede7dd] border border-white/10 text-xs font-medium px-2.5 py-1 rounded-md">
                      {offer.badge}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-[#f76707] font-semibold uppercase tracking-wider">
                      {offer.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#f7f4ed] leading-snug">
                      {offer.title}
                    </h3>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-[#ede7dd]/80 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#262830]">
                    <span className="text-[11px] font-semibold text-[#f76707] uppercase tracking-wider block">
                      What's Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {offer.includedItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#ede7dd]/90">
                          <Check className="w-3.5 h-3.5 text-[#f76707] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer Pricing & Claim CTA */}
              <div className="px-6 pb-6 pt-3 border-t border-[#262830] flex items-center justify-between gap-4 bg-[#1e2026]/40">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#f7f4ed] font-mono tabular-nums">
                      ${offer.price.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-[#ede7dd]/40 font-mono tabular-nums">
                      ${offer.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Instant savings applied at checkout
                  </span>
                </div>

                <button
                  onClick={() => claimOfferDeal(offer)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-[#f76707]/25 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Combo</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Promo code callout banner */}
        <div className="mt-12 bg-gradient-to-r from-[#22242a] via-[#1a1b1f] to-[#22242a] border border-[#2e313b] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f76707]">
              <Sparkles className="w-4 h-4" />
              <span>FIRST ORDER WELCOME PROMO</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f4ed]">
              Get 10% Off Your Entire Online Bill
            </h4>
            <p className="text-xs text-[#ede7dd]/70">
              Apply coupon code in the cart drawer. Free express delivery on orders over $50.
            </p>
          </div>

          <div className="bg-[#121316] border border-[#f76707]/40 px-5 py-3 rounded-xl text-center shrink-0">
            <span className="text-[10px] text-[#ede7dd]/50 uppercase tracking-widest block">
              Promo Code
            </span>
            <span className="font-mono text-lg font-bold text-[#f76707] tracking-wider select-all">
              FLAVORA10
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
