import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  ArrowRight, 
  Star, 
  Sparkles,
  Leaf,
  Droplet,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const TripGlideDetailView = ({
  onBack,
  onProceedToSchedule,
  onOpenChat,
  onOpenDoctor,
  onSavePrescription,
  currentLanguage = 'kannada'
}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const solutions = [
    {
      id: "organic_dashaparni",
      title: "Iconic Brazil / Dashaparni",
      subtitle: "8 days • from $850 / 100% Organic",
      rating: "4.6",
      reviews: "56 reviews",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
      tag: "Herbal Bio-Fungicide"
    },
    {
      id: "tricyclazole_cure",
      title: "Beach / Tricyclazole 75%",
      subtitle: "Chemical Spray • 0.6g/L Water",
      rating: "4.8",
      reviews: "92 reviews",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: "Systemic Curative"
    }
  ];

  return (
    <div className="flex-1 flex flex-col relative bg-white pb-6 -mt-3">
      {/* Hero Image Header */}
      <div className="relative h-[240px] w-full shrink-0">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1000&q=80"
          alt="Rio de Janeiro Landscape"
          className="w-full h-full object-cover"
        />
        {/* Top Back & Heart Action Buttons */}
        <div className="absolute top-4 inset-x-5 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="ios-circle-btn"
            title="Back to Home"
          >
            <ChevronLeft className="w-5 h-5 text-stone-900" />
          </button>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="ios-circle-btn"
            title="Add to Favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-900'}`} />
          </button>
        </div>
      </div>

      {/* Sliding Rounded White Sheet (Matches Screen 2 from Image) */}
      <div className="flex-1 bg-white rounded-t-[32px] -mt-7 relative z-20 px-5 pt-5 flex flex-col">
        {/* Title & Reviews Row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-black text-stone-900 tracking-tight">
              Rio de Janeiro
            </h1>
            {/* Country / Status Badge with Green Dot */}
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Brazil / Paddy Care</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0</span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">
              143 reviews
            </span>
          </div>
        </div>

        {/* Description Paragraph */}
        <div className="mt-3 text-xs leading-relaxed text-stone-500 font-medium">
          <p>
            Rio de Janeiro, often simply called Rio, is one of Brazil's most iconic cities, renowned for its breathtaking mountains, coastal ecosystems, and vibrant cultural heritage...
            {isExpanded && (
              <span className="text-stone-700 block mt-2">
                For agricultural precision: Paddy blast (Magnaporthe oryzae) thrives under high humidity. Apply preventive organic bio-agents (Trichoderma + Jeevamrutha) during nursery and early tillering stages.
              </span>
            )}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-900 font-bold underline mt-1 inline-block"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </div>

        {/* "Upcoming tours" / "Recommended Solutions" Section Header */}
        <div className="flex items-center justify-between mt-5 mb-3">
          <h2 className="text-sm font-bold text-stone-900 tracking-tight">
            Upcoming tours
          </h2>
          <button 
            onClick={onProceedToSchedule}
            className="text-xs text-stone-400 hover:text-stone-700 font-semibold"
          >
            See all
          </button>
        </div>

        {/* Horizontal Carousel Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {solutions.map((item) => (
            <div
              key={item.id}
              onClick={onProceedToSchedule}
              className="bg-white border border-stone-100 rounded-2xl p-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/70 backdrop-blur-md text-stone-900 flex items-center justify-center shadow-xs"
                >
                  <Heart className="w-3 h-3 text-stone-700" />
                </button>
              </div>

              <div>
                <h3 className="text-xs font-bold text-stone-900 truncate">
                  {item.title}
                </h3>
                <p className="text-[10px] text-stone-400 font-medium truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-50">
                <div className="flex items-center gap-1 text-[11px] font-bold text-stone-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>

                <div className="ios-arrow-btn w-6 h-6">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action CTA Pill Button */}
        <button
          onClick={onProceedToSchedule}
          className="w-full py-3.5 px-5 rounded-full ios-pill-black text-white text-xs font-bold flex items-center justify-between shadow-md active:scale-98 transition-all mt-auto"
        >
          <span>View 8-Day Schedule & Consultation</span>
          <div className="w-6 h-6 rounded-full bg-white text-stone-900 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </div>
  );
};
