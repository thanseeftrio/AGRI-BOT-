import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Image as ImageIcon, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Plus, 
  Sparkles, 
  Leaf, 
  Bot, 
  User, 
  FlaskConical, 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Trash2, 
  X, 
  RefreshCw, 
  Landmark, 
  Sprout, 
  TrendingUp, 
  Droplets, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Award
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const ChatView = ({
  onToggleSidebar,
  currentLanguage,
  agentMode,
  chatMessages,
  onSendMessage,
  isProcessing,
  onClearChat,
  onSavePrescription,
  onOpenPrescriptions,
  savedPrescriptionsCount
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.english;
  
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);
  const [autoPlaySpeech, setAutoPlaySpeech] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [audioWaves, setAudioWaves] = useState([12, 28, 45, 60, 32, 18, 52, 70, 40, 15]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isProcessing]);

  // Audio wave animation when listening
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setAudioWaves(Array.from({ length: 12 }, () => Math.floor(Math.random() * 55) + 15));
      }, 120);
    } else {
      setAudioWaves([10, 18, 24, 30, 24, 18, 10, 15, 20, 12, 18, 10]);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  // Web Speech API STT
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        const langCodeMap = {
          kannada: 'kn-IN',
          hindi: 'hi-IN',
          telugu: 'te-IN',
          tamil: 'ta-IN',
          marathi: 'mr-IN',
          english: 'en-IN'
        };
        recognition.lang = langCodeMap[currentLanguage] || 'kn-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          if (transcript) {
            handleSubmit(transcript);
          }
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        if (t.prompts && t.prompts.length > 0) {
          const sample = t.prompts[Math.floor(Math.random() * t.prompts.length)].desc;
          handleSubmit(sample);
        }
      }, 1600);
    }
  };

  // Text-to-Speech (TTS)
  const speakText = (text, msgId) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking && currentSpeakingId === msgId) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langCodeMap = {
        kannada: 'kn-IN',
        hindi: 'hi-IN',
        telugu: 'te-IN',
        tamil: 'ta-IN',
        marathi: 'mr-IN',
        english: 'en-IN'
      };
      utterance.lang = langCodeMap[currentLanguage] || 'kn-IN';
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
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCard = (msg) => {
    const p = msg.card_payload;
    if (!p) return;

    let prescriptionItem = {
      id: Date.now(),
      title: `Advisory for ${p.crop_name || p.crop || 'Crop'}`,
      timestamp: new Date().toLocaleString()
    };

    if (msg.card_type === 'fertilizer_card') {
      const rec = p.primary_recommendation;
      prescriptionItem = {
        ...prescriptionItem,
        title: `NPK Formulation: ${p.crop_name} (${p.area_requested || 'Field'})`,
        fertilizer_summary: `DAP: ${rec.dap_kg}kg (${rec.dap_50kg_bags} bags) | Urea: ${rec.urea_kg}kg (${rec.urea_50kg_bags} bags) | MOP: ${rec.mop_kg}kg (${rec.mop_50kg_bags} bags) - Est Cost: ₹${rec.total_chemical_cost_inr}`
      };
    } else if (msg.card_type === 'disease_diagnosis_card') {
      prescriptionItem = {
        ...prescriptionItem,
        title: `Pathology Report: ${p.disease_name_en}`,
        disease_name: p.disease_name_en,
        severity: p.severity_level,
        chemical_remedy: p.chemical_remedy,
        organic_remedy: p.organic_remedy,
        phi_days: p.safety_interval_phi_days
      };
    }

    onSavePrescription(prescriptionItem);
    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage({
          name: file.name,
          dataUrl: event.target?.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (text = inputText) => {
    const trimmed = text.trim();
    if ((!trimmed && !attachedImage) || isProcessing) return;

    onSendMessage({
      text: trimmed || (attachedImage ? `Diagnose leaf photo: ${attachedImage.name}` : ''),
      image: attachedImage ? attachedImage.name : null,
      imageDataUrl: attachedImage ? attachedImage.dataUrl : null
    });

    setInputText('');
    setAttachedImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fafaf8] text-[#1a1a1a] relative overflow-hidden">
      {/* MAT Global Top Navigation Bar */}
      <header className="h-16 mat-nav px-4 sm:px-8 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-[#5c5c5c] hover:text-[#1a1a1a] hover:bg-slate-200/50 transition-colors lg:hidden"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center font-bold text-sm shadow-sm">
              🌾
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-[#1a1a1a] flex items-center gap-2 tracking-tight">
                <span>{t.app_name}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#1b4332]/10 text-[#1b4332] font-bold border border-[#1b4332]/20">
                  {agentMode === 'cloud' ? 'Cloud Agronomy Engine' : 'Offline Edge Mode'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Voice Auto-Play */}
          <button
            onClick={() => setAutoPlaySpeech(!autoPlaySpeech)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              autoPlaySpeech
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'bg-white text-[#5c5c5c] hover:text-[#1a1a1a] border border-[rgba(0,0,0,0.08)]'
            }`}
            title="Auto read responses aloud"
          >
            {autoPlaySpeech ? <Volume2 className="w-3.5 h-3.5 text-[#c9a227]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline text-[11px]">{t.audio_read_aloud}</span>
          </button>

          {/* Saved Prescriptions Button */}
          <button
            onClick={onOpenPrescriptions}
            className="relative px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f0f0ec] text-[#1a1a1a] border border-[rgba(0,0,0,0.08)] shadow-xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title={t.saved_prescriptions}
          >
            <FileText className="w-3.5 h-3.5 text-[#1b4332]" />
            <span className="hidden sm:inline text-[11px]">Rx Advisory Sheet</span>
            {savedPrescriptionsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#c9a227] text-[#0d2818] font-black text-[9px] flex items-center justify-center shadow-xs">
                {savedPrescriptionsCount}
              </span>
            )}
          </button>

          {/* Clear Chat */}
          {chatMessages.length > 0 && (
            <button
              onClick={onClearChat}
              className="p-2 rounded-full text-[#5c5c5c] hover:text-rose-600 hover:bg-white border border-transparent hover:border-[rgba(0,0,0,0.08)] transition-colors"
              title={t.clear_chat}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Empty State: MAT Global Traders Style Hero & Product Cards */}
        {chatMessages.length === 0 && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in py-4">
            {/* Hero Content Section */}
            <div className="text-center space-y-3">
              <p className="mat-eyebrow">
                India's Farmer AI Advisory & Diagnostics Platform
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight leading-tight">
                Scientific precision.<br className="hidden sm:inline" /> Instant diagnostics.<br className="hidden sm:inline" /> Delivered with trust.
              </h2>
              <p className="text-xs sm:text-sm text-[#5c5c5c] max-w-xl mx-auto leading-relaxed">
                AgriBot assists smallholders and commercial growers across India with leaf disease scanning, exact linear NPK dosage arithmetic, organic remediation recipes, and government scheme planning.
              </p>
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-[#1b4332]">100%</div>
                <div className="text-[11px] text-[#5c5c5c] font-medium">Deterministic Math</div>
              </div>
              <div className="text-center border-l border-[rgba(0,0,0,0.08)]">
                <div className="text-lg sm:text-xl font-bold text-[#1b4332]">12+</div>
                <div className="text-[11px] text-[#5c5c5c] font-medium">Core Crops</div>
              </div>
              <div className="text-center border-l border-[rgba(0,0,0,0.08)]">
                <div className="text-lg sm:text-xl font-bold text-[#1b4332]">Dual Mode</div>
                <div className="text-[11px] text-[#5c5c5c] font-medium">Bio + Chemical</div>
              </div>
              <div className="text-center border-l border-[rgba(0,0,0,0.08)]">
                <div className="text-lg sm:text-xl font-bold text-[#1b4332]">6 Dialects</div>
                <div className="text-[11px] text-[#5c5c5c] font-medium">Voice Enabled</div>
              </div>
            </div>

            {/* Quick Consultation Cards (MAT Global Style Product/Advisory Cards) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="mat-eyebrow">Explore Core Consultations</span>
                <span className="text-[11px] text-[#5c5c5c]">Click to ask instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.prompts && t.prompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(p.desc)}
                    className="mat-card p-5 text-left transition-all group active:scale-[0.99] flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#1b4332] flex items-center justify-between">
                        <span>{p.title}</span>
                        <ChevronRight className="w-4 h-4 text-[#2d6a4f] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-[#5c5c5c] mt-2 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-[11px] text-[#1b4332] font-semibold">
                      <span>Get Instant Formulation</span>
                      <span>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`max-w-3xl mx-auto flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm mt-0.5">
                  🌾
                </div>
              )}

              <div className={`space-y-3 max-w-[88%] sm:max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
                {/* User Message (MAT Forest Green Pill) */}
                {isUser ? (
                  <div className="bg-[#1b4332] text-white p-4 rounded-2xl rounded-tr-xs shadow-sm text-xs sm:text-sm space-y-2 font-medium">
                    {msg.imageDataUrl && (
                      <div className="rounded-xl overflow-hidden max-h-48 border border-white/20">
                        <img src={msg.imageDataUrl} alt="Leaf upload" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ) : (
                  /* Bot Message (MAT Global Crisp White Card) */
                  <div className="mat-card p-5 sm:p-6 rounded-2xl rounded-tl-xs text-xs sm:text-sm text-[#1a1a1a] space-y-4">
                    {/* Formatted Markdown Content */}
                    <div className="prose max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-[#1a1a1a] font-normal">
                      {msg.text}
                    </div>

                    {/* Interactive Embedded Fertilizer Card */}
                    {msg.card_type === 'fertilizer_card' && msg.card_payload && (
                      <div className="bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] rounded-xl p-4 space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-2.5">
                          <span className="text-xs font-bold text-[#1b4332] flex items-center gap-1.5">
                            <FlaskConical className="w-4 h-4 text-[#2d6a4f]" />
                            Precision Formulation Checklist
                          </span>
                          <span className="text-xs font-bold text-[#1b4332] bg-[#1b4332]/10 px-2.5 py-0.5 rounded-full border border-[#1b4332]/20">
                            ₹{msg.card_payload.primary_recommendation.total_chemical_cost_inr} Est.
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 text-center">
                          <div className="p-2.5 rounded-xl bg-white border border-[rgba(0,0,0,0.08)]">
                            <div className="text-[10px] text-[#2d6a4f] font-bold uppercase">DAP</div>
                            <div className="text-base font-extrabold text-[#1a1a1a] mt-0.5">{msg.card_payload.primary_recommendation.dap_kg} kg</div>
                            <div className="text-[10px] text-[#5c5c5c] font-semibold">({msg.card_payload.primary_recommendation.dap_50kg_bags} Bags)</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-[rgba(0,0,0,0.08)]">
                            <div className="text-[10px] text-[#2d6a4f] font-bold uppercase">Urea</div>
                            <div className="text-base font-extrabold text-[#1a1a1a] mt-0.5">{msg.card_payload.primary_recommendation.urea_kg} kg</div>
                            <div className="text-[10px] text-[#5c5c5c] font-semibold">({msg.card_payload.primary_recommendation.urea_50kg_bags} Bags)</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-[rgba(0,0,0,0.08)]">
                            <div className="text-[10px] text-[#2d6a4f] font-bold uppercase">MOP</div>
                            <div className="text-base font-extrabold text-[#1a1a1a] mt-0.5">{msg.card_payload.primary_recommendation.mop_kg} kg</div>
                            <div className="text-[10px] text-[#5c5c5c] font-semibold">({msg.card_payload.primary_recommendation.mop_50kg_bags} Bags)</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSaveCard(msg)}
                          className="w-full py-2.5 rounded-full mat-btn-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#c9a227]" />
                          <span>{savedId === msg.id ? '✓ Saved to Farm Advisory Sheet!' : t.save_prescription}</span>
                        </button>
                      </div>
                    )}

                    {/* Interactive Embedded Disease Card */}
                    {msg.card_type === 'disease_diagnosis_card' && msg.card_payload && (
                      <div className="bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] rounded-xl p-4 space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-2.5">
                          <span className="text-xs font-bold text-[#1b4332] flex items-center gap-1.5">
                            <Stethoscope className="w-4 h-4 text-[#2d6a4f]" />
                            Diagnosis: {msg.card_payload.disease_name_en}
                          </span>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1b4332]/10 text-[#1b4332] font-bold border border-[#1b4332]/20">
                            {msg.card_payload.confidence_score}% Match
                          </span>
                        </div>

                        <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2 font-medium">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>Pre-Harvest Safety Interval (PHI): Wait {msg.card_payload.safety_interval_phi_days} days after chemical spray.</span>
                        </div>

                        <button
                          onClick={() => handleSaveCard(msg)}
                          className="w-full py-2.5 rounded-full mat-btn-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#c9a227]" />
                          <span>{savedId === msg.id ? '✓ Saved to Farm Advisory Sheet!' : t.save_prescription}</span>
                        </button>
                      </div>
                    )}

                    {/* Message Actions Toolbar */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[rgba(0,0,0,0.06)] text-xs text-[#5c5c5c]">
                      <button
                        onClick={() => speakText(msg.spoken_transcript || msg.text, msg.id)}
                        className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 font-semibold text-[11px] ${
                          isSpeaking && currentSpeakingId === msg.id
                            ? 'text-[#1b4332] bg-[#1b4332]/10 border border-[#1b4332]/20'
                            : 'hover:text-[#1a1a1a] bg-[#fafaf8] hover:bg-slate-100 border border-[rgba(0,0,0,0.08)]'
                        }`}
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isSpeaking && currentSpeakingId === msg.id ? 'Playing...' : 'Speak'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="px-3 py-1 rounded-full bg-[#fafaf8] hover:bg-slate-100 text-[#5c5c5c] hover:text-[#1a1a1a] transition-colors flex items-center gap-1 font-semibold text-[11px] border border-[rgba(0,0,0,0.08)]"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#1b4332]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0 text-[#1b4332] font-bold text-xs shadow-xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Processing Animation */}
        {isProcessing && (
          <div className="max-w-3xl mx-auto flex gap-3 sm:gap-4 items-start">
            <div className="w-8 h-8 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center flex-shrink-0 animate-pulse shadow-sm">
              🌾
            </div>
            <div className="mat-card p-4 rounded-2xl rounded-tl-xs text-xs text-[#1a1a1a] flex items-center gap-3 font-semibold shadow-xs">
              <RefreshCw className="w-4 h-4 text-[#1b4332] animate-spin" />
              <div className="flex items-center gap-1">
                <span>AgriBot is analyzing with agronomy knowledge base</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Floating Input Capsule (MAT Global Style) */}
      <div className="p-4 sm:p-6 bg-gradient-to-t from-[#fafaf8] via-[#fafaf8]/90 to-transparent">
        <div className="max-w-3xl mx-auto space-y-2.5">
          {/* Attached Image Preview */}
          {attachedImage && (
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white border border-[#2d6a4f] shadow-xs w-fit">
              <ImageIcon className="w-4 h-4 text-[#2d6a4f]" />
              <span className="text-xs text-[#1a1a1a] font-semibold truncate max-w-[200px]">
                {attachedImage.name}
              </span>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 hover:text-rose-600 text-slate-400 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Voice Wave Animation when Recording */}
          {isListening && (
            <div className="p-3 rounded-full bg-white border border-[#2d6a4f] flex items-center justify-between shadow-md animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs text-[#1a1a1a] font-bold">{t.listening}</span>
              </div>
              <div className="flex items-center gap-1 h-5 mr-3">
                {audioWaves.map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-[#1b4332] rounded-full transition-all duration-100"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Input Box Pill Capsule */}
          <div className="relative flex items-center mat-input-capsule p-1.5 sm:p-2">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Attach Image Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-[#5c5c5c] hover:text-[#1b4332] rounded-full hover:bg-slate-100 transition-colors"
              title="Attach Leaf/Crop Photo"
            >
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Auto-expanding Input Area */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={t.input_placeholder}
              className="flex-1 bg-transparent text-[#1a1a1a] placeholder-[#5c5c5c] px-3 py-1.5 text-xs sm:text-sm resize-none focus:outline-none max-h-32 font-medium"
            />

            {/* Voice Mic Button */}
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-full transition-all ${
                isListening
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-[#5c5c5c] hover:text-[#1b4332] hover:bg-slate-100'
              }`}
              title={t.tap_to_speak}
            >
              {isListening ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSubmit()}
              disabled={(!inputText.trim() && !attachedImage) || isProcessing}
              className="p-2.5 rounded-full mat-btn-primary text-white disabled:opacity-30 transition-all ml-1 active:scale-95 shadow-md flex items-center justify-center"
              title={t.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
