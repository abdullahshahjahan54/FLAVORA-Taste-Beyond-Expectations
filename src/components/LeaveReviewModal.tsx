import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({ isOpen, onClose }) => {
  const { addReview, menuItems } = useRestaurant();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [favoriteDish, setFavoriteDish] = useState(menuItems[0]?.name || 'The FLAVORA Signature Smash');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      favoriteDish,
    });

    onClose();
    setName('');
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#2b2d35] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            Guest Feedback
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#f7f4ed]">
            Share Your Dining Experience
          </h3>
          <p className="text-xs text-[#ede7dd]/70 mt-1">
            Your review helps us maintain our uncompromising culinary standards.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Rating Stars Picker */}
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1.5">
              Your Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-[#f76707] fill-[#f76707]'
                        : 'text-[#2b2d35]'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-[#ede7dd]/70 ml-2 font-medium">
                {rating === 5 ? 'Exceptional' : rating === 4 ? 'Very Good' : `${rating} Stars`}
              </span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alexander Hayes"
              className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
            />
          </div>

          {/* Favorite Dish Selector */}
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
              Favorite Dish Tried
            </label>
            <select
              value={favoriteDish}
              onChange={(e) => setFavoriteDish(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
            >
              {menuItems.map((item) => (
                <option key={item.id} value={item.name} className="bg-[#1a1b1f] text-white">
                  {item.name} ({item.category})
                </option>
              ))}
            </select>
          </div>

          {/* Comment / Review */}
          <div>
            <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
              Review & Culinary Comments *
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you love most about the flavors, presentation, or delivery?"
              className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#ede7dd]/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white uppercase bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] rounded-xl shadow-md transition-all cursor-pointer"
            >
              Submit Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
