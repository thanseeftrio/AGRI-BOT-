import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Camera,
  MessageSquare
} from 'lucide-react';

export const TripGlideScheduleView = ({
  onBack,
  onOpenChat,
  onOpenCalculator,
  onOpenDoctor,
  onSendMessage,
  chatMessages = [],
  isProcessing = false,
  currentLanguage = 'kannada',
  onSavePrescription
}) => {
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule', 'chat', 'booking'
  const [expandedDay, setExpandedDay] = useState(1);
  const [isFavorite, setIsFavorite] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const itinerary = [
    {
      day: 1,
      title: "Day 1",
      subtitle: "Arrival to Rio de Janeiro",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80",
      morning: "Arrive in Rio de Janeiro and transfer to your hotel (or Basal Soil Dressing: 4 Tons FYM + 87kg DAP).",
      afternoon: "Free time to relax or explore the nearby area (or Trichoderma viride bio-seed treatment).",
      evening: "Welcome dinner at a traditional Brazilian restaurant (or Standing water level 1-2 cm maintained)."
    },
    {
      day: 2,
      title: "Day 2",
      subtitle: "Rio de Janeiro Highlights",
      image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=300&q=80",
      morning: "Visit Christ the Redeemer on Corcovado Mountain (or First Foliar Inspection for spindle spots).",
      afternoon: "Explore Tijuca National Park rain forest (or Jeevamrutha foliar spray 200L/acre).",
      evening: "Sunset drinks overlooking Copacabana beach (or Siphon drainage check)."
    },
    {
      day: 3,
      title: "Day 3",
      subtitle: "Sugarloaf Mountain & Coastal Bay",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
      morning: "Cable car ascent up Sugarloaf Mountain.",
      afternoon: "Botanical Garden orchidarium guided tour.",
      evening: "Samba dance demonstration in Lapa district."
    }
  ];

  const handleSend = () => {
    if (!chatInput.trim() || isProcessing) return;
    onSendMessage({ text: chatInput });
    setChatInput('');
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Please type your query.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = currentLanguage === 'kannada' ? 'kn-IN' : currentLanguage === 'hindi' ? 'hi-IN' : 'en-IN';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setChatInput(transcript);
      setIsListening(false);
      onSendMessage({ text: transcript });
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fa] relative pb-20">
      {/* Top Header Bar (Matches Screen 3 from Uploaded Image) */}
      <div className="px-5 pt-3 pb-3 bg-white border-b border-stone-100 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="ios-circle-btn"
          title="Back to Detail"
        >
          <ChevronLeft className="w-5 h-5 text-stone-900" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-extrabold text-stone-900 tracking-tight">
            Iconic Brazil
          </h1>
          <p className="text-[10px] text-stone-400 font-medium">
            Wed, Oct 21 - Sun, Nov 1
          </p>
        </div>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="ios-circle-btn"
          title="Save Itinerary"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-900'}`} />
        </button>
      </div>

      {/* Segmented Pill Tabs (Apple Style) */}
      <div className="px-5 pt-3 bg-white pb-3 border-b border-stone-100">
        <div className="flex gap-2 bg-stone-100 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'schedule'
                ? 'bg-[#18181b] text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Tour schedule
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-[#18181b] text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            AI Consultation
          </button>

          <button
            onClick={onOpenCalculator}
            className="flex-1 py-1.5 px-3 rounded-full text-xs font-semibold text-stone-500 hover:text-stone-800 transition-all"
          >
            NPK & Details
          </button>
        </div>
      </div>

      {/* Tab Content 1: Schedule View (Matches Screen 3) */}
      {activeTab === 'schedule' && (
        <div className="px-5 pt-4 flex-1 overflow-y-auto space-y-3">
          {/* Section Header */}
          <h2 className="text-base font-black text-stone-900 tracking-tight mb-2">
            8-Days Brazil Adventure
          </h2>

          {/* Accordion Cards */}
          {itinerary.map((item) => {
            const isItemExpanded = expandedDay === item.day;
            return (
              <div
                key={item.day}
                className="bg-white border border-stone-100 rounded-2xl p-3 shadow-xs transition-all overflow-hidden"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedDay(isItemExpanded ? null : item.day)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-stone-100"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-600 block">
                        {item.title}
                      </span>
                      <h3 className="text-xs font-extrabold text-stone-900">
                        {item.subtitle}
                      </h3>
                    </div>
                  </div>

                  <button className="text-stone-400 p-1">
                    {isItemExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Sub-items (Morning, Afternoon, Evening) */}
                {isItemExpanded && (
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-2.5 text-xs text-stone-600 pl-1 animate-fadeIn">
                    <div>
                      <span className="font-bold text-stone-900 block text-[11px]">Morning</span>
                      <p className="text-stone-500 mt-0.5 leading-relaxed">{item.morning}</p>
                    </div>

                    <div>
                      <span className="font-bold text-stone-900 block text-[11px]">Afternoon</span>
                      <p className="text-stone-500 mt-0.5 leading-relaxed">{item.afternoon}</p>
                    </div>

                    <div>
                      <span className="font-bold text-stone-900 block text-[11px]">Evening</span>
                      <p className="text-stone-500 mt-0.5 leading-relaxed">{item.evening}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 2: Embedded Live AI Chatbot Stream */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col px-5 pt-3 overflow-y-auto space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-stone-100 text-xs text-stone-700 shadow-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Multi-turn AI Agronomist is online. Ask in Kannada, Hindi, or English.</span>
          </div>

          {chatMessages.length === 0 && (
            <div className="text-center p-6 bg-white rounded-2xl border border-dashed border-stone-200">
              <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-800">Ask AgriBot AI</p>
              <p className="text-[11px] text-stone-400 mt-1">
                E.g., "How much DAP for 2 acres?" or "What is the organic cure for leaf spot?"
              </p>
            </div>
          )}

          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#18181b] text-white rounded-br-xs'
                    : 'bg-white border border-stone-100 text-stone-800 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-100 p-3 rounded-2xl text-xs text-stone-400 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>AgriBot is analyzing agronomy database...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Action Pill Bar */}
      <div className="absolute bottom-4 inset-x-5 z-40">
        {activeTab === 'schedule' ? (
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full py-3.5 px-6 rounded-full ios-pill-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
          >
            <span>Book a tour / Start Consultation</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-white p-1.5 pl-4 rounded-full border border-stone-200/80 shadow-lg">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AgriBot..."
              className="flex-1 text-xs text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
            />

            <button
              onClick={handleVoiceInput}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              onClick={handleSend}
              disabled={!chatInput.trim() || isProcessing}
              className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
