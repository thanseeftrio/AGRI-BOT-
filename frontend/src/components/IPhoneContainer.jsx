import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const IPhoneContainer = ({ 
  children, 
  title, 
  screenNumber,
  currentTime = "9:41",
  activeDynamicIsland = false
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Screen Label Header for Desktop Showcase */}
      {title && (
        <div className="hidden lg:flex items-center gap-2 mb-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-stone-200/80 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            {screenNumber ? `Screen ${screenNumber}: ` : ''}{title}
          </span>
        </div>
      )}

      {/* iPhone Frame */}
      <div className="iphone-frame select-none">
        {/* iOS Top Status Bar */}
        <div className="relative z-50 pt-3 px-7 flex items-center justify-between text-xs font-semibold text-stone-900 pointer-events-none">
          {/* Time */}
          <span className="tracking-tight text-[13px] font-bold">{currentTime}</span>

          {/* Dynamic Island */}
          <div className="dynamic-island">
            <div className="w-3 h-3 rounded-full bg-[#111111] ring-1 ring-stone-800" />
            {activeDynamicIsland ? (
              <div className="flex items-center gap-1.5 pr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] text-white font-medium">AgriBot AI</span>
              </div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#1c1c1e]" />
            )}
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-stone-900">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-stone-900" />
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-[#f8f9fa] pt-3 pb-6">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-900/80 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};
