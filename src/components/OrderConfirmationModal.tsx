import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageCircle, X } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder } = useRestaurant();

  if (!lastConfirmedOrder) return null;

  const handleWhatsAppShare = () => {
    let msg = `*Order Confirmation #${lastConfirmedOrder.id}*\n`;
    msg += `Customer: ${lastConfirmedOrder.customerName}\n`;
    msg += `Delivery Address: ${lastConfirmedOrder.deliveryAddress}\n`;
    msg += `Total: $${lastConfirmedOrder.total.toFixed(2)}\n`;
    msg += `Status: ${lastConfirmedOrder.status}\n`;
    msg += `Thank you for ordering with FLAVORA!`;

    window.open(`https://wa.me/15553528672?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-lg my-8 relative shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setLastConfirmedOrder(null)}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#22242a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            Order Confirmed & Sent to Kitchen
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7f4ed] mt-1">
            Thank You, {lastConfirmedOrder.customerName}!
          </h3>
          <p className="text-xs text-[#ede7dd]/70 mt-1">
            Order Reference:{' '}
            <span className="font-mono font-bold text-[#f76707]">{lastConfirmedOrder.id}</span>
          </p>
        </div>

        {/* Live Status Tracker */}
        <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-4 text-left space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ede7dd]/70">Estimated Delivery:</span>
            <span className="font-bold text-[#f7f4ed] flex items-center gap-1.5 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#f76707]" />
              <span>30–40 Minutes</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ede7dd]/70">Current Kitchen Status:</span>
            <span className="bg-[#f76707]/15 text-[#f76707] font-semibold px-2 py-0.5 rounded text-[11px] border border-[#f76707]/30">
              {lastConfirmedOrder.status}
            </span>
          </div>

          <div className="pt-2 border-t border-[#262830] text-xs space-y-1">
            <div className="flex items-start gap-1.5 text-[#ede7dd]/70">
              <MapPin className="w-3.5 h-3.5 text-[#f76707] shrink-0 mt-0.5" />
              <span className="truncate">{lastConfirmedOrder.deliveryAddress}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#ede7dd]/70">
              <Phone className="w-3.5 h-3.5 text-[#f76707] shrink-0" />
              <span>{lastConfirmedOrder.customerPhone}</span>
            </div>
          </div>
        </div>

        {/* Itemized Snapshot */}
        <div className="bg-[#121316] border border-[#2b2d35] rounded-xl p-4 text-left text-xs space-y-2">
          <div className="font-semibold text-[#f7f4ed] border-b border-[#262830] pb-1.5">
            Order Summary
          </div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {lastConfirmedOrder.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-[#ede7dd]/80">
                <span>{it.quantity}x {it.name}</span>
                <span className="font-mono tabular-nums">${(it.price * it.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-1.5 border-t border-[#262830] flex justify-between font-bold text-[#f7f4ed]">
            <span>Total Paid ({lastConfirmedOrder.paymentMethod.toUpperCase()})</span>
            <span className="font-mono text-[#f76707] tabular-nums">${lastConfirmedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Notify Kitchen via WhatsApp</span>
          </button>

          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="w-full py-2.5 bg-[#22242a] hover:bg-[#2b2d35] text-xs font-semibold text-[#ede7dd] rounded-xl transition-colors cursor-pointer"
          >
            Back to Homepage
          </button>
        </div>

      </div>
    </div>
  );
};
