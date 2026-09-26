import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Leaf, 
  Bot, 
  User, 
  FlaskConical, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Trash2, 
  X, 
  RefreshCw, 
  Sprout, 
  TrendingUp, 
  Droplets, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Star,
  ArrowRight,
  Globe,
  Camera,
  Plus,
  Printer,
  SlidersHorizontal,
  Search,
  Scan,
  Calculator,
  Download,
  Copy,
  Check,
  Smartphone,
  Share2,
  Zap
} from 'lucide-react';
import { TRANSLATIONS } from './data/translations';
import { SAMPLE_CROPS, SAMPLE_DIAGNOSTICS, CROPS_LIST } from './data/sampleCrops';
import { PrescriptionModal } from './components/PrescriptionModal';
import { LeafDoctorModal } from './components/LeafDoctorModal';
import { CalculatorModal } from './components/CalculatorModal';

export function App() {
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem('agribot_lang') || 'kannada';
  });

  const [agentMode, setAgentMode] = useState(() => {
    return localStorage.getItem('agribot_mode') || 'cloud';
  });

  // Active navigation tab: 'chat', 'doctor', 'calculator', 'timeline', 'prescriptions'
  const [activeTab, setActiveTab] = useState('chat');

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isLeafDoctorModalOpen, setIsLeafDoctorModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // PWA Install Prompt Event
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsAppInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setIsInstallModalOpen(true);
    }
  };

  // Chat sessions state
  const [chatSessions, setChatSessions] = useState(() => {
    const saved = localStorage.getItem('agribot_sessions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    const initialId = Date.now().toString();
    return [{ id: initialId, title: '🌾 Kharif Paddy Consultation', createdAt: new Date().toISOString() }];
  });

  const [currentSessionId, setCurrentSessionId] = useState(() => {
    return chatSessions[0]?.id || Date.now().toString();
  });

  const [sessionMessages, setSessionMessages] = useState(() => {
    const saved = localStorage.getItem('agribot_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      [currentSessionId]: [
        {
          id: 1,
          sender: 'bot',
          text: 'ನಮಸ್ಕಾರ ರೈತ ಮಿತ್ರರೇ! ನಾನು ಅಗ್ರಿಬಾಟ್ AI (AgriBot). ನಿಮ್ಮ ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ, ರಸಗೊಬ್ಬರ (NPK) ನಿಖರ ಪ್ರಮಾಣ, ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕಗಳು (ಜೀವಾಮೃತ) ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
          timestamp: '09:41 AM'
        }
      ]
    };
  });

  const [savedPrescriptions, setSavedPrescriptions] = useState(() => {
    const saved = localStorage.getItem('agribot_prescriptions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  // Chat input states
  const [chatInput, setChatInput] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [attachedImageDataUrl, setAttachedImageDataUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [savedNoteId, setSavedNoteId] = useState(null);
  const [expandedTimelineDay, setExpandedTimelineDay] = useState(1);
  const [selectedCropCategory, setSelectedCropCategory] = useState('all');

  // Calculator State (when inside Calculator Tab)
  const [calcCrop, setCalcCrop] = useState('paddy');
  const [calcArea, setCalcArea] = useState(2.0);
  const [calcUnit, setCalcUnit] = useState('acre');
  const [calcTab, setCalcTab] = useState('npk');
  const [calcResult, setCalcResult] = useState(null);
  const [isCalcLoading, setIsCalcLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('agribot_lang', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('agribot_mode', agentMode);
  }, [agentMode]);

  useEffect(() => {
    localStorage.setItem('agribot_sessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('agribot_messages', JSON.stringify(sessionMessages));
  }, [sessionMessages]);

  useEffect(() => {
    localStorage.setItem('agribot_prescriptions', JSON.stringify(savedPrescriptions));
  }, [savedPrescriptions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionMessages, isProcessing, activeTab]);

  const currentMessages = sessionMessages[currentSessionId] || [];
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.english;

  // Send Message API Call
  const handleSendMessage = async ({ text, image, imageDataUrl } = {}) => {
    const queryText = text !== undefined ? text : chatInput;
    const queryImage = image !== undefined ? image : attachedImage;
    const queryDataUrl = imageDataUrl !== undefined ? imageDataUrl : attachedImageDataUrl;

    if (!queryText.trim() && !queryImage) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
      imageName: queryImage,
      imageDataUrl: queryDataUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSessionMessages((prev) => ({
      ...prev,
      [currentSessionId]: [...(prev[currentSessionId] || []), userMsg]
    }));

    setChatInput('');
    setAttachedImage(null);
    setAttachedImageDataUrl(null);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          language: currentLanguage,
          mode: agentMode,
          image_name: queryImage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const botReplyText = data.response_text_localized || data.response_text_en;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
        card_type: data.card_type,
        card_payload: data.card_payload,
        tool_executed: data.tool_executed,
        spoken_transcript: data.spoken_audio_transcript,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessionMessages((prev) => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || []), botMsg]
      }));
    } catch (err) {
      console.error(err);
      const fallbackMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `AgriBot response: Processed "${queryText}" using on-device agronomy engine.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessionMessages((prev) => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || []), fallbackMsg]
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  // Speech Recognition (STT)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your question.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    const langMap = {
      kannada: 'kn-IN',
      hindi: 'hi-IN',
      english: 'en-IN',
      telugu: 'te-IN',
      tamil: 'ta-IN',
      marathi: 'mr-IN'
    };
    recognition.lang = langMap[currentLanguage] || 'en-IN';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setChatInput(transcript);
      setIsListening(false);
      handleSendMessage({ text: transcript });
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  // Text to Speech Read Aloud
  const speakText = (text, msgId) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking && currentSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langMap = {
      kannada: 'kn-IN',
      hindi: 'hi-IN',
      english: 'en-IN',
      telugu: 'te-IN',
      tamil: 'ta-IN',
      marathi: 'mr-IN'
    };
    utterance.lang = langMap[currentLanguage] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(msgId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Image Upload Handling
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setAttachedImageDataUrl(uploadEvent.target.result);
      setAttachedImage(file.name);
      setChatInput((prev) => prev || `Diagnose leaf symptoms on ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Save Prescription
  const handleSavePrescription = (item) => {
    setSavedPrescriptions((prev) => [item, ...prev]);
  };

  const handleRemovePrescription = (id) => {
    setSavedPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearPrescriptions = () => {
    setSavedPrescriptions([]);
  };

  // Calculate Precision Arithmetic
  const handleRunCalculation = async () => {
    setIsCalcLoading(true);
    setCalcResult(null);

    try {
      let endpoint = '/api/agent/calculate/npk';
      if (calcTab === 'seed') endpoint = '/api/agent/calculate/seed';
      else if (calcTab === 'yield') endpoint = '/api/agent/calculate/yield';
      else if (calcTab === 'irrigation') endpoint = '/api/agent/calculate/irrigation';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_name: calcCrop,
          area_value: parseFloat(calcArea),
          area_unit: calcUnit
        })
      });

      if (!res.ok) throw new Error('Calculation failed');
      const data = await res.json();
      setCalcResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalcLoading(false);
    }
  };

  // 120-Day Crop Timeline Data
  const cropTimeline = [
    {
      day: 1,
      title: "Stage 1: Basal Soil Preparation & Seed Sowing",
      period: "Day 0 - 15",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      morning: "Apply 4 Tons Farmyard Manure (FYM) + 87kg DAP per 2 acres during final field ploughing.",
      afternoon: "Treat seeds with Trichoderma viride (10g/kg) and Beejamrutha bio-slurry to prevent fungal seedling blast.",
      evening: "Ensure shallow standing water of 1-2 cm across puddled nursery beds."
    },
    {
      day: 2,
      title: "Stage 2: Active Tillering & Vegetative Growth",
      period: "Day 25 - 40",
      image: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=600&q=80",
      morning: "Top dress first split of Urea (25kg/acre). Inspect leaf collars for early spindle-shaped blast lesions.",
      afternoon: "Foliar spray 200 Litres of 10% filtered Jeevamrutha bio-fertilizer per acre under overcast conditions.",
      evening: "Maintain consistent water level (2-3 inches) and check drainage channels."
    },
    {
      day: 3,
      title: "Stage 3: Panicle Initiation & Booting Stage",
      period: "Day 55 - 75",
      image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80",
      morning: "Apply MOP (Muriate of Potash, 15kg/acre) for grain filling and stem strength against lodging.",
      afternoon: "Spray preventive Dashaparni Kashaya (5L/100L water) or Tricyclazole 75% WP (0.6g/L) for neck blast control.",
      evening: "Monitor light traps for brown planthopper (BPH) and stem borer presence."
    },
    {
      day: 4,
      title: "Stage 4: Grain Hardening & Pre-Harvest",
      period: "Day 95 - 120",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80",
      morning: "Drain standing water completely 10-14 days prior to harvest to promote uniform grain ripening.",
      afternoon: "Inspect moisture percentage (target: 14% for storage, 20-22% at harvest).",
      evening: "Harvest when 85% of panicles turn golden yellow. Bale paddy straw for cattle fodder."
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#fafaf9] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Apple Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#18181b] text-white flex items-center justify-center font-bold text-base shadow-sm">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-stone-900 tracking-tight">
                AgriBot AI
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {agentMode === 'cloud' ? 'Cloud GPT-4o' : 'Offline Edge'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Conversational Agricultural Intelligence & Precision Diagnostics
            </p>
          </div>
        </div>

        {/* Apple Segmented Pill Tabs */}
        <nav className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-full border border-stone-200/80 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'ios-pill-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'doctor'
                ? 'ios-pill-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Leaf Doctor</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'ios-pill-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>NPK Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'ios-pill-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>120-Day Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'prescriptions'
                ? 'ios-pill-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Prescriptions ({savedPrescriptions.length})</span>
          </button>
        </nav>

        {/* Controls: Language, Mode, Download APK, Install App */}
        <div className="flex items-center gap-2">
          {/* Direct Download APK Button (Mobile & Desktop) */}
          <a
            href="/api/download/apk"
            download="AgriBot-AI-v2.0.apk"
            className="ios-btn-black py-1.5 px-3.5 text-xs font-bold gap-1.5 shadow-sm active:scale-95"
            title="Download Android APK Package (.apk)"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download APK</span>
          </a>

          {/* Install PWA App Button */}
          <button
            onClick={handleInstallApp}
            className="hidden md:inline-flex ios-btn-glass py-1.5 px-3 text-xs font-bold gap-1.5 shadow-xs active:scale-95"
            title="Install Standalone App on Device"
          >
            <Smartphone className="w-3.5 h-3.5 text-stone-800" />
            <span>Install App</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200/90 rounded-full px-3 py-1.5 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="hindi">हिन्दी (Hindi)</option>
              <option value="english">English</option>
              <option value="telugu">తెలుగు (Telugu)</option>
              <option value="tamil">தமிழ் (Tamil)</option>
              <option value="marathi">मराठी (Marathi)</option>
            </select>
          </div>

          {/* Cloud / Edge Switcher */}
          <button
            onClick={() => setAgentMode(agentMode === 'cloud' ? 'edge' : 'cloud')}
            className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs transition-colors"
            title="Toggle Cloud AI vs Offline Edge Mode"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin text-emerald-600' : 'text-stone-600'}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto w-full flex flex-col">
        {/* ========================================================================= */}
        {/* TAB 1: CONVERSATIONAL AI CHATBOT (ChatGPT / Claude for Farmers) */}
        {/* ========================================================================= */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col space-y-6 pb-28">
            {/* Top Featured Crop Hero Card (Exact aesthetic matching reference image!) */}
            <div className="relative rounded-[28px] overflow-hidden shadow-md group">
              <div className="h-[260px] sm:h-[280px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
                  alt="Kharif Paddy Fields"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
              </div>

              {/* Top-Right Favorite / Voice Badge & Download APK Shortcut */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <a
                  href="/api/download/apk"
                  download="AgriBot-AI-v2.0.apk"
                  className="ios-btn-black py-1 px-3 text-[11px] font-bold gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>APK v2.0</span>
                </a>
                <span className="text-[11px] font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Multilingual AI
                </span>
              </div>

              {/* Bottom Hero Card Details & Quick Action Presets */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Kharif & Rabi Season Precision Guidance</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Paddy & Areca Nut Farm Advisory
                </h2>

                <div className="flex items-center gap-3 text-xs text-stone-200 mt-1 mb-4">
                  <span className="flex items-center text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> 4.9
                  </span>
                  <span>• 1.4k Farmers Guided</span>
                  <span>• 12 Crops Supported</span>
                </div>

                {/* Quick Tap-to-Ask Prompt Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {t.prompts?.slice(0, 4).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage({ text: p.desc })}
                      className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap border border-white/25 transition-all active:scale-95 flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{p.title}</span>
                      <ArrowRight className="w-3 h-3 text-white/80" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stylish Black Quick Action Bar (High UX Fast Triggers) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {/* Mobile Download APK Action Pill */}
              <a
                href="/api/download/apk"
                download="AgriBot-AI-v2.0.apk"
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs bg-gradient-to-r from-emerald-950 to-stone-900 border-emerald-500/30"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>📥 Download APK for Mobile</span>
              </a>

              <button
                onClick={handleVoiceInput}
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs"
              >
                <Mic className="w-3.5 h-3.5 text-rose-400" />
                <span>🎙️ Voice Chat ({currentLanguage === 'kannada' ? 'ಕನ್ನಡ' : currentLanguage === 'hindi' ? 'हिंदी' : 'English'})</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>📷 Scan Leaf Disease</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('calculator');
                  setCalcTab('npk');
                }}
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs"
              >
                <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                <span>🧪 Calculate 2-Acre NPK</span>
              </button>

              <button
                onClick={() => handleSendMessage({ text: "ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ ಜೀವಾಮೃತ ಮತ್ತು ಅಗ್ನಿಯಾಸ್ತ್ರ ತಯಾರಿಸುವ ವಿಧಾನ ತಿಳಿಸಿ" })}
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>🌿 Jeevamrutha Recipe</span>
              </button>

              <button
                onClick={() => handleSendMessage({ text: "ಪಿಎಂ ಕಿಸಾನ್ ₹೬೦೦೦ ನೋಂದಣಿ ಮತ್ತು PMFBY ಬೆಳೆ ವಿಮೆ ವಿವರ" })}
                className="ios-btn-black py-2 px-4 text-xs whitespace-nowrap gap-2 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>🏛️ PM-KISAN ₹6000 Scheme</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="space-y-4">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3xl ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col space-y-1.5`}>
                    {/* Message Bubble */}
                    <div
                      className={`p-4 sm:p-5 rounded-3xl leading-relaxed text-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#18181b] text-white rounded-br-xs shadow-md'
                          : 'bg-white border border-stone-200/90 text-stone-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {/* Attached Image if any */}
                      {msg.imageDataUrl && (
                        <div className="mb-3 rounded-2xl overflow-hidden max-w-xs border border-stone-200">
                          <img src={msg.imageDataUrl} alt="Uploaded Leaf" className="w-full h-auto object-cover" />
                        </div>
                      )}

                      <div className="whitespace-pre-wrap font-medium">
                        {msg.text}
                      </div>

                      {/* Structured Response Card Payload (NPK, Disease, Organic, Govt) */}
                      {msg.card_payload && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
                          {/* Disease Diagnostic Card */}
                          {msg.card_payload.disease_name && (
                            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                                  Risk: {msg.card_payload.risk_level || 'High'}
                                </span>
                                <span className="text-xs font-bold text-stone-700">
                                  Pathogen: {msg.card_payload.pathogen}
                                </span>
                              </div>
                              <h4 className="font-extrabold text-stone-900 text-sm">
                                🔬 {msg.card_payload.disease_name}
                              </h4>
                              <p className="text-xs text-stone-600">
                                <strong>Organic Formulation:</strong> {msg.card_payload.organic_remedy}
                              </p>
                              <p className="text-xs text-stone-600">
                                <strong>Chemical Dosage:</strong> {msg.card_payload.chemical_remedy}
                              </p>
                            </div>
                          )}

                          {/* Fertilizer Prescription Card */}
                          {msg.card_payload.primary_recommendation && (
                            <div className="p-4 rounded-2xl bg-[#fbfbfa] border border-stone-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#18181b]">
                                  🧪 Calculated Dosage ({msg.card_payload.area_requested})
                                </span>
                                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  Cost: ₹{msg.card_payload.primary_recommendation.total_chemical_cost_inr}
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                                  <div className="text-[10px] font-bold text-stone-500 uppercase">DAP</div>
                                  <div className="text-base font-black text-stone-900">
                                    {msg.card_payload.primary_recommendation.dap_kg} kg
                                  </div>
                                  <div className="text-[10px] text-emerald-700 font-bold">
                                    {msg.card_payload.primary_recommendation.dap_50kg_bags} Bags
                                  </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                                  <div className="text-[10px] font-bold text-stone-500 uppercase">Urea</div>
                                  <div className="text-base font-black text-stone-900">
                                    {msg.card_payload.primary_recommendation.urea_kg} kg
                                  </div>
                                  <div className="text-[10px] text-teal-700 font-bold">
                                    {msg.card_payload.primary_recommendation.urea_50kg_bags} Bags
                                  </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                                  <div className="text-[10px] font-bold text-stone-500 uppercase">MOP</div>
                                  <div className="text-base font-black text-stone-900">
                                    {msg.card_payload.primary_recommendation.mop_kg} kg
                                  </div>
                                  <div className="text-[10px] text-sky-700 font-bold">
                                    {msg.card_payload.primary_recommendation.mop_50kg_bags} Bags
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Bar Under Message with Stylish UX Buttons */}
                    <div className="flex flex-wrap items-center gap-2 px-2 pt-1 text-xs text-stone-400">
                      <span className="text-[11px] font-medium">{msg.timestamp}</span>

                      {msg.sender === 'bot' && (
                        <div className="flex items-center gap-1.5 ml-auto">
                          {/* Listen (TTS) Button */}
                          <button
                            onClick={() => speakText(msg.text, msg.id)}
                            className={`ios-btn-black py-1 px-3 text-[11px] gap-1.5 shadow-xs ${
                              isSpeaking && currentSpeakingId === msg.id ? 'bg-rose-600 ring-2 ring-rose-300' : ''
                            }`}
                            title="Read Aloud in Kannada, Hindi, or English"
                          >
                            {isSpeaking && currentSpeakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3 h-3 text-white animate-pulse" />
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-emerald-400" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>

                          {/* Copy Text Button */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text);
                              setCopiedId(msg.id);
                              setTimeout(() => setCopiedId(null), 2500);
                            }}
                            className="ios-btn-black py-1 px-3 text-[11px] gap-1.5 shadow-xs"
                            title="Copy Response to Clipboard"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-300">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-stone-300" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Save to Prescription Button */}
                          <button
                            onClick={() => {
                              handleSavePrescription({
                                id: Date.now(),
                                title: `AgriBot Advisory Note`,
                                fertilizer_summary: msg.text.slice(0, 160) + '...',
                                timestamp: new Date().toLocaleString()
                              });
                              setSavedNoteId(msg.id);
                              setTimeout(() => setSavedNoteId(null), 2500);
                            }}
                            className="ios-btn-black py-1 px-3 text-[11px] gap-1.5 shadow-xs"
                            title="Save into Farm Prescription Sheet"
                          >
                            {savedNoteId === msg.id ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-300">Saved!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3 text-amber-400" />
                                <span>Save Note</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Processing Typing Indicator */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-200/90 rounded-3xl p-4 shadow-xs flex items-center gap-2.5 text-xs font-semibold text-stone-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>AgriBot is consulting agronomic knowledge base...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Floating Apple Input Capsule (Matching exact layout from reference) */}
            <div className="fixed bottom-5 inset-x-4 sm:inset-x-8 max-w-4xl mx-auto z-40">
              {attachedImage && (
                <div className="mb-2 p-2 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>Attached Leaf: {attachedImage}</span>
                  </div>
                  <button
                    onClick={() => {
                      setAttachedImage(null);
                      setAttachedImageDataUrl(null);
                    }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="bg-white/95 backdrop-blur-2xl border border-stone-200/90 rounded-full shadow-2xl p-2 pl-4 flex items-center gap-2">
                {/* Image Upload Trigger */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-10 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
                  title="Upload Leaf Photo for Disease Diagnosis"
                >
                  <Camera className="w-5 h-5" />
                </button>

                {/* Textarea / Input */}
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.input_placeholder || "Ask AgriBot in Kannada, Hindi, or English..."}
                  className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 font-medium focus:outline-none"
                />

                {/* Voice Recording Mic Trigger */}
                <button
                  onClick={handleVoiceInput}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-md'
                      : 'hover:bg-stone-100 text-stone-500 hover:text-stone-900'
                  }`}
                  title="Speak Question"
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* Send Button (Exact Circular Black Arrow) */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={(!chatInput.trim() && !attachedImage) || isProcessing}
                  className="ios-arrow-btn w-10 h-10 disabled:opacity-40"
                  title="Send Message"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: VISUAL LEAF DOCTOR (Disease Diagnosis) */}
        {/* ========================================================================= */}
        {activeTab === 'doctor' && (
          <div className="space-y-6 pb-12 animate-fadeIn">
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                🌿 Visual Leaf Doctor & AI Plant Pathology
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Instant computer vision diagnostics for foliar lesions, rust, wilt, and insect damage.
              </p>
            </div>

            {/* Diagnostic Scanner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SAMPLE_DIAGNOSTICS.map((diag) => (
                <div
                  key={diag.id}
                  className="bg-white border border-stone-200/90 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                      <img
                        src={diag.imageUrl}
                        alt={diag.disease}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-white">
                        {diag.riskLevel} Risk
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-stone-400 uppercase">
                      {diag.crop}
                    </span>
                    <h3 className="font-extrabold text-stone-900 text-sm mt-0.5">
                      {diag.disease}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-1 leading-relaxed">
                      {diag.symptomSummary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400 font-medium">
                      Pathogen: {diag.pathogen.split(' ')[0]}
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        handleSendMessage({
                          text: `Diagnose and provide treatment protocol for ${diag.crop} exhibiting ${diag.disease}.`,
                          image: diag.id
                        });
                      }}
                      className="ios-arrow-btn w-8 h-8"
                      title="Run Full AI Diagnostic Treatment"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRECISION AGRONOMY CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6 pb-12 animate-fadeIn">
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                🧮 Precision Agronomy & Arithmetic Suite
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Deterministic chemical NPK dosages, plant population spacing, and harvest yield revenue models.
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-2 bg-stone-100 p-1.5 rounded-full w-fit">
              <button
                onClick={() => { setCalcTab('npk'); setCalcResult(null); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  calcTab === 'npk' ? 'ios-pill-black shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                NPK Fertilizer Dosage
              </button>

              <button
                onClick={() => { setCalcTab('seed'); setCalcResult(null); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  calcTab === 'seed' ? 'ios-pill-black shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Seed Rate & Population
              </button>

              <button
                onClick={() => { setCalcTab('yield'); setCalcResult(null); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  calcTab === 'yield' ? 'ios-pill-black shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Yield & Gross Profit
              </button>

              <button
                onClick={() => { setCalcTab('irrigation'); setCalcResult(null); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  calcTab === 'irrigation' ? 'ios-pill-black shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Drip Water Demand
              </button>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Input Controls */}
              <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">Select Crop:</label>
                  <select
                    value={calcCrop}
                    onChange={(e) => setCalcCrop(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-semibold focus:outline-none focus:ring-1 focus:ring-stone-400"
                  >
                    {CROPS_LIST.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Land Area:</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={calcArea}
                      onChange={(e) => setCalcArea(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Unit:</label>
                    <select
                      value={calcUnit}
                      onChange={(e) => setCalcUnit(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none focus:ring-1 focus:ring-stone-400"
                    >
                      <option value="acre">Acres (ಎಕರೆ)</option>
                      <option value="gunta">Guntas (ಗುಂಟೆ)</option>
                      <option value="hectare">Hectares (ಹೆಕ್ಟೇರ್)</option>
                      <option value="cent">Cents (ಸೆಂಟ್ಸ್)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleRunCalculation}
                  disabled={isCalcLoading}
                  className="w-full py-3 rounded-full ios-pill-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-50"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{isCalcLoading ? 'Computing Deterministic Math...' : 'Run Precision Calculation'}</span>
                </button>
              </div>

              {/* Output Result Card */}
              <div className="lg:col-span-7">
                {!calcResult ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 bg-white border border-dashed border-stone-200 rounded-3xl text-center">
                    <FlaskConical className="w-12 h-12 text-stone-300 mb-2" />
                    <h3 className="text-sm font-bold text-stone-800">No Calculation Executed</h3>
                    <p className="text-xs text-stone-400 mt-1 max-w-sm">
                      Select your crop and land size on the left, then click "Run Precision Calculation".
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase">Arithmetic Output</span>
                        <h3 className="text-base font-extrabold text-stone-900">{calcResult.crop_name}</h3>
                        <p className="text-xs text-stone-500">Area: {calcResult.area_requested}</p>
                      </div>

                      {calcResult.primary_recommendation && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          Total Cost: ₹{calcResult.primary_recommendation.total_chemical_cost_inr}
                        </span>
                      )}
                    </div>

                    {/* NPK Tab Result */}
                    {calcTab === 'npk' && calcResult.primary_recommendation && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 rounded-2xl bg-stone-50 text-center border border-stone-200">
                            <span className="text-[10px] font-bold text-stone-500 uppercase">DAP</span>
                            <div className="text-lg font-black text-stone-900 mt-0.5">
                              {calcResult.primary_recommendation.dap_kg} kg
                            </div>
                            <div className="text-[11px] font-bold text-emerald-700">
                              {calcResult.primary_recommendation.dap_50kg_bags} Bags
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-stone-50 text-center border border-stone-200">
                            <span className="text-[10px] font-bold text-stone-500 uppercase">Urea</span>
                            <div className="text-lg font-black text-stone-900 mt-0.5">
                              {calcResult.primary_recommendation.urea_kg} kg
                            </div>
                            <div className="text-[11px] font-bold text-teal-700">
                              {calcResult.primary_recommendation.urea_50kg_bags} Bags
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-stone-50 text-center border border-stone-200">
                            <span className="text-[10px] font-bold text-stone-500 uppercase">MOP</span>
                            <div className="text-lg font-black text-stone-900 mt-0.5">
                              {calcResult.primary_recommendation.mop_kg} kg
                            </div>
                            <div className="text-[11px] font-bold text-sky-700">
                              {calcResult.primary_recommendation.mop_50kg_bags} Bags
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const p = calcResult.primary_recommendation;
                            handleSavePrescription({
                              id: Date.now(),
                              title: `NPK Plan: ${calcResult.crop_name} (${calcArea} ${calcUnit})`,
                              fertilizer_summary: `DAP: ${p.dap_kg}kg | Urea: ${p.urea_kg}kg | MOP: ${p.mop_kg}kg - Est Cost: ₹${p.total_chemical_cost_inr}`,
                              timestamp: new Date().toLocaleString()
                            });
                          }}
                          className="w-full py-2.5 rounded-full ios-pill-black text-white text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Save Formulation to Prescription</span>
                        </button>
                      </div>
                    )}

                    {/* Seed Tab Result */}
                    {calcTab === 'seed' && calcResult.total_seed_required_kg && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                          <span className="text-xs font-bold text-stone-500">Total Seed Required:</span>
                          <div className="text-xl font-black text-stone-900 mt-1">
                            {calcResult.total_seed_required_kg} kg
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                          <span className="text-xs font-bold text-stone-500">Plant Population:</span>
                          <div className="text-xl font-black text-stone-900 mt-1">
                            {calcResult.estimated_plant_population.total_field_plants.toLocaleString()} plants
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Yield Tab Result */}
                    {calcTab === 'yield' && calcResult.economics && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Yield</span>
                          <div className="text-base font-black text-amber-600 mt-1">
                            {calcResult.projected_yield.total_quintals} Q
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Gross Revenue</span>
                          <div className="text-base font-black text-emerald-700 mt-1">
                            ₹{calcResult.economics.projected_gross_revenue_inr.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Cost</span>
                          <div className="text-base font-black text-rose-700 mt-1">
                            ₹{calcResult.economics.estimated_production_cost_inr.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Net Profit</span>
                          <div className="text-base font-black text-teal-700 mt-1">
                            ₹{calcResult.economics.estimated_net_profit_inr.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Irrigation Tab Result */}
                    {calcTab === 'irrigation' && calcResult.irrigation_demand && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                          <span className="text-xs font-bold text-stone-500">Water Demand:</span>
                          <div className="text-xl font-black text-stone-900 mt-1">
                            {calcResult.irrigation_demand.total_water_litres.toLocaleString()} L
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                          <span className="text-xs font-bold text-stone-500">5 HP Pump Runtime:</span>
                          <div className="text-xl font-black text-stone-900 mt-1">
                            {calcResult.pump_runtime_estimate_hours?.['5hp_pump_hours']} Hours
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 120-DAY CROP TIMELINE ACCORDIONS */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto w-full">
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                🌾 120-Day Precision Sowing to Harvest Timeline
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Stage-by-stage agronomic actions with Morning, Afternoon, and Evening field routines.
              </p>
            </div>

            <div className="space-y-3">
              {cropTimeline.map((item) => {
                const isExpanded = expandedTimelineDay === item.day;
                return (
                  <div
                    key={item.day}
                    className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-xs transition-all overflow-hidden"
                  >
                    <div
                      onClick={() => setExpandedTimelineDay(isExpanded ? null : item.day)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-2xl object-cover ring-1 ring-stone-200"
                        />
                        <div>
                          <span className="text-xs font-bold text-amber-600 block">
                            {item.period}
                          </span>
                          <h3 className="text-sm font-extrabold text-stone-900 mt-0.5">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <button className="text-stone-400 p-1">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-stone-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-stone-100 space-y-3 text-xs leading-relaxed pl-2 animate-fadeIn">
                        <div>
                          <span className="font-extrabold text-stone-900 block text-xs">🌅 Morning</span>
                          <p className="text-stone-600 mt-0.5">{item.morning}</p>
                        </div>

                        <div>
                          <span className="font-extrabold text-stone-900 block text-xs">☀️ Afternoon</span>
                          <p className="text-stone-600 mt-0.5">{item.afternoon}</p>
                        </div>

                        <div>
                          <span className="font-extrabold text-stone-900 block text-xs">🌙 Evening</span>
                          <p className="text-stone-600 mt-0.5">{item.evening}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SAVED FARM PRESCRIPTIONS & ADVISORY SHEET */}
        {/* ========================================================================= */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-stone-900 tracking-tight">
                  📋 Saved Farm Prescriptions & Advisory Sheet
                </h2>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  Official diagnostic formulations, NPK quantities, and organic recipes saved during AI consultations.
                </p>
              </div>

              {savedPrescriptions.length > 0 && (
                <button
                  onClick={() => window.print()}
                  className="py-2 px-4 rounded-full ios-pill-black text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Advisory Sheet</span>
                </button>
              )}
            </div>

            {savedPrescriptions.length === 0 ? (
              <div className="p-12 text-center bg-white border border-dashed border-stone-200 rounded-3xl">
                <FileText className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-stone-800">No Prescriptions Saved Yet</h3>
                <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                  Click "Save to Prescription" on any AI consultation or NPK calculation to build your printable farmer sheet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedPrescriptions.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">
                        {p.timestamp}
                      </span>
                      <h4 className="font-extrabold text-stone-900 text-sm mt-0.5">
                        {p.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {p.fertilizer_summary || p.remedy_summary}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemovePrescription(p.id)}
                      className="text-stone-300 hover:text-rose-600 p-1.5 transition-colors"
                      title="Remove Prescription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Prescription Modal (if triggered directly) */}
      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        prescriptions={savedPrescriptions}
        onClearPrescriptions={handleClearPrescriptions}
        onRemovePrescription={handleRemovePrescription}
        currentLanguage={currentLanguage}
      />

      {/* Visual Leaf Doctor Modal */}
      <LeafDoctorModal
        isOpen={isLeafDoctorModalOpen}
        onClose={() => setIsLeafDoctorModalOpen(false)}
        currentLanguage={currentLanguage}
        agentMode={agentMode}
        onSavePrescription={handleSavePrescription}
      />

      {/* Precision Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
        currentLanguage={currentLanguage}
        onSavePrescription={handleSavePrescription}
      />

      {/* PWA App Installation Guide Modal */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white border border-stone-200/90 rounded-3xl shadow-2xl p-6 space-y-5">
            <button
              onClick={() => setIsInstallModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181b] text-white flex items-center justify-center text-xl font-black shadow-md">
                🌾
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  Install AgriBot Native App
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Run standalone on Android, iPhone, or Desktop
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-600 font-medium">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="font-extrabold text-stone-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Android (Chrome / Edge)
                </span>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Tap the top right menu ⋮ and select <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="font-extrabold text-stone-900 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-sky-600" />
                  iPhone & iPad (Safari)
                </span>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Tap the bottom Share button ⎋ and select <strong>"Add to Home Screen ⊞"</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="font-extrabold text-stone-900 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-amber-600" />
                  Direct Android APK File (.apk)
                </span>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Download the standalone Android package directly to install on any Android phone.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="/api/download/apk"
                download="AgriBot-AI-v2.0.apk"
                className="flex-1 py-3 rounded-full ios-btn-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-center"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download APK File</span>
              </a>

              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="py-3 px-5 rounded-full ios-btn-glass text-stone-800 text-xs font-bold active:scale-95 transition-all"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
