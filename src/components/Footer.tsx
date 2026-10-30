import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { setIsAdminLoginOpen, isAdmin, setIsAdminDashboardOpen, showToast } = useRestaurant();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('Subscribed to Epicurean Journal', 'You will receive monthly private dining menus and secret tastings.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0e0f12] border-t border-[#22242a] text-[#ede7dd]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f76707] to-[#e8590c] flex items-center justify-center text-white font-serif font-black text-xl shadow-md">
                F
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f7f4ed]">
                FLAVORA
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#ede7dd]/70 leading-relaxed max-w-sm">
              Taste Beyond Expectations. Modern casual luxury dining celebrating wood-fired sourdough pizzas,
              prime dry-aged smash burgers, smoked BBQ platters, and handcrafted artisan pastas.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-[#ede7dd]/60">Follow our kitchen:</span>
              <div className="flex gap-2 text-xs">
                {['Instagram', 'Facebook', 'TikTok'].map((platform) => (
                  <a
                    key={platform}
                    href={`#${platform.toLowerCase()}`}
                    className="px-2.5 py-1 rounded bg-[#16171b] border border-[#2b2d35] text-[#ede7dd]/80 hover:text-[#f76707] hover:border-[#f76707]/40 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f7f4ed] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-[#f76707] transition-colors">Home Experience</a></li>
              <li><a href="#about" className="hover:text-[#f76707] transition-colors">Our Story & Craft</a></li>
              <li><a href="#menu" className="hover:text-[#f76707] transition-colors">Artisan Menu</a></li>
              <li><a href="#offers" className="hover:text-[#f76707] transition-colors">Special Combos</a></li>
              <li><a href="#gallery" className="hover:text-[#f76707] transition-colors">Food Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#f76707] transition-colors">Guest Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#f76707] transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f7f4ed] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f76707]" />
              <span>Dining Hours</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#202228]">
                <span>Mon – Thu</span>
                <span className="font-medium text-[#f7f4ed] tabular-nums">11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#202228]">
                <span>Friday</span>
                <span className="font-medium text-[#f7f4ed] tabular-nums">11:00 AM – 12:00 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#202228]">
                <span>Saturday</span>
                <span className="font-medium text-[#f7f4ed] tabular-nums">10:00 AM – 12:00 AM</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sunday</span>
                <span className="font-medium text-[#f7f4ed] tabular-nums">10:00 AM – 11:00 PM</span>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#ede7dd]/50">
              Kitchen closes 30 minutes before dining hall closing.
            </div>
          </div>

          {/* Newsletter & Club (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f7f4ed] uppercase tracking-wider">
              Epicurean Club
            </h4>
            <p className="text-xs text-[#ede7dd]/70 leading-relaxed">
              Join for private tasting invitations, seasonal secret menu launches, and exclusive weekend discounts.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You're subscribed to FLAVORA invitations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full px-3.5 py-2.5 bg-[#16171b] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#22242a] hover:bg-[#f76707] hover:text-white border border-[#2e313b] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Join Privilege Club</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Entry */}
        <div className="pt-12 mt-12 border-t border-[#1e2026] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ede7dd]/50">
          <div>
            © {new Date().getFullYear()} FLAVORA Restaurant Group. All rights reserved. ·{' '}
            <span className="text-[#ede7dd]/70">Taste Beyond Expectations</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isAdmin) {
                  setIsAdminDashboardOpen(true);
                } else {
                  setIsAdminLoginOpen(true);
                }
              }}
              className="hover:text-[#f76707] transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#f76707]" />
              <span>{isAdmin ? 'Open Admin Dashboard' : 'Restaurant Owner Login'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
