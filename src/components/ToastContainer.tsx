import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useRestaurant();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${
              isError
                ? 'bg-red-950/90 border-red-500/50 text-white'
                : 'bg-[#1a1b1f]/95 border-[#2b2d35] text-[#f7f4ed]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isError ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-[#f76707]" />
              ) : (
                <Info className="w-5 h-5 text-sky-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-xs font-serif text-[#f7f4ed]">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-[#ede7dd]/80 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#ede7dd]/40 hover:text-white shrink-0 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
