import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Stethoscope, 
  FlaskConical, 
  Leaf, 
  Trash2, 
  X,
  Globe,
  Cpu,
  Cloud,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const Sidebar = ({
  isOpen,
  onClose,
  currentLanguage,
  setLanguage,
  agentMode,
  setAgentMode,
  chatSessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onOpenPrescriptions,
  savedPrescriptionsCount,
  onOpenLeafDoctor,
  onOpenCalculator
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.english;

  const languages = [
    { code: 'kannada', label: 'ಕನ್ನಡ' },
    { code: 'hindi', label: 'हिन्दी' },
    { code: 'english', label: 'English' },
    { code: 'telugu', label: 'తెలుగు' },
    { code: 'tamil', label: 'தமிழ்' },
    { code: 'marathi', label: 'मराठी' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* MAT Global Traders Style Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 mat-sidebar flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center font-black text-base shadow-sm">
              🌾
            </div>
            <div>
              <h1 className="font-bold text-sm text-[#1a1a1a] tracking-tight flex items-center gap-1.5">
                <span>{t.app_name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b4332]/10 text-[#1b4332] font-bold border border-[#1b4332]/20">PRO</span>
              </h1>
              <p className="text-[11px] text-[#5c5c5c] truncate max-w-[170px] font-medium">Agricultural AI Advisory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Consultation Button (MAT Primary Pill) */}
        <div className="p-4">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full py-3 px-4 mat-btn-primary text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>{t.new_chat}</span>
          </button>
        </div>

        {/* Agricultural Intelligence Tools */}
        <div className="px-4 py-2 border-b border-[rgba(0,0,0,0.08)] space-y-2">
          <div className="mat-eyebrow px-1">
            Agronomy Tools
          </div>
          
          <button
            onClick={() => {
              onOpenLeafDoctor();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#1a1a1a] bg-white hover:bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] hover:border-[#2d6a4f] shadow-xs transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="flex-1 truncate">Crop Leaf Doctor (Photo AI)</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              onOpenCalculator();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#1a1a1a] bg-white hover:bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] hover:border-[#2d6a4f] shadow-xs transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#c9a227]/15 text-[#c9a227] flex items-center justify-center group-hover:scale-105 transition-transform font-bold">
              <FlaskConical className="w-4 h-4 text-[#1b4332]" />
            </div>
            <span className="flex-1 truncate">NPK & Seed Calculator</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              onOpenPrescriptions();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#1a1a1a] bg-white hover:bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] hover:border-[#2d6a4f] shadow-xs transition-all text-left group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-7 h-7 rounded-lg bg-[#1b4332]/10 text-[#1b4332] flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <span className="truncate">{t.saved_prescriptions}</span>
            </div>
            {savedPrescriptionsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#c9a227] text-[#0d2818] font-bold shadow-xs">
                {savedPrescriptionsCount}
              </span>
            )}
          </button>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          <div className="mat-eyebrow px-1 my-1">
            {t.recent_chats}
          </div>

          {chatSessions.length === 0 ? (
            <div className="text-xs text-[#5c5c5c] px-3 py-4 text-center">
              No recent consultations
            </div>
          ) : (
            chatSessions.map((session) => {
              const isSelected = session.id === currentSessionId;
              return (
                <div
                  key={session.id}
                  className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#1b4332] font-bold shadow-xs border border-[#1b4332]/30'
                      : 'text-[#5c5c5c] hover:text-[#1a1a1a] hover:bg-white/80'
                  }`}
                  onClick={() => {
                    onSelectSession(session.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  <div className="flex items-center gap-2.5 truncate pr-6">
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#1b4332]' : 'text-slate-400'}`} />
                    <span className="truncate">{session.title || 'New Consultation'}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-600 text-slate-400 transition-opacity rounded"
                    title="Delete Chat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Language & Mode Settings */}
        <div className="p-4 border-t border-[rgba(0,0,0,0.08)] bg-white space-y-3">
          {/* Language Selector */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#5c5c5c] font-semibold mb-1.5 px-1">
              <span className="flex items-center gap-1.5 text-[#1b4332]">
                <Globe className="w-3.5 h-3.5" />
                Language
              </span>
              <span className="text-[#1b4332] font-bold">{t.lang_name}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold transition-all text-center truncate ${
                    currentLanguage === l.code
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'bg-[#fafaf8] text-[#5c5c5c] hover:text-[#1a1a1a] hover:bg-slate-100 border border-[rgba(0,0,0,0.08)]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Engine Mode Toggle */}
          <div className="pt-2 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between text-xs">
            <span className="text-[#5c5c5c] text-[11px] font-semibold">Engine:</span>
            <div className="flex items-center bg-[#fafaf8] p-0.5 rounded-full border border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => setAgentMode('edge')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  agentMode === 'edge'
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'text-[#5c5c5c] hover:text-[#1a1a1a]'
                }`}
                title="Fast On-Device Edge Engine"
              >
                <Cpu className="w-3 h-3" />
                Edge
              </button>
              <button
                onClick={() => setAgentMode('cloud')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  agentMode === 'cloud'
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'text-[#5c5c5c] hover:text-[#1a1a1a]'
                }`}
                title="High-Capacity Cloud Agronomy LLM"
              >
                <Cloud className="w-3 h-3" />
                Cloud
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
