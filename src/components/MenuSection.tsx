import React, { useState, useMemo } from 'react';
import { Search, Plus, Flame, Sparkles, Leaf, Clock, X } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, FoodCategory } from '../types';

export const MenuSection: React.FC = () => {
  const { categories, menuItems, addToCart, setSelectedMenuItem } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSpecialsOnly, setFilterSpecialsOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }
      // Specials filter
      if (filterSpecialsOnly && !item.isChefSpecial) return false;
      // Veg filter
      if (filterVegOnly && !item.isVegetarian) return false;
      // Spicy filter
      if (filterSpicyOnly && !item.isSpicy) return false;

      return true;
    });
  }, [menuItems, activeCategory, searchQuery, filterSpecialsOnly, filterVegOnly, filterSpicyOnly]);

  const allCategoryTabs = ['All', ...categories];

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#121316] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Gastronomy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
            Explore Our Curated Menu
          </h2>
          <p className="text-sm sm:text-base text-[#ede7dd]/70 font-normal">
            Every dish is handcrafted using prime ingredients, slow-aged doughs, and authentic seasoning.
            Select a category or search for your favorites.
          </p>
        </div>

        {/* Category Selector (Horizontal Scrolling Buttons) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {allCategoryTabs.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f76707] to-[#e8590c] text-white shadow-md shadow-[#f76707]/30 scale-[1.02]'
                      : 'bg-[#1a1b1f] text-[#ede7dd]/70 hover:text-[#f7f4ed] hover:bg-[#22242a] border border-[#2b2d35]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar & Dietary Quick Toggles */}
        <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#ede7dd]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, burgers, pizza, pasta, truffles..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] placeholder-[#ede7dd]/40 focus:outline-none focus:border-[#f76707] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ede7dd]/40 hover:text-[#f7f4ed]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setFilterSpecialsOnly(!filterSpecialsOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                filterSpecialsOnly
                  ? 'bg-[#f76707]/20 border-[#f76707] text-[#f76707]'
                  : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:text-[#ede7dd]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Specials</span>
            </button>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                filterVegOnly
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:text-[#ede7dd]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                filterSpicyOnly
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:text-[#ede7dd]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy</span>
            </button>

            {(filterSpecialsOnly || filterVegOnly || filterSpicyOnly || searchQuery) && (
              <button
                onClick={() => {
                  setFilterSpecialsOnly(false);
                  setFilterVegOnly(false);
                  setFilterSpicyOnly(false);
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs text-[#ede7dd]/50 hover:text-[#f76707] underline px-2 py-1"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#16171b] rounded-2xl border border-[#2b2d35] p-8">
            <p className="font-serif text-xl text-[#f7f4ed] mb-2">No food items found</p>
            <p className="text-xs text-[#ede7dd]/60 mb-6">
              Try adjusting your search criteria or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setFilterSpecialsOnly(false);
                setFilterVegOnly(false);
                setFilterSpicyOnly(false);
              }}
              className="px-4 py-2 bg-[#f76707] text-white text-xs font-semibold rounded-lg"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedMenuItem(item)}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  addToCart(item, 1);
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

interface MenuCardProps {
  item: MenuItem;
  onSelect: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect, onAddToCart }) => {
  return (
    <div
      onClick={onSelect}
      className="group bg-[#16171b] hover:bg-[#1a1b1f] border border-[#2b2d35] hover:border-[#f76707]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
    >
      <div>
        {/* Food Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1f2026]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful fallback to styled neutral image if needed
              const target = e.currentTarget;
              target.onerror = null;
              target.src = '/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg';
            }}
          />

          {/* Measured overlay scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16171b] via-transparent to-transparent opacity-60" />

          {/* Badges strip (Clean unboxed tags) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.isChefSpecial && (
              <span className="text-[11px] font-semibold bg-[#f76707] text-white px-2.5 py-0.5 rounded shadow-sm">
                Chef's Special
              </span>
            )}
            {item.isPopular && !item.isChefSpecial && (
              <span className="text-[11px] font-semibold bg-[#2b2d35]/90 text-[#ff922b] px-2 py-0.5 rounded border border-[#ff922b]/30">
                Popular
              </span>
            )}
            {item.isSpicy && (
              <span className="text-[11px] font-semibold bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                🌶 Spicy
              </span>
            )}
            {item.isVegetarian && (
              <span className="text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                🌱 Veg
              </span>
            )}
          </div>

          {/* Preparation Time Pill */}
          {item.preparationTime && (
            <div className="absolute bottom-3 right-3 text-[11px] font-medium text-[#ede7dd] bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
              <Clock className="w-3 h-3 text-[#f76707]" />
              <span>{item.preparationTime}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Unboxed Metadata */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#f76707] mb-1">
            {item.category}
          </div>

          <h3 className="font-serif text-lg font-bold text-[#f7f4ed] group-hover:text-[#f76707] transition-colors line-clamp-1 mb-2">
            {item.name}
          </h3>

          <p className="text-xs text-[#ede7dd]/70 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Add to Cart Action */}
      <div className="px-5 pb-5 pt-2 border-t border-[#262830] flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-[#ede7dd]/50 block">Price</span>
          <span className="text-xl font-bold text-[#f7f4ed] font-mono tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onAddToCart}
          className="px-4 py-2.5 rounded-xl bg-[#22242a] hover:bg-[#f76707] text-[#f7f4ed] hover:text-white border border-[#2e313b] hover:border-[#f76707] transition-all flex items-center gap-2 text-xs font-semibold shadow-sm active:scale-95 group/btn"
          title={`Add ${item.name} to cart`}
        >
          <Plus className="w-4 h-4 text-[#f76707] group-hover/btn:text-white transition-colors" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
