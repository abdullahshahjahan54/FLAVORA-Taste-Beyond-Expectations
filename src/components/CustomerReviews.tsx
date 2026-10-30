import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, PenLine } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { LeaveReviewModal } from './LeaveReviewModal';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useRestaurant();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#16171b] border-t border-[#262830] relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#f76707]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
              <Star className="w-3.5 h-3.5 fill-[#f76707]" />
              <span>Epicurean Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
              Loved by Discerning Diners
            </h2>
            <p className="text-sm sm:text-base text-[#ede7dd]/70 font-normal">
              Read authentic feedback from regular guests, food critics, and home delivery customers.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-xl bg-[#22242a] hover:bg-[#2b2d35] border border-[#2e313b] hover:border-[#f76707]/50 text-[#f7f4ed] text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
          >
            <PenLine className="w-4 h-4 text-[#f76707]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1a1b1f] border border-[#2b2d35] hover:border-[#f76707]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60 group"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-[#f76707] fill-[#f76707]'
                            : 'text-[#2b2d35]'
                        }`}
                      />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-5 h-5 text-[#ede7dd]/20 group-hover:text-[#f76707]/40 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#ede7dd]/80 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-4 border-t border-[#262830]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#f7f4ed]">
                    {rev.name}
                  </span>
                  {rev.verifiedDiner && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Diner</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#ede7dd]/50 flex items-center justify-between">
                  <span>Favorite: {rev.favoriteDish}</span>
                  <span>{rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      <LeaveReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
};
