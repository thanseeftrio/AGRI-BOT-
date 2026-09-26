import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Leaf, 
  FlaskConical, 
  Plus, 
  CheckCircle2, 
  RefreshCw,
  Award,
  Stethoscope
} from 'lucide-react';
import { SAMPLE_CROPS } from '../data/sampleCrops';

export const LeafDoctorModal = ({
  isOpen,
  onClose,
  currentLanguage,
  agentMode,
  onSavePrescription
}) => {
  if (!isOpen) return null;

  const [selectedCrop, setSelectedCrop] = useState('paddy');
  const [selectedSample, setSelectedSample] = useState(SAMPLE_CROPS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [activeTab, setActiveTab] = useState('organic'); // 'organic' or 'chemical'
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleScan = async (sample = selectedSample) => {
    setIsScanning(true);
    setDiagnosticResult(null);
    setSavedSuccess(false);

    try {
      const response = await fetch('/api/agent/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          image_name: sample.image_filename,
          crop_hint: sample.crop_id,
          mode: agentMode
        })
      });

      if (!response.ok) throw new Error('Diagnosis failed');
      const data = await response.json();
      setDiagnosticResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToSheet = () => {
    if (!diagnosticResult) return;
    onSavePrescription({
      id: Date.now(),
      title: `${diagnosticResult.crop.toUpperCase()}: ${diagnosticResult.disease_name_en}`,
      crop_name: diagnosticResult.crop,
      disease_name: diagnosticResult.disease_name_en,
      severity: diagnosticResult.severity_level,
      foliar_damage: diagnosticResult.foliar_damage_percentage,
      chemical_remedy: diagnosticResult.chemical_remedy,
      organic_remedy: diagnosticResult.organic_remedy,
      phi_days: diagnosticResult.safety_interval_phi_days,
      timestamp: new Date().toLocaleString()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fafaf8] border border-[rgba(0,0,0,0.08)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 bg-white border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#c9a227] flex items-center justify-center font-bold text-sm shadow-sm">
              <Stethoscope className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div>
              <p className="mat-eyebrow" style={{ margin: 0 }}>Visual Agronomy Diagnostic Desk</p>
              <h2 className="text-base sm:text-lg font-bold text-[#1a1a1a] tracking-tight">
                Crop Leaf Doctor & Disease Scanner
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#1a1a1a] hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sample Leaves & Upload */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1a1a1a] block mb-2">
                1. Select a Sample Crop Leaf to Test:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_CROPS.map((sample) => {
                  const isSelected = selectedSample.id === sample.id;
                  return (
                    <button
                      key={sample.id}
                      onClick={() => {
                        setSelectedSample(sample);
                        setSelectedCrop(sample.crop_id);
                        handleScan(sample);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white border-[#1b4332] text-[#1b4332] shadow-sm font-semibold'
                          : 'bg-white border-[rgba(0,0,0,0.08)] text-[#5c5c5c] hover:border-slate-300 hover:text-[#1a1a1a]'
                      }`}
                    >
                      <div className="text-xl mb-1">{sample.crop_icon}</div>
                      <div className="font-bold text-xs text-[#1a1a1a] truncate">{sample.crop_name}</div>
                      <div className="text-[10px] text-[#5c5c5c] truncate font-medium">{sample.suspected_disease}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Viewfinder Preview Box */}
            <div className="relative aspect-video sm:aspect-square bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center p-4 shadow-sm">
              <div className="text-center space-y-2">
                <div className="text-5xl">{selectedSample.crop_icon}</div>
                <div className="font-bold text-sm text-[#1a1a1a]">{selectedSample.crop_name}</div>
                <div className="text-xs text-[#1b4332] font-mono bg-[#1b4332]/10 px-2.5 py-0.5 rounded-full inline-block border border-[#1b4332]/20 font-semibold">
                  {selectedSample.image_filename}
                </div>
              </div>

              {/* Laser Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-[#1b4332]/15 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-[#1b4332] shadow-[0_0_15px_#2d6a4f] animate-bounce" />
                  <span className="text-xs font-bold text-white mt-4 bg-[#1b4332] px-3.5 py-1 rounded-full shadow-md">
                    Running Spectral Foliar Analysis...
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleScan(selectedSample)}
              disabled={isScanning}
              className="w-full py-3 rounded-full mat-btn-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
              <span>{isScanning ? 'Diagnosing Foliage...' : 'Run Visual Pathology Scan'}</span>
            </button>
          </div>

          {/* Right Column: Diagnostic Results */}
          <div className="lg:col-span-7 space-y-4">
            {!diagnosticResult && !isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl">
                <Leaf className="w-12 h-12 text-[#2d6a4f]/30 mb-3" />
                <h3 className="font-bold text-sm text-[#1a1a1a]">No Leaf Scanned Yet</h3>
                <p className="text-xs text-[#5c5c5c] mt-1 max-w-sm">
                  Select a crop leaf sample on the left or tap "Run Visual Pathology Scan" to perform multi-spectral diagnosis.
                </p>
              </div>
            )}

            {isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl space-y-3">
                <RefreshCw className="w-8 h-8 text-[#1b4332] animate-spin" />
                <div className="text-sm font-bold text-[#1a1a1a]">Analyzing Leaf Pathology...</div>
                <div className="text-xs text-[#5c5c5c]">Classifying lesions, pathogen type, and calculating safety intervals.</div>
              </div>
            )}

            {diagnosticResult && (
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-5 space-y-4 shadow-sm">
                {/* Header Metrics */}
                <div className="flex items-start justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1b4332]/10 text-[#1b4332]">
                      {diagnosticResult.crop.toUpperCase()} • {diagnosticResult.pathogen_type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mt-1">
                      {diagnosticResult.disease_name_en}
                    </h3>
                    {diagnosticResult.disease_name_kn && (
                      <p className="text-xs text-[#2d6a4f] font-semibold">
                        {diagnosticResult.disease_name_kn}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-[#1b4332]">
                      {diagnosticResult.confidence_score}% Confidence
                    </div>
                    <div className="text-[11px] text-[#5c5c5c] font-medium">
                      Damage: <span className="text-rose-600 font-bold">{diagnosticResult.foliar_damage_percentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Symptoms Description */}
                <div className="text-xs text-[#1a1a1a] bg-[#fafaf8] p-3.5 rounded-xl border border-[rgba(0,0,0,0.08)] leading-relaxed font-medium">
                  <strong className="text-[#1b4332]">Observed Symptoms:</strong> {diagnosticResult.symptoms_observed}
                </div>

                {/* Remedies Tabs */}
                <div>
                  <div className="flex border-b border-[rgba(0,0,0,0.06)] mb-3 gap-2">
                    <button
                      onClick={() => setActiveTab('organic')}
                      className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 ${
                        activeTab === 'organic'
                          ? 'border-[#1b4332] text-[#1b4332]'
                          : 'border-transparent text-[#5c5c5c] hover:text-[#1a1a1a]'
                      }`}
                    >
                      🌿 Organic Remedy
                    </button>
                    <button
                      onClick={() => setActiveTab('chemical')}
                      className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 ${
                        activeTab === 'chemical'
                          ? 'border-rose-600 text-rose-800'
                          : 'border-transparent text-[#5c5c5c] hover:text-[#1a1a1a]'
                      }`}
                    >
                      🧪 Chemical Spray & PHI
                    </button>
                  </div>

                  {activeTab === 'organic' ? (
                    <ul className="space-y-2 text-xs text-[#1a1a1a]">
                      {diagnosticResult.organic_remedy.map((rem, i) => (
                        <li key={i} className="flex items-start gap-2 bg-[#fafaf8] p-2.5 rounded-lg border border-[rgba(0,0,0,0.08)] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] flex-shrink-0 mt-0.5" />
                          <span>{rem}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-2">
                      <ul className="space-y-2 text-xs text-[#1a1a1a]">
                        {diagnosticResult.chemical_remedy.map((rem, i) => (
                          <li key={i} className="flex items-start gap-2 bg-rose-50/70 p-2.5 rounded-lg border border-rose-100 font-medium">
                            <FlaskConical className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span>{rem}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2 font-medium">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>
                          <strong>Pre-Harvest Safety Interval (PHI):</strong> Wait at least <strong>{diagnosticResult.safety_interval_phi_days} days</strong> after spraying before harvesting.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save to Prescription Button */}
                <button
                  onClick={handleSaveToSheet}
                  className="w-full py-2.5 px-4 rounded-full mat-btn-primary text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 text-[#c9a227]" />
                  <span>{savedSuccess ? '✓ Saved to Farm Prescription Sheet!' : 'Save Diagnosis to Farm Prescription'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
