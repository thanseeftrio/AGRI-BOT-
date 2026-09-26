import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  Sprout, 
  TrendingUp, 
  Droplets, 
  Calculator, 
  Plus,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CalculatorModal = ({
  isOpen,
  onClose,
  currentLanguage,
  onSavePrescription
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('npk'); // 'npk', 'seed', 'yield', 'irrigation'
  
  // Form States
  const [crop, setCrop] = useState('paddy');
  const [areaValue, setAreaValue] = useState(2.0);
  const [areaUnit, setAreaUnit] = useState('acre');
  const [resultData, setResultData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    setResultData(null);
    setSavedSuccess(false);

    try {
      let endpoint = '/api/agent/calculate/npk';
      let payload = { crop_name: crop, area_value: parseFloat(areaValue), area_unit: areaUnit };

      if (activeTab === 'seed') {
        endpoint = '/api/agent/calculate/seed';
      } else if (activeTab === 'yield') {
        endpoint = '/api/agent/calculate/yield';
      } else if (activeTab === 'irrigation') {
        endpoint = '/api/agent/calculate/irrigation';
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Calculation failed');
      const data = await res.json();
      setResultData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = () => {
    if (!resultData) return;
    if (activeTab === 'npk') {
      const p = resultData.primary_recommendation;
      onSavePrescription({
        id: Date.now(),
        title: `NPK Fertilizer Plan: ${resultData.crop_name} (${areaValue} ${areaUnit})`,
        crop_name: resultData.crop_name,
        fertilizer_summary: `DAP: ${p.dap_kg}kg (${p.dap_50kg_bags} bags) | Urea: ${p.urea_kg}kg (${p.urea_50kg_bags} bags) | MOP: ${p.mop_kg}kg (${p.mop_50kg_bags} bags) - Est Cost: ₹${p.total_chemical_cost_inr}`,
        timestamp: new Date().toLocaleString()
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fafaf8] border border-stone-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center border border-[#c8e6c9] shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="mat-eyebrow flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#c9a227]" />
                Precision Arithmetic
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1b4332] tracking-tight">
                Agronomic Calculator Suite
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (MAT Global Pill Tabs) */}
        <div className="flex bg-[#f4f4f0] p-2 gap-1.5 border-b border-stone-200/60 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('npk'); setResultData(null); }}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'npk'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>NPK Fertilizer Dosage</span>
          </button>

          <button
            onClick={() => { setActiveTab('seed'); setResultData(null); }}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'seed'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Seed & Spacing</span>
          </button>

          <button
            onClick={() => { setActiveTab('yield'); setResultData(null); }}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'yield'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Yield & Revenue</span>
          </button>

          <button
            onClick={() => { setActiveTab('irrigation'); setResultData(null); }}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'irrigation'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Drip Irrigation</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <div className="lg:col-span-5 space-y-4 mat-card p-5">
            <div className="mat-eyebrow">Input Field Parameters</div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">Target Crop:</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#2d6a4f] shadow-xs"
              >
                <option value="paddy">Paddy / Rice (ಬತ್ತ / धान)</option>
                <option value="arecanut">Areca Nut / Betel (ಅಡಿಕೆ / सुपारी)</option>
                <option value="coconut">Coconut (ತೆಂಗು / नारियल)</option>
                <option value="maize">Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)</option>
                <option value="tomato">Tomato (ಟೊಮೇಟೊ / टमाटर)</option>
                <option value="cotton">Cotton (ಹತ್ತಿ / कपास)</option>
                <option value="wheat">Wheat (ಗೋಧಿ / गेहूं)</option>
                <option value="chilli">Chilli / Red Pepper (ಮೆಣಸಿನಕಾಯಿ / मिर्च)</option>
                <option value="pepper">Black Pepper (ಕಾಳುಮೆಣಸು / काली मिर्च)</option>
                <option value="sugarcane">Sugarcane (ಕಬ್ಬು / गन्ना)</option>
                <option value="banana">Banana (ಬಾಳೆ / केला)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">Land Area:</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={areaValue}
                  onChange={(e) => setAreaValue(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#2d6a4f] shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">Unit:</label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#2d6a4f] shadow-xs"
                >
                  <option value="acre">Acres (ಎಕರೆ)</option>
                  <option value="gunta">Guntas (ಗುಂಟೆ)</option>
                  <option value="hectare">Hectares (ಹೆಕ್ಟೇರ್)</option>
                  <option value="cent">Cents (ಸೆಂಟ್ಸ್)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-2.5 rounded-full mat-btn-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Calculator className="w-4 h-4" />
              <span>{isCalculating ? 'Computing Arithmetic...' : 'Calculate Precision Agronomy'}</span>
            </button>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-7 space-y-4">
            {!resultData && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-stone-300 rounded-2xl">
                <FlaskConical className="w-12 h-12 text-stone-300 mb-3" />
                <h3 className="font-bold text-sm text-stone-800">No Calculation Run Yet</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm font-medium">
                  Select your crop and land size on the left, then click "Calculate Precision Agronomy" to see exact kg, bag counts, or revenue metrics.
                </p>
              </div>
            )}

            {resultData && activeTab === 'npk' && (
              <div className="mat-card p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                  <div>
                    <div className="mat-eyebrow">Calculated NPK Ratio</div>
                    <h3 className="font-bold text-base text-[#1b4332]">
                      🧪 NPK Dosage for {resultData.crop_name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">Area: {resultData.area_requested}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1b4332] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#c8e6c9]">
                      Est. Cost: ₹{resultData.primary_recommendation.total_chemical_cost_inr}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] uppercase font-bold text-stone-500">DAP</div>
                    <div className="text-lg font-black text-[#1b4332] mt-0.5">
                      {resultData.primary_recommendation.dap_kg} <span className="text-xs font-normal">kg</span>
                    </div>
                    <div className="text-[11px] text-[#2d6a4f] font-bold">
                      {resultData.primary_recommendation.dap_50kg_bags} Bags
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] uppercase font-bold text-stone-500">Urea</div>
                    <div className="text-lg font-black text-[#1b4332] mt-0.5">
                      {resultData.primary_recommendation.urea_kg} <span className="text-xs font-normal">kg</span>
                    </div>
                    <div className="text-[11px] text-[#2d6a4f] font-bold">
                      {resultData.primary_recommendation.urea_50kg_bags} Bags
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] uppercase font-bold text-stone-500">MOP</div>
                    <div className="text-lg font-black text-[#1b4332] mt-0.5">
                      {resultData.primary_recommendation.mop_kg} <span className="text-xs font-normal">kg</span>
                    </div>
                    <div className="text-[11px] text-[#2d6a4f] font-bold">
                      {resultData.primary_recommendation.mop_50kg_bags} Bags
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbfbfa] text-xs text-stone-700 space-y-1 font-medium border border-stone-200/80">
                  <div className="font-bold text-[#1b4332] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
                    Organic Basal Dressing Recommendations:
                  </div>
                  <div>Farmyard Manure (FYM): {resultData.organic_supplements.farmyard_manure_tons} Tons</div>
                  <div>Vermicompost: {resultData.organic_supplements.vermicompost_kg} kg</div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-2.5 px-4 rounded-full bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#1b4332] text-xs font-bold flex items-center justify-center gap-2 border border-[#c8e6c9] transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 text-[#2d6a4f]" />
                  <span>{savedSuccess ? '✓ Saved to Farm Prescription!' : 'Save Formulation to Farm Prescription'}</span>
                </button>
              </div>
            )}

            {resultData && activeTab === 'seed' && (
              <div className="mat-card p-5 space-y-4">
                <div>
                  <div className="mat-eyebrow">Plant Spacing Blueprint</div>
                  <h3 className="font-bold text-base text-[#1b4332]">
                    🌾 Seed & Spacing Blueprint for {resultData.crop_name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs text-stone-600 font-bold">Total Seed Required:</div>
                    <div className="text-xl font-extrabold text-[#1b4332] mt-1">
                      {resultData.total_seed_required_kg} kg
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs text-stone-600 font-bold">Target Plant Population:</div>
                    <div className="text-xl font-extrabold text-[#1b4332] mt-1">
                      {resultData.estimated_plant_population.total_field_plants.toLocaleString()} plants
                    </div>
                  </div>
                </div>

                <div className="text-xs text-stone-700 space-y-1.5 bg-[#fbfbfa] p-3.5 rounded-xl border border-stone-200/80 font-medium">
                  <div><strong>Row-to-Row:</strong> {resultData.recommended_spacing.row_to_row}</div>
                  <div><strong>Plant-to-Plant:</strong> {resultData.recommended_spacing.plant_to_plant}</div>
                  <div className="mt-2 text-stone-500 font-normal"><strong>Seed Treatment:</strong> {resultData.seed_treatment_protocol}</div>
                </div>
              </div>
            )}

            {resultData && activeTab === 'yield' && (
              <div className="mat-card p-5 space-y-4">
                <div>
                  <div className="mat-eyebrow">Revenue & Profit Forecast</div>
                  <h3 className="font-bold text-base text-[#1b4332]">
                    💰 Harvest & Revenue Forecast for {resultData.crop_name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Yield</div>
                    <div className="text-base font-extrabold text-[#c9a227] mt-1">{resultData.projected_yield.total_quintals} Q</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Gross Revenue</div>
                    <div className="text-base font-extrabold text-[#1b4332] mt-1">₹{resultData.economics.projected_gross_revenue_inr.toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Cost</div>
                    <div className="text-base font-extrabold text-stone-700 mt-1">₹{resultData.economics.estimated_production_cost_inr.toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Net Profit</div>
                    <div className="text-base font-extrabold text-[#2d6a4f] mt-1">₹{resultData.economics.estimated_net_profit_inr.toLocaleString()} ({resultData.economics.return_on_investment_roi_pct}%)</div>
                  </div>
                </div>
              </div>
            )}

            {resultData && activeTab === 'irrigation' && (
              <div className="mat-card p-5 space-y-4">
                <div>
                  <div className="mat-eyebrow">Hydrological Balance</div>
                  <h3 className="font-bold text-base text-[#1b4332]">
                    💧 Drip Irrigation Requirement for {resultData.crop_name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs text-stone-600 font-bold">Water Needed:</div>
                    <div className="text-xl font-extrabold text-[#1b4332] mt-1">
                      {resultData.irrigation_demand.total_water_litres.toLocaleString()} Litres
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs text-stone-600 font-bold">5 HP Pump Runtime:</div>
                    <div className="text-xl font-extrabold text-[#1b4332] mt-1">
                      {resultData.pump_runtime_estimate_hours?.['5hp_pump_hours']} Hours
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

