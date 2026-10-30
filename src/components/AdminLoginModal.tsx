import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound, Sparkles } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginOpen, setIsAdminLoginOpen, adminLogin } = useRestaurant();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = adminLogin(password);
    if (!success) {
      setErrorMsg('Invalid password. Please try again.');
    } else {
      setPassword('');
    }
  };

  const handleQuickDemoFill = () => {
    setPassword('flavora2026');
    adminLogin('flavora2026');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAdminLoginOpen(false);
            setErrorMsg('');
          }}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#22242a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#f76707]/15 border border-[#f76707]/30 text-[#f76707] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#f76707]/15">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#f7f4ed]">
            Restaurant Management Login
          </h3>
          <p className="text-xs text-[#ede7dd]/70 mt-1">
            Access the live menu editor, orders tracker, category manager, and sales metrics.
          </p>
        </div>

        {/* Quick Demo Fill Callout */}
        <div className="mb-5 bg-[#1f2026] border border-[#2e313b] rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#ede7dd]/80">
            <KeyRound className="w-4 h-4 text-[#f76707]" />
            <span>Demo Password: <strong className="font-mono text-[#f76707]">flavora2026</strong></span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-[11px] font-bold text-white bg-[#f76707] hover:bg-[#e8590c] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Quick Login</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#ede7dd]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
              />
            </div>
            {errorMsg && (
              <p className="text-xs text-red-400 mt-1.5">{errorMsg}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#f76707]/25 transition-all cursor-pointer"
          >
            Authenticate & Open Dashboard
          </button>
        </form>

      </div>
    </div>
  );
};
