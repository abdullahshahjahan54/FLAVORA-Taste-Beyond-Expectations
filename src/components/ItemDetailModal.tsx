import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Leaf, Clock, ShoppingBag } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ItemDetailModal: React.FC = () => {
  const { selectedMenuItem, setSelectedMenuItem, addToCart } = useRestaurant();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!selectedMenuItem) return null;

  const handleAddToCart = () => {
    addToCart(selectedMenuItem, quantity, specialInstructions.trim() || undefined);
    setSelectedMenuItem(null);
    setQuantity(1);
    setSpecialInstructions('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-xl my-8 relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedMenuItem(null);
            setQuantity(1);
            setSpecialInstructions('');
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Food Photography */}
        <div className="relative h-64 sm:h-72 w-full bg-[#1f2026] overflow-hidden">
          <img
            src={selectedMenuItem.image}
            alt={selectedMenuItem.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16171b] via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="text-xs font-semibold text-white bg-[#f76707] px-3 py-1 rounded-md shadow">
              {selectedMenuItem.category}
            </span>
            {selectedMenuItem.isChefSpecial && (
              <span className="text-xs font-semibold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                Chef's Signature
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7f4ed]">
                {selectedMenuItem.name}
              </h3>
              <span className="font-mono text-2xl font-bold text-[#f76707] tabular-nums shrink-0">
                ${selectedMenuItem.price.toFixed(2)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#ede7dd]/80 mt-3 leading-relaxed">
              {selectedMenuItem.description}
            </p>
          </div>

          {/* Quick Dietary and Preparation Info */}
          <div className="flex flex-wrap gap-3 py-3 border-y border-[#262830] text-xs">
            {selectedMenuItem.preparationTime && (
              <div className="flex items-center gap-1.5 text-[#ede7dd]/70 bg-[#1a1b1f] px-3 py-1.5 rounded-lg border border-[#2b2d35]">
                <Clock className="w-3.5 h-3.5 text-[#f76707]" />
                <span>Prep: {selectedMenuItem.preparationTime}</span>
              </div>
            )}
            {selectedMenuItem.calories && (
              <div className="flex items-center gap-1.5 text-[#ede7dd]/70 bg-[#1a1b1f] px-3 py-1.5 rounded-lg border border-[#2b2d35]">
                <span className="text-[#f76707] font-bold">Cal:</span>
                <span>{selectedMenuItem.calories} kcal</span>
              </div>
            )}
            {selectedMenuItem.isSpicy && (
              <div className="flex items-center gap-1.5 text-red-400 bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-500/20">
                <Flame className="w-3.5 h-3.5" />
                <span>Spicy Level: Hot</span>
              </div>
            )}
            {selectedMenuItem.isVegetarian && (
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian Friendly</span>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
              Customization / Dietary Notes (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra dressing on side, no onions, well done"
              className="w-full px-3.5 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
            />
          </div>

          {/* Quantity and Add to Cart Action */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center bg-[#121316] border border-[#2b2d35] rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:text-[#f76707] text-[#ede7dd]/70 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-bold font-mono text-[#f7f4ed] tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:text-[#f76707] text-[#ede7dd]/70 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#f76707]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag · ${(selectedMenuItem.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
