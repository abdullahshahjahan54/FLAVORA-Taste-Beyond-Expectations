import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    total,
    promoCode,
    applyPromoCode,
    setIsCheckoutOpen,
  } = useRestaurant();

  const [inputPromo, setInputPromo] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 50;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    applyPromoCode(inputPromo);
    setInputPromo('');
  };

  // WhatsApp Order integration
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `*FLAVORA Online Order Request*\n\n`;
    message += `*Items Ordered:*\n`;
    cart.forEach((ci) => {
      message += `• ${ci.quantity}x ${ci.item.name} - $${(ci.item.price * ci.quantity).toFixed(2)}\n`;
    });
    message += `\n*Subtotal:* $${subtotal.toFixed(2)}`;
    if (discount > 0) {
      message += `\n*Discount (${promoCode}):* -$${discount.toFixed(2)}`;
    }
    message += `\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}`;
    message += `\n*Total Bill:* $${total.toFixed(2)}\n\n`;
    message += `Please confirm my order and send estimated delivery time. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/15553528672?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#16171b] border-l border-[#2b2d35] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#262830] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#22242a] text-[#f76707] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#f7f4ed]">
                  Your Dining Bag
                </h3>
                <span className="text-xs text-[#ede7dd]/60">
                  {cart.length} unique item{cart.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#22242a] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Progress */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-[#1a1b1f] border-b border-[#262830]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 text-[#ede7dd]/80 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#f76707]" />
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-semibold">
                      You've unlocked Free Express Delivery!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="text-[#f76707] font-mono">
                        ${remainingForFreeDelivery.toFixed(2)}
                      </strong>{' '}
                      more for Free Delivery
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-[#262830] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#ff922b] to-[#f76707] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#22242a] text-[#ede7dd]/40 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#f7f4ed]">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#ede7dd]/60 max-w-xs mt-1">
                    Explore our wood-fired pizzas, smash burgers, and fresh chef specials to add items.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#f76707] text-white text-xs font-semibold rounded-xl hover:bg-[#e8590c] transition-colors"
                >
                  Browse Full Menu
                </button>
              </div>
            ) : (
              cart.map((ci) => (
                <div
                  key={ci.item.id}
                  className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-3.5 flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#22242a]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs font-bold text-[#f7f4ed] truncate">
                      {ci.item.name}
                    </h5>
                    <div className="text-[11px] text-[#f76707] font-semibold mt-0.5">
                      ${ci.item.price.toFixed(2)} each
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#121316] border border-[#2b2d35] rounded-lg">
                        <button
                          onClick={() => updateQuantity(ci.item.id, -1)}
                          className="p-1 hover:text-[#f76707] text-[#ede7dd]/70 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-[#f7f4ed] tabular-nums">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, 1)}
                          className="p-1 hover:text-[#f76707] text-[#ede7dd]/70 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#f7f4ed] tabular-nums">
                        ${(ci.item.price * ci.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(ci.item.id)}
                    className="p-2 text-[#ede7dd]/40 hover:text-red-400 transition-colors shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculation */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#1a1b1f] border-t border-[#262830] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={inputPromo}
                  onChange={(e) => setInputPromo(e.target.value)}
                  placeholder="Promo (e.g. FLAVORA10)"
                  className="flex-1 px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] uppercase placeholder-[#ede7dd]/40 focus:outline-none focus:border-[#f76707]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#22242a] hover:bg-[#2b2d35] text-[#ede7dd] border border-[#2e313b] text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-[#ede7dd]/80 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#f7f4ed]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Discount ({promoCode})</span>
                    </span>
                    <span className="font-mono tabular-nums">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono tabular-nums text-[#f7f4ed]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#262830] text-sm font-bold text-[#f7f4ed]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#f76707] tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Actions: WhatsApp & Checkout */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#f76707]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-[#ede7dd]/40 hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
