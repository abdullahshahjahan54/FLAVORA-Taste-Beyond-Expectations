import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_GALLERY } from '../data/initialData';
import { GalleryItem } from '../types';

export const FoodGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Dishes', 'Ambience', 'Kitchen'];

  const filteredGallery = selectedCategory === 'All'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter((item) => item.category === selectedCategory);

  const currentItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredGallery[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex > 0 ? activeLightboxIndex - 1 : filteredGallery.length - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex < filteredGallery.length - 1 ? activeLightboxIndex + 1 : 0
      );
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#121316] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Culinary Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
            The FLAVORA Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#ede7dd]/70 font-normal">
            Take a visual tour through our kitchen craft, master plating, and warm dining rooms.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#f76707] text-white shadow-md'
                  : 'bg-[#1a1b1f] text-[#ede7dd]/70 hover:text-[#ede7dd] border border-[#2b2d35]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-[#1a1b1f] border border-[#2b2d35] cursor-pointer hover:border-[#f76707]/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[11px] font-semibold text-[#f76707] uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#ede7dd]/80 line-clamp-2 mb-3">
                  {item.caption}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-white font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#f76707]" />
                  <span>View Full Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main preview box */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[70vh]">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center mt-4 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#f76707]">
                {currentItem.category}
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                {currentItem.title}
              </h4>
              <p className="text-xs text-[#ede7dd]/70 max-w-lg">
                {currentItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
