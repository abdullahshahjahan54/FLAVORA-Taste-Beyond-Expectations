import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Menu, X, PhoneCall } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAdminLoginOpen, isAdmin, setIsAdminDashboardOpen } =
    useRestaurant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Special Offers', href: '#offers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121316]/95 backdrop-blur-md border-b border-[#2b2d35]/60 shadow-xl shadow-black/40 py-3.5'
          : 'bg-gradient-to-b from-[#121316]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f76707] to-[#e8590c] flex items-center justify-center text-white font-serif font-black text-xl shadow-md shadow-[#f76707]/30 transition-transform group-hover:scale-105">
              F
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f7f4ed] group-hover:text-[#f76707] transition-colors">
                FLAVORA
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest text-[#f76707] font-semibold uppercase -mt-1 font-sans">
                Taste Beyond Expectations
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#ede7dd]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#f76707] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Admin Portal & CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Call / Reservation Hotline */}
            <a
              href="tel:+15553528672"
              className="hidden xl:flex items-center gap-2 text-xs font-medium text-[#ede7dd]/70 hover:text-[#f76707] transition-colors px-2 py-1.5"
              title="Call for table booking"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#f76707]" />
              <span className="whitespace-nowrap tabular-nums">+1 (555) 352-8672</span>
            </a>

            {/* Admin Portal Button */}
            <button
              onClick={() => {
                if (isAdmin) {
                  setIsAdminDashboardOpen(true);
                } else {
                  setIsAdminLoginOpen(true);
                }
              }}
              className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-[#f76707]/15 border-[#f76707]/40 text-[#f76707] hover:bg-[#f76707]/25'
                  : 'bg-[#1a1b1f] border-[#2b2d35] text-[#ede7dd]/70 hover:text-[#ede7dd] hover:border-[#3d404a]'
              }`}
              title={isAdmin ? 'Admin Dashboard (Active)' : 'Admin Login'}
              aria-label="Admin Access"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden md:inline whitespace-nowrap">
                {isAdmin ? 'Admin Portal' : 'Admin'}
              </span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-[#1a1b1f] border border-[#2b2d35] text-[#f7f4ed] hover:border-[#f76707] transition-all hover:bg-[#22242a] focus:outline-none focus:ring-2 focus:ring-[#f76707]/40"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#f76707]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#f76707] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order Now Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase bg-gradient-to-r from-[#f76707] to-[#e8590c] rounded-lg shadow-md shadow-[#f76707]/25 hover:shadow-lg hover:shadow-[#f76707]/40 hover:from-[#e8590c] hover:to-[#d9480f] transition-all whitespace-nowrap active:scale-95"
            >
              Order Online
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1a1b1f] border border-[#2b2d35] text-[#ede7dd]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16171b] border-b border-[#2b2d35] px-6 py-5 shadow-2xl transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#ede7dd]/90 hover:text-[#f76707] py-2 border-b border-[#2b2d35]/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#f76707] rounded-lg shadow-md"
              >
                Explore Menu & Order
              </a>
              <div className="text-center text-xs text-[#ede7dd]/60 pt-1">
                Reservations: +1 (555) 352-8672
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
