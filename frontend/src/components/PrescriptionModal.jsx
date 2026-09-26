import React from 'react';
import { 
  X, 
  Printer, 
  Trash2, 
  FileText, 
  Leaf, 
  ShieldCheck, 
  Calendar, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const PrescriptionModal = ({
  isOpen,
  onClose,
  prescriptions,
  onClearPrescriptions,
  onRemovePrescription,
  currentLanguage
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.english;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center font-bold text-sm shadow-sm">
              🌾
            </div>
            <div>
              <p className="mat-eyebrow" style={{ margin: 0 }}>Official Field Documentation</p>
              <h2 className="text-base sm:text-lg font-bold text-[#1a1a1a] tracking-tight">
                Farm Advisory & Prescription Slip
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {prescriptions.length > 0 && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full mat-btn-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#1a1a1a] hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Content Stream */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 printable-area">
          {prescriptions.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] mx-auto flex items-center justify-center text-[#1b4332]">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-sm text-[#1a1a1a] font-bold">
                {t.no_prescriptions}
              </p>
              <p className="text-xs text-[#5c5c5c] max-w-md mx-auto leading-relaxed">
                During your chat with AgriBot, click the <strong>"Save Prescription"</strong> button on any fertilizer calculation or disease diagnosis card to compile your advisory sheet here.
              </p>
            </div>
          ) : (
            prescriptions.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-5 relative group hover:border-[#1b4332]/40 shadow-xs transition-all"
              >
                <div className="flex items-start justify-between border-b border-[rgba(0,0,0,0.06)] pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1b4332]/10 text-[#1b4332]">
                        Rx #{index + 1}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a]">
                        {item.title || item.crop_name || 'Agronomy Prescription'}
                      </h3>
                    </div>
                    <div className="text-[11px] text-[#5c5c5c] flex items-center gap-1.5 mt-1 font-medium">
                      <Calendar className="w-3 h-3 text-[#5c5c5c]" />
                      {item.timestamp || new Date().toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemovePrescription(item.id || index)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-80 hover:opacity-100 transition-opacity no-print"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Details */}
                <div className="text-xs sm:text-sm text-[#1a1a1a] space-y-2.5">
                  {item.disease_name && (
                    <div className="p-3 rounded-lg bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] text-[#1a1a1a] font-medium">
                      <strong className="text-[#1b4332]">🩺 Diagnosis:</strong> {item.disease_name} (Severity: {item.severity || 'Moderate'})
                    </div>
                  )}

                  {item.chemical_remedy && (
                    <div>
                      <span className="font-bold text-[#1b4332]">🧪 Recommended Spray & Dosage:</span>
                      <div className="mt-1 text-[#5c5c5c] whitespace-pre-line text-xs pl-3 border-l-2 border-[#1b4332] font-medium">
                        {Array.isArray(item.chemical_remedy) ? item.chemical_remedy.join('\n') : item.chemical_remedy}
                      </div>
                    </div>
                  )}

                  {item.organic_remedy && (
                    <div>
                      <span className="font-bold text-[#2d6a4f]">🌿 Organic & Biological Alternative:</span>
                      <div className="mt-1 text-[#5c5c5c] whitespace-pre-line text-xs pl-3 border-l-2 border-[#2d6a4f] font-medium">
                        {Array.isArray(item.organic_remedy) ? item.organic_remedy.join('\n') : item.organic_remedy}
                      </div>
                    </div>
                  )}

                  {item.fertilizer_summary && (
                    <div>
                      <span className="font-bold text-[#c9a227]">🧪 Fertilizer Formulations:</span>
                      <p className="mt-1 text-[#5c5c5c] text-xs pl-3 border-l-2 border-[#c9a227] font-medium">
                        {item.fertilizer_summary}
                      </p>
                    </div>
                  )}

                  {item.phi_days && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
                      Pre-Harvest Safety Interval (PHI): Wait {item.phi_days} days after chemical spray before harvesting.
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {prescriptions.length > 0 && (
          <div className="p-4 bg-white border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between text-xs text-[#5c5c5c] no-print">
            <button
              onClick={onClearPrescriptions}
              className="text-rose-600 hover:text-rose-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear all prescriptions
            </button>
            <span className="font-semibold">Total Prescriptions: {prescriptions.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};
