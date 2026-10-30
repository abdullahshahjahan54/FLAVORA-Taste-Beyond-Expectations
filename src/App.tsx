import React from 'react';
import { RestaurantProvider } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { SpecialOffers } from './components/SpecialOffers';
import { FoodGallery } from './components/FoodGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <RestaurantProvider>
      <div className="min-h-screen bg-[#121316] text-[#f7f4ed] antialiased selection:bg-[#f76707] selection:text-white flex flex-col font-sans">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          <Hero />
          <AboutSection />
          <MenuSection />
          <SpecialOffers />
          <FoodGallery />
          <CustomerReviews />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <ItemDetailModal />
        <AdminLoginModal />
        <AdminDashboard />
        <ToastContainer />
      </div>
    </RestaurantProvider>
  );
}
