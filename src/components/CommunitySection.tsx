import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, MessageSquare, Sparkles, User, MapPin, Check } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';

interface CommunitySectionProps {
  onReviewsChange?: (reviews: Review[]) => void;
}

export default function CommunitySection({ onReviewsChange }: CommunitySectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load reviews from local storage, fallback to default initial reviews
  useEffect(() => {
    const stored = localStorage.getItem('daily_grind_reviews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReviews(parsed);
        if (onReviewsChange) onReviewsChange(parsed);
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('daily_grind_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newAuthor.trim() || !newComment.trim()) {
      setErrorMessage('Please provide both your name and your feedback commentary.');
      return;
    }

    const newReview: Review = {
      id: `r-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      author: newAuthor,
      location: newLocation.trim() ? newLocation : 'Visitor',
      comment: newComment,
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('daily_grind_reviews', JSON.stringify(updatedReviews));
    if (onReviewsChange) onReviewsChange(updatedReviews);

    // Reset Form
    setNewAuthor('');
    setNewLocation('');
    setNewComment('');
    setNewRating(5);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="community" className="py-20 bg-[#1E110A] text-white px-4 md:px-8 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C89D7C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C89D7C] font-semibold flex items-center justify-center gap-1.5">
            <MessageSquare size={13} /> Community Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white mt-2 mb-4">
            Loved by Locals & Travelers
          </h2>
          <div className="h-1 w-20 bg-[#C89D7C] mx-auto rounded-full mb-4" />
          <p className="text-sm text-[#EFE3C3]/80 leading-relaxed">
            Read authentic thoughts from people who spend their mornings with us. Leave your own review below to join the community wall!
          </p>
        </div>

        {/* Content Layout: Feed vs Submit Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reviews List Feed (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6" id="reviews-feed">
            <h3 className="text-lg font-bold font-sans text-left border-b border-[#3D2516] pb-3 text-[#C89D7C]">
              Recent Reviews ({reviews.length})
            </h3>
            
            <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {reviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    id={`review-item-${rev.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#25150D]/75 p-6 rounded-2xl border border-[#3D2516] text-left flex flex-col justify-between hover:border-gray-500 transition-all shadow-sm"
                  >
                    <div>
                      {/* Rating Cups */}
                      <div className="flex gap-1 mb-3" aria-label={`Rating: ${rev.rating} out of 5 cups`}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Coffee
                            key={idx}
                            size={16}
                            className={idx < rev.rating ? 'text-[#C89D7C] fill-[#C89D7C]' : 'text-gray-600'}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-[#EFE3C3]/90 leading-relaxed italic font-sans mb-4">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="flex items-center justify-between border-t border-[#3D2516]/50 pt-4 mt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#3D2516] flex items-center justify-center text-[#C89D7C] font-black text-sm uppercase">
                          {rev.author.substring(0, 2)}
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-white">{rev.author}</span>
                          <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                            <MapPin size={10} className="text-[#C89D7C]" />
                            {rev.location || 'Visitor'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#C89D7C]/70">{rev.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Leave a Review Form (Col span 5) */}
          <div className="lg:col-span-5 bg-[#25150D] p-6 md:p-8 rounded-2xl border border-[#3D2516] text-left shadow-lg relative" id="add-review-form-wrapper">
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#C89D7C]" />
              <h3 className="text-lg font-bold text-white">Post Your Experience</h3>
            </div>
            
            <p className="text-xs text-gray-400 mb-6">
              Share your review with our Cayo team. Your rating cups help us serve you better every day!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-2">
                  Select Cup Rating
                </label>
                <div className="flex gap-2.5">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const ratingValue = idx + 1;
                    const isFilled = hoverRating !== null ? ratingValue <= hoverRating : ratingValue <= newRating;
                    return (
                      <button
                        type="button"
                        key={ratingValue}
                        id={`review-rate-btn-${ratingValue}`}
                        onClick={() => setNewRating(ratingValue)}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="cursor-pointer p-1.5 rounded-lg hover:bg-[#3D2516] transition-colors"
                        aria-label={`Rate ${ratingValue} cups`}
                      >
                        <Coffee
                          size={24}
                          className={`transition-all duration-150 ${
                            isFilled
                              ? 'text-[#C89D7C] fill-[#C89D7C] scale-110'
                              : 'text-gray-600 scale-100'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Author name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-1.5">
                  Your Name
                </label>
                <input
                  id="review-author-input"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1E110A] border border-[#3D2516] rounded-xl text-xs font-medium text-[#EFE3C3] focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-1.5">
                  Where are you from?
                </label>
                <input
                  id="review-location-input"
                  type="text"
                  placeholder="e.g. San Ignacio, Belize OR London, UK"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1E110A] border border-[#3D2516] rounded-xl text-xs font-medium text-[#EFE3C3] focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all"
                />
              </div>

              {/* Commentary */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C89D7C] mb-1.5">
                  Your Review
                </label>
                <textarea
                  id="review-comment-textarea"
                  rows={4}
                  placeholder="Tell others about the coffee, fry jacks, atmosphere, or our team..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1E110A] border border-[#3D2516] rounded-xl text-xs font-medium text-[#EFE3C3] focus:outline-none focus:ring-1 focus:ring-[#C89D7C] focus:border-[#C89D7C] transition-all resize-none"
                  required
                />
              </div>

              {errorMessage && (
                <div className="text-red-400 text-xs font-medium font-sans">
                  {errorMessage}
                </div>
              )}

              {/* Submit Action */}
              <button
                type="submit"
                id="review-submit-btn"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] cursor-pointer transition-all flex items-center justify-center gap-2 shadow"
              >
                Publish Review
              </button>
            </form>

            {/* Overlay Success Notice */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#25150D]/95 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-500 flex items-center justify-center mb-4">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Review Published!</h4>
                  <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                    Thank you so much! Your review was successfully added to our community board.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
