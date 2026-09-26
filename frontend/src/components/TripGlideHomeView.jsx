import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  ArrowRight, 
  Home, 
  Compass, 
  Grid, 
  MessageSquare, 
  Sparkles,
  Star,
  MapPin,
  Leaf
} from 'lucide-react';

export const TripGlideHomeView = ({
  onSelectCrop,
  onOpenDetail,
  onOpenChat,
  onOpenDoctor,
  onOpenCalculator,
  onOpenPrescriptions,
  activeNav = 'home',
  currentLanguage = 'kannada'
}) => {
  const [activeCategory, setActiveCategory] = useState('south_america'); // 'asia', 'europe', 'south_america', 'north_america'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const categories = [
    { id: 'asia', label: 'Asia (Paddy / Cereals)' },
    { id: 'europe', label: 'Europe (Wheat / Oats)' },
    { id: 'south_america', label: 'South America (Coffee & Spices)' },
    { id: 'north_america', label: 'North America (Corn / Soy)' }
  ];

  const featuredCard = {
    location: "Karnataka & South India",
    title: "Kharif Paddy & Blast Care",
    rating: "5.0",
    reviews: "143 reviews",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    description: "Comprehensive agronomic guide for high-yield paddy cultivation, blast disease prevention, and organic bio-fertilizers."
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-3 relative pb-20">
      {/* Top Greeting & User Avatar */}
      <div className="flex items-center justify-between mt-1 mb-4">
        <div>
          <h1 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-1.5">
            Hello, Vanessa
          </h1>
          <p className="text-xs text-stone-400 font-medium">
            Welcome to AgriBot AI
          </p>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200 shadow-sm cursor-pointer hover:opacity-90"
            onClick={onOpenPrescriptions}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
        </div>
      </div>

      {/* Search Input Bar with Filter Button */}
      <div className="relative flex items-center mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-white border border-stone-100 rounded-full pl-10 pr-4 py-3 text-xs text-stone-800 placeholder-stone-400 font-medium shadow-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>
        <button 
          onClick={onOpenCalculator}
          className="ml-2.5 w-10 h-10 rounded-full bg-[#18181b] text-white flex items-center justify-center hover:bg-stone-800 transition-all shadow-sm active:scale-95 shrink-0"
          title="Filter & Agronomy Tools"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Section Header */}
      <div className="mb-3">
        <h2 className="text-base font-bold text-stone-900 tracking-tight">
          Select your next crop
        </h2>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
                isSelected
                  ? 'ios-pill-black shadow-sm'
                  : 'ios-pill-light'
              }`}
            >
              {cat.label.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Large Featured Card (Matches Screen 1 from Uploaded Image) */}
      <div className="relative rounded-[28px] overflow-hidden shadow-md group mt-1 cursor-pointer" onClick={onOpenDetail}>
        {/* Background Image */}
        <div className="h-[310px] w-full relative">
          <img
            src={featuredCard.image}
            alt={featuredCard.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        {/* Top-Right Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/60 transition-all active:scale-95 shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Bottom Card Content */}
        <div className="absolute bottom-0 inset-x-0 p-4 pt-0 text-white">
          <div className="text-[11px] font-medium text-stone-300">
            {featuredCard.location}
          </div>
          <div className="text-lg font-extrabold tracking-tight text-white mt-0.5">
            Rio de Janeiro / Paddy Care
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-1 mb-3">
            <span className="flex items-center text-amber-400 font-bold">
              ★ {featuredCard.rating}
            </span>
            <span className="text-[11px] text-stone-300">
              {featuredCard.reviews}
            </span>
          </div>

          {/* "See More" Dark Pill Button */}
          <div className="flex items-center justify-between bg-[#18181b]/90 backdrop-blur-md rounded-full pl-5 pr-1.5 py-1.5 border border-white/10 shadow-lg group-hover:bg-[#18181b] transition-all">
            <span className="text-xs font-semibold text-white">
              See more
            </span>
            <div className="w-8 h-8 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar (Exact Apple Pill Style) */}
      <div className="ios-bottom-nav">
        {/* Home Button (Active with white circular background) */}
        <button 
          onClick={() => {}}
          className="w-9 h-9 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-sm"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* AI Chat Button */}
        <button 
          onClick={onOpenChat}
          className="w-9 h-9 rounded-full text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          title="AgriBot AI Chat"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Leaf Doctor Button */}
        <button 
          onClick={onOpenDoctor}
          className="w-9 h-9 rounded-full text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          title="Leaf Doctor Diagnostics"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Precision Calculator / Tools */}
        <button 
          onClick={onOpenCalculator}
          className="w-9 h-9 rounded-full text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          title="Precision Agronomy Calculator"
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
