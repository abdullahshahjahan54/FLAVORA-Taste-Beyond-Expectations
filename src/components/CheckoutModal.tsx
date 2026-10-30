import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Banknote, Globe, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    discount,
    total,
    createOrder,
  } = useRestaurant();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'online'>('cod');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) return;

    setIsPlacing(true);
    setTimeout(() => {
      createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        paymentMethod,
        orderNotes: orderNotes.trim() || undefined,
      });
      setIsPlacing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-2xl my-8 relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#262830] flex items-center justify-between bg-[#1a1b1f]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f76707]">
              Final Step
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#f7f4ed]">
              Complete Your Food Delivery Order
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#22242a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
          
          {/* Customer Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ede7dd]/80">
              1. Contact & Delivery Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Abdullah Vance"
                  className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                Complete Delivery Address *
              </label>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Street address, building, suite/apartment number, postal code"
                className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                Kitchen / Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Leave with security, extra spicy, no cutlery needed"
                className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-[#262830]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ede7dd]/80">
              2. Select Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#f76707]/15 border-[#f76707] text-[#f7f4ed]'
                    : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:border-[#3d404a]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <Banknote className="w-5 h-5 text-[#f76707] mb-1.5" />
                <span className="text-xs font-bold block">Cash on Delivery</span>
                <span className="text-[10px] text-[#ede7dd]/60 mt-0.5">Pay upon arrival</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#f76707]/15 border-[#f76707] text-[#f7f4ed]'
                    : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:border-[#3d404a]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 text-[#f76707] mb-1.5" />
                <span className="text-xs font-bold block">Card on Delivery</span>
                <span className="text-[10px] text-[#ede7dd]/60 mt-0.5">Mobile POS machine</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? 'bg-[#f76707]/15 border-[#f76707] text-[#f7f4ed]'
                    : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:border-[#3d404a]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="sr-only"
                />
                <Globe className="w-5 h-5 text-[#f76707] mb-1.5" />
                <span className="text-xs font-bold block">Instant Online</span>
                <span className="text-[10px] text-[#ede7dd]/60 mt-0.5">Instant checkout</span>
              </label>
            </div>
          </div>

          {/* Itemized Order Recap */}
          <div className="bg-[#121316] border border-[#2b2d35] rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#ede7dd]/60 border-b border-[#262830] pb-2">
              <span>{cart.length} Order Item(s)</span>
              <span>Price</span>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
              {cart.map((ci) => (
                <div key={ci.item.id} className="flex justify-between text-xs">
                  <span className="text-[#ede7dd]/90 truncate">
                    {ci.quantity}x {ci.item.name}
                  </span>
                  <span className="font-mono text-[#f7f4ed] tabular-nums shrink-0 ml-2">
                    ${(ci.item.price * ci.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#262830] flex justify-between items-baseline font-bold">
              <span className="text-sm text-[#f7f4ed]">Total to Pay</span>
              <span className="text-xl font-mono text-[#f76707] tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-2.5 text-xs font-semibold text-[#ede7dd]/70 hover:text-white"
            >
              Back to Bag
            </button>

            <button
              type="submit"
              disabled={isPlacing}
              className="px-8 py-3.5 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#f76707]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isPlacing ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
