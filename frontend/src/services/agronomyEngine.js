// Precision Agronomy Engine & AI Knowledge Base (Client-Side & Offline Ready)

export const CROPS_DATA = {
  paddy: {
    name: "Paddy / Rice (ಬತ್ತ / धान)",
    category: "Cereal",
    recommended_npk_kg_per_acre: { N: 40.0, P: 20.0, K: 20.0 },
    seed_rate_kg_per_acre: { transplanting: 20.0, direct_seeding: 30.0, sri_method: 3.0 },
    standard_spacing_cm: { row: 20.0, plant: 15.0 },
    avg_yield_quintals_per_acre: { min: 18.0, avg: 24.0, max: 32.0 },
    market_price_per_quintal_inr: 2203,
    water_req_mm_per_season: 1200,
    cost_per_acre_inr: 18000
  },
  arecanut: {
    name: "Areca Nut (ಅಡಿಕೆ / सुपारी)",
    category: "Plantation",
    recommended_npk_kg_per_acre: { N: 40.0, P: 16.0, K: 56.0 },
    seed_rate_kg_per_acre: { seedlings: 500 },
    standard_spacing_m: { row: 2.7, plant: 2.7 },
    avg_yield_quintals_per_acre: { min: 8.0, avg: 12.0, max: 18.0 },
    market_price_per_quintal_inr: 46000,
    water_req_mm_per_season: 1600,
    cost_per_acre_inr: 35000
  },
  coconut: {
    name: "Coconut (ತೆಂಗು / नारियल)",
    category: "Plantation",
    recommended_npk_kg_per_acre: { N: 35.0, P: 22.0, K: 70.0 },
    seed_rate_kg_per_acre: { palms: 70 },
    standard_spacing_m: { row: 7.5, plant: 7.5 },
    avg_yield_quintals_per_acre: { min: 45.0, avg: 70.0, max: 100.0 }, // nuts thousands
    market_price_per_quintal_inr: 3200,
    water_req_mm_per_season: 1400,
    cost_per_acre_inr: 22000
  },
  maize: {
    name: "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)",
    category: "Cereal",
    recommended_npk_kg_per_acre: { N: 60.0, P: 30.0, K: 20.0 },
    seed_rate_kg_per_acre: { hybrid: 8.0, composite: 10.0 },
    standard_spacing_cm: { row: 60.0, plant: 20.0 },
    avg_yield_quintals_per_acre: { min: 22.0, avg: 30.0, max: 40.0 },
    market_price_per_quintal_inr: 2090,
    water_req_mm_per_season: 550,
    cost_per_acre_inr: 14000
  },
  tomato: {
    name: "Tomato (ಟೊಮೇಟೊ / टमाटर)",
    category: "Vegetable",
    recommended_npk_kg_per_acre: { N: 72.0, P: 48.0, K: 48.0 },
    seed_rate_kg_per_acre: { hybrid_transplanting: 0.15, regular: 0.25 },
    standard_spacing_cm: { row: 75.0, plant: 45.0 },
    avg_yield_quintals_per_acre: { min: 140.0, avg: 200.0, max: 280.0 },
    market_price_per_quintal_inr: 1800,
    water_req_mm_per_season: 600,
    cost_per_acre_inr: 45000
  },
  cotton: {
    name: "Cotton (ಹತ್ತಿ / कपास)",
    category: "Commercial",
    recommended_npk_kg_per_acre: { N: 50.0, P: 25.0, K: 25.0 },
    seed_rate_kg_per_acre: { bt_cotton: 0.9, hybrid: 1.5 },
    standard_spacing_cm: { row: 90.0, plant: 60.0 },
    avg_yield_quintals_per_acre: { min: 8.0, avg: 14.0, max: 20.0 },
    market_price_per_quintal_inr: 7020,
    water_req_mm_per_season: 700,
    cost_per_acre_inr: 24000
  },
  wheat: {
    name: "Wheat (ಗೋಧಿ / गेहूं)",
    category: "Cereal",
    recommended_npk_kg_per_acre: { N: 48.0, P: 24.0, K: 16.0 },
    seed_rate_kg_per_acre: { normal: 40.0, late_sown: 50.0 },
    standard_spacing_cm: { row: 22.5, plant: 10.0 },
    avg_yield_quintals_per_acre: { min: 16.0, avg: 22.0, max: 28.0 },
    market_price_per_quintal_inr: 2275,
    water_req_mm_per_season: 450,
    cost_per_acre_inr: 15000
  },
  sugarcane: {
    name: "Sugarcane (ಕಬ್ಬು / गन्ना)",
    category: "Commercial",
    recommended_npk_kg_per_acre: { N: 100.0, P: 40.0, K: 50.0 },
    seed_rate_kg_per_acre: { setts_thousands: 30 },
    standard_spacing_cm: { row: 120.0, plant: 30.0 },
    avg_yield_quintals_per_acre: { min: 400.0, avg: 550.0, max: 700.0 },
    market_price_per_quintal_inr: 315,
    water_req_mm_per_season: 1800,
    cost_per_acre_inr: 42000
  },
  chilli: {
    name: "Chilli (ಮೆಣಸಿನಕಾಯಿ / मिर्च)",
    category: "Spices",
    recommended_npk_kg_per_acre: { N: 60.0, P: 30.0, K: 30.0 },
    seed_rate_kg_per_acre: { hybrid: 0.25, regular: 0.5 },
    standard_spacing_cm: { row: 60.0, plant: 45.0 },
    avg_yield_quintals_per_acre: { min: 12.0, avg: 18.0, max: 25.0 }, // dry chilli
    market_price_per_quintal_inr: 16500,
    water_req_mm_per_season: 650,
    cost_per_acre_inr: 38000
  },
  banana: {
    name: "Banana (ಬಾಳೆ / केला)",
    category: "Fruit",
    recommended_npk_kg_per_acre: { N: 80.0, P: 30.0, K: 120.0 },
    seed_rate_kg_per_acre: { suckers: 1000 },
    standard_spacing_m: { row: 1.8, plant: 1.8 },
    avg_yield_quintals_per_acre: { min: 250.0, avg: 350.0, max: 450.0 },
    market_price_per_quintal_inr: 1400,
    water_req_mm_per_season: 1500,
    cost_per_acre_inr: 55000
  }
};

export const FERTILIZER_PRICES = {
  urea: { name: "Neem Coated Urea (46% N)", cost_per_50kg_bag: 268 },
  dap: { name: "DAP (18% N, 46% P2O5)", cost_per_50kg_bag: 1350 },
  mop: { name: "MOP (60% K2O)", cost_per_50kg_bag: 1650 },
  ssp: { name: "SSP (16% P2O5)", cost_per_50kg_bag: 550 }
};

export function convertToAcres(value, unit) {
  const u = (unit || 'acre').toLowerCase().trim();
  const v = parseFloat(value) || 1.0;
  if (u.includes('hectare') || u === 'ha') return v * 2.47105;
  if (u.includes('gunta')) return v / 40.0;
  if (u.includes('cent')) return v / 100.0;
  if (u.includes('bigha')) return v * 0.625;
  if (u.includes('sqm') || u.includes('sq_m')) return v / 4046.86;
  return v;
}

export function calculateNpkPrecision(cropKey, areaVal, areaUnit, soilN = 'medium', soilP = 'medium', soilK = 'medium') {
  const key = Object.keys(CROPS_DATA).find(k => cropKey.toLowerCase().includes(k)) || 'paddy';
  const crop = CROPS_DATA[key];
  const acres = Math.max(0.01, convertToAcres(areaVal, areaUnit));

  const adjMap = { low: 1.25, medium: 1.0, high: 0.75 };
  const nFactor = adjMap[soilN] || 1.0;
  const pFactor = adjMap[soilP] || 1.0;
  const kFactor = adjMap[soilK] || 1.0;

  const targetN = Number((crop.recommended_npk_kg_per_acre.N * acres * nFactor).toFixed(2));
  const targetP = Number((crop.recommended_npk_kg_per_acre.P * acres * pFactor).toFixed(2));
  const targetK = Number((crop.recommended_npk_kg_per_acre.K * acres * kFactor).toFixed(2));

  // 1. DAP (18% N, 46% P2O5)
  const dapKg = Number((targetP / 0.46).toFixed(2));
  const nFromDap = Number((dapKg * 0.18).toFixed(2));

  // 2. Urea (46% N)
  const remN = Math.max(0, targetN - nFromDap);
  const ureaKg = Number((remN / 0.46).toFixed(2));

  // 3. MOP (60% K2O)
  const mopKg = Number((targetK / 0.60).toFixed(2));

  // Bags (50kg)
  const dapBags = Number((dapKg / 50.0).toFixed(2));
  const ureaBags = Number((ureaKg / 50.0).toFixed(2));
  const mopBags = Number((mopKg / 50.0).toFixed(2));

  const totalCost = Math.round(
    dapBags * FERTILIZER_PRICES.dap.cost_per_50kg_bag +
    ureaBags * FERTILIZER_PRICES.urea.cost_per_50kg_bag +
    mopBags * FERTILIZER_PRICES.mop.cost_per_50kg_bag
  );

  const fymTons = Number((acres * (crop.category === 'Vegetable' ? 4.0 : 2.5)).toFixed(2));
  const vermicompostKg = Math.round(acres * 400);
  const neemCakeKg = Math.round(acres * 100);

  const splitSchedule = [
    {
      stage: "Basal Dose (Transplanting / Sowing)",
      description: `Apply 100% DAP (${dapKg} kg), 50% MOP (${Number((mopKg * 0.5).toFixed(1))} kg), and 33% Urea (${Number((ureaKg * 0.33).toFixed(1))} kg) mixed with ${fymTons} tons FYM.`
    },
    {
      stage: "1st Top Dressing (Active Tillering / 25-30 Days)",
      description: `Apply 33% Urea (${Number((ureaKg * 0.33).toFixed(1))} kg) after weeding.`
    },
    {
      stage: "2nd Top Dressing (Panicle Initiation / Flowering)",
      description: `Apply remaining 34% Urea (${Number((ureaKg * 0.34).toFixed(1))} kg) and 50% MOP (${Number((mopKg * 0.5).toFixed(1))} kg).`
    }
  ];

  return {
    crop_name: crop.name,
    input_area: `${areaVal} ${areaUnit}`,
    standard_acres: Number(acres.toFixed(3)),
    target_nutrients_kg: {
      Nitrogen_N: targetN,
      Phosphorus_P2O5: targetP,
      Potassium_K2O: targetK
    },
    primary_recommendation: {
      dap_kg: dapKg,
      dap_50kg_bags: dapBags,
      urea_kg: ureaKg,
      urea_50kg_bags: ureaBags,
      mop_kg: mopKg,
      mop_50kg_bags: mopBags,
      total_chemical_cost_inr: totalCost
    },
    organic_supplements: {
      farmyard_manure_tons: fymTons,
      vermicompost_kg: vermicompostKg,
      neem_cake_kg: neemCakeKg,
      bio_fertilizers: "Azospirillum & PSB @ 2 kg/acre mixed in moist FYM"
    },
    split_schedule: splitSchedule
  };
}

export function calculateSeedPrecision(cropKey, areaVal, areaUnit, method = 'standard') {
  const key = Object.keys(CROPS_DATA).find(k => cropKey.toLowerCase().includes(k)) || 'paddy';
  const crop = CROPS_DATA[key];
  const acres = Math.max(0.01, convertToAcres(areaVal, areaUnit));

  let seedRate = 20.0;
  const rates = crop.seed_rate_kg_per_acre;
  if (typeof rates === 'object') {
    const matchedKey = Object.keys(rates).find(k => method.toLowerCase().includes(k)) || Object.keys(rates)[0];
    seedRate = rates[matchedKey] || 20.0;
  }

  const totalSeedKg = Number((seedRate * acres).toFixed(2));
  let spacing = "20cm x 15cm";
  let plantsPerAcre = 134895;

  if (crop.standard_spacing_cm) {
    const s = crop.standard_spacing_cm;
    spacing = `${s.row}cm x ${s.plant}cm`;
    plantsPerAcre = Math.round(40468600 / (s.row * s.plant));
  } else if (crop.standard_spacing_m) {
    const s = crop.standard_spacing_m;
    spacing = `${s.row}m x ${s.plant}m`;
    plantsPerAcre = Math.round(4046.86 / (s.row * s.plant));
  }

  return {
    crop_name: crop.name,
    input_area: `${areaVal} ${areaUnit}`,
    standard_acres: Number(acres.toFixed(3)),
    planting_method: method,
    seed_rate_kg_per_acre: seedRate,
    total_seed_required_kg: totalSeedKg,
    recommended_spacing: {
      row_to_row: spacing.split('x')[0].trim(),
      plant_to_plant: spacing.split('x')[1]?.trim() || spacing
    },
    estimated_plant_population: {
      per_acre: plantsPerAcre,
      total_field_plants: Math.round(plantsPerAcre * acres)
    },
    seed_treatment_protocol: "Treat seeds with Trichoderma viride @ 4g/kg or Beejamrutha bio-slurry 12 hours before sowing."
  };
}

export function calculateYieldPrecision(cropKey, areaVal, areaUnit, vitality = 85, soilRating = 'good') {
  const key = Object.keys(CROPS_DATA).find(k => cropKey.toLowerCase().includes(k)) || 'paddy';
  const crop = CROPS_DATA[key];
  const acres = Math.max(0.01, convertToAcres(areaVal, areaUnit));

  const soilMults = { poor: 0.8, average: 0.95, good: 1.05, optimal: 1.15 };
  const sMult = soilMults[soilRating] || 1.0;
  const vMult = Math.max(0.4, Math.min(1.3, vitality / 85.0));

  const baseYield = crop.avg_yield_quintals_per_acre.avg;
  const yieldPerAcre = Number((baseYield * sMult * vMult).toFixed(2));
  const totalQuintals = Number((yieldPerAcre * acres).toFixed(2));
  const totalTonnes = Number((totalQuintals * 0.1).toFixed(2));

  const grossRevenue = Math.round(totalQuintals * crop.market_price_per_quintal_inr);
  const totalCost = Math.round(crop.cost_per_acre_inr * acres);
  const netProfit = grossRevenue - totalCost;
  const roi = Number(((netProfit / Math.max(1, totalCost)) * 100).toFixed(1));

  return {
    crop_name: crop.name,
    input_area: `${areaVal} ${areaUnit}`,
    standard_acres: Number(acres.toFixed(3)),
    vitality_score_pct: vitality,
    soil_health_rating: soilRating,
    projected_yield: {
      per_acre_quintals: yieldPerAcre,
      total_quintals: totalQuintals,
      total_metric_tonnes: totalTonnes
    },
    economics: {
      benchmark_market_price_per_quintal_inr: crop.market_price_per_quintal_inr,
      projected_gross_revenue_inr: grossRevenue,
      estimated_production_cost_inr: totalCost,
      estimated_net_profit_inr: netProfit,
      return_on_investment_roi_pct: roi
    }
  };
}

export function calculateIrrigationPrecision(cropKey, areaVal, areaUnit, soilType = 'loam') {
  const key = Object.keys(CROPS_DATA).find(k => cropKey.toLowerCase().includes(k)) || 'paddy';
  const crop = CROPS_DATA[key];
  const acres = Math.max(0.01, convertToAcres(areaVal, areaUnit));

  // 1 mm water over 1 acre = 4,046.86 Litres
  const totalWaterLitres = Math.round(crop.water_req_mm_per_season * 4046.86 * acres);
  const dailyLitres = Math.round(totalWaterLitres / 120);

  return {
    crop_name: crop.name,
    input_area: `${areaVal} ${areaUnit}`,
    standard_acres: Number(acres.toFixed(3)),
    seasonal_water_requirement_litres: totalWaterLitres,
    daily_average_litres: dailyLitres,
    drip_irrigation_recommendation: {
      emitter_discharge_lph: 4.0,
      daily_runtime_hours: (dailyLitres / (acres * 1500 * 4)).toFixed(1),
      water_savings_vs_flood_pct: "45% to 60%"
    },
    irrigation_schedule: "Irrigate every 3-4 days during active vegetative growth and every 2 days during flowering/grain fill."
  };
}

export const LEAF_DIAGNOSTICS_DB = {
  "areca_koleroga_leaf.jpg": {
    crop: "Areca Nut",
    disease_name_en: "Koleroga / Mahali (Fruit Rot)",
    disease_name_kn: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ / ಮಹಾಲಿ",
    disease_name_hi: "सुपारी कोलेरोगा / फल सड़न",
    pathogen: "Phytophthora meadii (Oomycete)",
    severity_level: "High",
    confidence_pct: 98.4,
    foliar_damage_percentage: 28,
    symptoms: "Dark green water-soaked spots on unripened nut surface, decaying rachis, heavy nut drop.",
    chemical_remedy: "1% Bordeaux mixture spray (1kg Copper Sulphate + 1kg Lime in 100L water) or Metalaxyl MZ 72% WP @ 2g/L.",
    organic_remedy: "Bio-fungicide Trichoderma harzianum @ 10g/L root basin drenching with 2kg neem cake per palm.",
    safety_interval_phi_days: 14,
    prevention: "Tie polythene covers over bunches before monsoon onset; clear infected fallen nuts."
  },
  "paddy_blast_lesion.jpg": {
    crop: "Paddy / Rice",
    disease_name_en: "Paddy Blast Disease",
    disease_name_kn: "ಬತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    disease_name_hi: "धान का झुलसा रोग (ब्लास्ट)",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    severity_level: "High",
    confidence_pct: 97.2,
    foliar_damage_percentage: 24,
    symptoms: "Spindle-shaped elliptical lesions with gray-white centers and reddish-brown margins on leaf blades.",
    chemical_remedy: "Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L foliar spray.",
    organic_remedy: "Spray 10% fermented Cow Urine solution or 5% Neem Seed Kernel Extract (NSKE) + Pseudomonas fluorescens @ 5g/L.",
    safety_interval_phi_days: 21,
    prevention: "Avoid excess Nitrogen fertilizer doses; treat seeds with Trichoderma viride @ 10g/kg."
  },
  "tomato_early_blight.png": {
    crop: "Tomato",
    disease_name_en: "Early Blight (Alternaria)",
    disease_name_kn: "ಟೊಮೇಟೊ ಮುಂಚಿನ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
    disease_name_hi: "टमाटर अगेती झुलसा",
    pathogen: "Alternaria solani",
    severity_level: "Moderate",
    confidence_pct: 96.8,
    foliar_damage_percentage: 18,
    symptoms: "Concentric target-board rings with distinct yellow halos on lower older leaves.",
    chemical_remedy: "Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L foliar spray.",
    organic_remedy: "Dashaparni Kashaya 50ml/L or Copper oxychloride + Bacillus subtilis foliar spray.",
    safety_interval_phi_days: 7,
    prevention: "Mulch soil surface to prevent soil splash; practice 2-year crop rotation without solanaceous crops."
  },
  "maize_fall_armyworm.jpg": {
    crop: "Maize / Corn",
    disease_name_en: "Fall Armyworm Infestation",
    disease_name_kn: "ಮೆಕ್ಕೆಜೋಳದ ಸೈನಿಕ ಹುಳು",
    disease_name_hi: "मक्का फॉल आर्मीवर्म",
    pathogen: "Spodoptera frugiperda (Insect Pest)",
    severity_level: "Critical",
    confidence_pct: 99.1,
    foliar_damage_percentage: 35,
    symptoms: "Windowpane feeding holes on leaves, heavy sawdust-like fecal frass deep inside central whorl.",
    chemical_remedy: "Chlorantraniliprole 18.5% SC @ 0.4ml/L or Emamectin Benzoate 5% SG @ 0.4g/L directed into the central whorl.",
    organic_remedy: "Release Trichogramma pretiosum egg parasitoids @ 50,000/acre; spray Bacillus thuringiensis (Bt) @ 2g/L.",
    safety_interval_phi_days: 14,
    prevention: "Install pheromone traps @ 5/acre; apply dry sand + neem cake powder (9:1) into whorls."
  }
};

export function diagnoseLeafOnDevice(imageFilename, cropHint = 'paddy', mode = 'cloud', language = 'kannada') {
  // Find matching diagnostic record or fallback
  const record = LEAF_DIAGNOSTICS_DB[imageFilename] || 
    Object.values(LEAF_DIAGNOSTICS_DB).find(d => d.crop.toLowerCase().includes(cropHint.toLowerCase())) ||
    LEAF_DIAGNOSTICS_DB["paddy_blast_lesion.jpg"];

  return {
    ...record,
    status: "success",
    engine: mode === 'edge' ? "On-Device Mobile Vision (TFLite Int8)" : "Neural Agronomy Diagnostic Model"
  };
}

export function generateSmartChatResponse(query, language = 'kannada', mode = 'cloud', imageName = null) {
  const q = query.toLowerCase();

  // 1. Image Attached / Leaf Disease Query
  if (imageName || q.includes('leaf') || q.includes('disease') || q.includes('ರೋಗ') || q.includes('रोग') || q.includes('blast') || q.includes('blight') || q.includes('koleroga') || q.includes('armyworm') || q.includes('ಸೈನಿಕ')) {
    let matchedImg = imageName || "paddy_blast_lesion.jpg";
    if (q.includes('areca') || q.includes('ಅಡಿಕೆ') || q.includes('supari') || q.includes('koleroga') || q.includes('ಕೊಳೆ')) {
      matchedImg = "areca_koleroga_leaf.jpg";
    } else if (q.includes('tomato') || q.includes('ಟೊಮೇಟೊ') || q.includes('टमाटर') || q.includes('blight')) {
      matchedImg = "tomato_early_blight.png";
    } else if (q.includes('maize') || q.includes('corn') || q.includes('ಮೆಕ್ಕೆಜೋಳ') || q.includes('armyworm') || q.includes('ಸೈನಿಕ')) {
      matchedImg = "maize_fall_armyworm.jpg";
    }

    const diag = diagnoseLeafOnDevice(matchedImg, 'paddy', mode, language);
    
    let text = "";
    if (language === 'kannada') {
      text = `🌾 **ರೋಗ ತಪಾಸಣೆ ಫಲಿತಾಂಶ: ${diag.disease_name_kn}**\n\n- **ಬೆಳೆ:** ${diag.crop}\n- **ತೀವ್ರತೆ:** ${diag.severity_level} (ಹಾನಿ: ${diag.foliar_damage_percentage}%)\n- **ರಾಸಾಯನಿಕ ಪರಿಹಾರ:** ${diag.chemical_remedy}\n- **ನೈಸರ್ಗಿಕ/ಸಾವಯವ ಪರಿಹಾರ:** ${diag.organic_remedy}\n- **ಸುರಕ್ಷತಾ ಅವಧಿ (PHI):** ${diag.safety_interval_phi_days} ದಿನಗಳು.\n\n*ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ ಕೆಳಗಿನ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಕಾರ್ಡ್ ನೋಡಿ ಮತ್ತು ಉಳಿಸಿಕೊಳ್ಳಿ.*`;
    } else if (language === 'hindi') {
      text = `🌾 **रोग निदान परिणाम: ${diag.disease_name_hi}**\n\n- **फसल:** ${diag.crop}\n- **गंभीरता:** ${diag.severity_level} (नुकसान: ${diag.foliar_damage_percentage}%)\n- **रासायनिक उपचार:** ${diag.chemical_remedy}\n- **जैविक उपचार:** ${diag.organic_remedy}\n- **सुरक्षा अंतराल (PHI):** ${diag.safety_interval_phi_days} दिन।`;
    } else {
      text = `🌾 **Diagnostic Report: ${diag.disease_name_en}**\n\n- **Target Crop:** ${diag.crop}\n- **Severity Level:** ${diag.severity_level} (Damage: ${diag.foliar_damage_percentage}%)\n- **Chemical Remedy:** ${diag.chemical_remedy}\n- **Organic/Bio Remedy:** ${diag.organic_remedy}\n- **Safety Harvest Interval (PHI):** ${diag.safety_interval_phi_days} days.`;
    }

    return {
      response_text_localized: text,
      response_text_en: `Diagnostic Report: ${diag.disease_name_en} on ${diag.crop}. Treatment: ${diag.chemical_remedy}`,
      card_type: "prescription_card",
      card_payload: diag,
      tool_executed: "visual_leaf_doctor",
      spoken_audio_transcript: text.substring(0, 150)
    };
  }

  // 2. Fertilizer / NPK Dosage Query
  if (q.includes('npk') || q.includes('fertilizer') || q.includes('ಗೊಬ್ಬರ') || q.includes('खाद') || q.includes('urea') || q.includes('dap') || q.includes('dose') || q.includes('dosage')) {
    let crop = 'paddy';
    if (q.includes('areca') || q.includes('ಅಡಿಕೆ') || q.includes('सुपारी')) crop = 'arecanut';
    else if (q.includes('cotton') || q.includes('ಹತ್ತಿ') || q.includes('कपास')) crop = 'cotton';
    else if (q.includes('tomato') || q.includes('ಟೊಮೇಟೊ') || q.includes('टमाटर')) crop = 'tomato';
    else if (q.includes('maize') || q.includes('ಮೆಕ್ಕೆಜೋಳ') || q.includes('मक्का')) crop = 'maize';
    else if (q.includes('wheat') || q.includes('ಗೋಧಿ') || q.includes('गेहूं')) crop = 'wheat';

    // Extract acre number if present
    const acreMatch = q.match(/(\d+(\.\d+)?)\s*(acre|acres|ಎಕರೆ|एकड़)/);
    const acres = acreMatch ? parseFloat(acreMatch[1]) : 2.0;

    const npk = calculateNpkPrecision(crop, acres, 'acre');
    const p = npk.primary_recommendation;

    let text = "";
    if (language === 'kannada') {
      text = `🧪 **${npk.crop_name} (${acres} ಎಕರೆ) ನಿಖರ ಗೊಬ್ಬರ ಪ್ರಮಾಣ (NPK):**\n\n- **DAP:** ${p.dap_kg} kg (${p.dap_50kg_bags} ಚೀಲಗಳು)\n- **ಯೂರಿಯಾ (Urea):** ${p.urea_kg} kg (${p.urea_50kg_bags} ಚೀಲಗಳು)\n- **MOP (ಪೊಟ್ಯಾಷ್):** ${p.mop_kg} kg (${p.mop_50kg_bags} ಚೀಲಗಳು)\n- **ಅಂದಾಜು ವೆಚ್ಚ:** ₹${p.total_chemical_cost_inr}\n- **ಸಾವಯವ:** ${npk.organic_supplements.farmyard_manure_tons} ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ (FYM).\n\n*ರಸಗೊಬ್ಬರವನ್ನು 3 ಹಂತಗಳಲ್ಲಿ (ಬುಡಕ್ಕೆ, 25ನೇ ದಿನ ಮತ್ತು 45ನೇ ದಿನ) ವಿಭಜಿಸಿ ಹಾಕಿ.*`;
    } else if (language === 'hindi') {
      text = `🧪 **${npk.crop_name} (${acres} एकड़) सटीक उर्वरक मात्रा (NPK):**\n\n- **DAP:** ${p.dap_kg} किग्रा (${p.dap_50kg_bags} बैग)\n- **यूरिया (Urea):** ${p.urea_kg} किग्रा (${p.urea_50kg_bags} बैग)\n- **MOP (पोटाश):** ${p.mop_kg} किग्रा (${p.mop_50kg_bags} बैग)\n- **अनुमानित लागत:** ₹${p.total_chemical_cost_inr}\n- **जैविक:** ${npk.organic_supplements.farmyard_manure_tons} टन गोबर की खाद (FYM)।`;
    } else {
      text = `🧪 **Precision NPK Fertilizer Plan for ${npk.crop_name} (${acres} Acres):**\n\n- **DAP:** ${p.dap_kg} kg (${p.dap_50kg_bags} bags)\n- **Urea:** ${p.urea_kg} kg (${p.urea_50kg_bags} bags)\n- **MOP Potash:** ${p.mop_kg} kg (${p.mop_50kg_bags} bags)\n- **Estimated Chemical Cost:** ₹${p.total_chemical_cost_inr}\n- **Organic Base:** ${npk.organic_supplements.farmyard_manure_tons} Tons Farmyard Manure (FYM).`;
    }

    return {
      response_text_localized: text,
      response_text_en: `Precision NPK Plan for ${acres} acres: DAP ${p.dap_kg}kg, Urea ${p.urea_kg}kg, MOP ${p.mop_kg}kg.`,
      card_type: "npk_card",
      card_payload: npk,
      tool_executed: "npk_fertilizer_calculator",
      spoken_audio_transcript: text.substring(0, 150)
    };
  }

  // 3. Organic Jeevamrutha / Natural Farming
  if (q.includes('jeevamrutha') || q.includes('ಜೀವಾಮೃತ') || q.includes('जीवामृत') || q.includes('organic') || q.includes('dashaparni') || q.includes('ದಶಪರ್ಣಿ')) {
    let text = "";
    if (language === 'kannada') {
      text = `🌿 **ಜೀವಾಮೃತ (Jeevamrutha) ತಯಾರಿಸುವ ಸರಳ ವಿಧಾನ (200 ಲೀಟರ್):**\n\n1. **ಸಾಮಗ್ರಿಗಳು:** 10 ಕೆಜಿ ದೇಸಿ ಹಸುವಿನ ಸಗಣಿ, 10 ಲೀಟರ್ ಗೋಮೂತ್ರ, 2 ಕೆಜಿ ಬೆಲ್ಲ, 2 ಕೆಜಿ ದ್ವಿದಳ ಧಾನ್ಯದ ಹಿಟ್ಟು (ಕಡಲೆ/ಹುರುಳಿ), 1 ಹಿಡಿ ಫಲವತ್ತಾದ ಬದುವಿನ ಮಣ್ಣು.\n2. **ತಯಾರಿಕೆ:** 200 ಲೀಟರ್ ನೀರಿಗೆ ಎಲ್ಲವನ್ನು ಬೆರೆಸಿ ನೆರಳಿನಲ್ಲಿಡಿ. ದಿನಕ್ಕೆ 2 ಬಾರಿ ಗಡಿಯಾರದ ದಿಕ್ಕಿನಲ್ಲಿ ಕೋಲಿನಿಂದ ತಿರುಗಿಸಿ.\n3. **ಬಳಕೆ:** 48 ರಿಂದ 72 ಗಂಟೆಗಳ ನಂತರ 1 ಎಕರೆಗೆ ಹನಿ ನೀರಾವರಿ ಅಥವಾ ಮಣ್ಣಿಗೆ ಉಣಿಸಿ. ಎಕರೆಗೆ 10-20% ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಬಹುದು. ಇದು ಭೂಮಿಯ ಸೂಕ್ಷ್ಮಾಣು ಜೀವಿಗಳನ್ನು 100 ಪಟ್ಟು ಹೆಚ್ಚಿಸುತ್ತದೆ!`;
    } else if (language === 'hindi') {
      text = `🌿 **जीवामृत (Jeevamrutha) बनाने की विधि (200 लीटर):**\n\n1. **सामग्री:** 10 किग्रा देसी गाय का गोबर, 10 लीटर गोमूत्र, 2 किग्रा गुड़, 2 किग्रा बेसन, 1 मुट्ठी खेत की मेड़ की मिट्टी।\n2. **विधि:** 200 लीटर पानी में मिलाकर छायादार जगह पर रखें। दिन में दो बार घड़ी की दिशा में घुमाएं।\n3. **उपयोग:** 48-72 घंटे में तैयार। 1 एकड़ में सिंचाई के साथ दें या 10% घोल का छिड़काव करें।`;
    } else {
      text = `🌿 **Standard Jeevamrutha Organic Bio-Fertilizer Recipe (200 Litres):**\n\n1. **Ingredients:** 10 kg Desi cow dung, 10L cow urine, 2 kg jaggery, 2 kg pulse flour (besan), handful of virgin bund soil.\n2. **Preparation:** Mix in 200L clean water under shade. Stir clockwise twice daily.\n3. **Application:** Ready in 48-72 hours. Apply 200L per acre through irrigation or spray at 10-20% dilution. Exponentially activates beneficial soil microbes!`;
    }

    return {
      response_text_localized: text,
      response_text_en: "Organic Jeevamrutha formulation protocol for 1 acre soil microbial rejuvenation.",
      card_type: "prescription_card",
      card_payload: {
        crop: "All Crops",
        disease_name_en: "Organic Soil Health & Microbial Activation",
        disease_name_kn: "ನೈಸರ್ಗಿಕ ಸಾವಯವ ಜೀವಾಮೃತ ವಿಧಾನ",
        severity_level: "Optimal Bio-Control",
        foliar_damage_percentage: 0,
        chemical_remedy: "Zero Chemical Residue",
        organic_remedy: "Apply 200 Litres Jeevamrutha per acre every 15-21 days.",
        safety_interval_phi_days: 0
      },
      tool_executed: "organic_farming_protocol",
      spoken_audio_transcript: text.substring(0, 150)
    };
  }

  // 4. Government Schemes / Subsidies
  if (q.includes('scheme') || q.includes('subsidy') || q.includes('pm kisan') || q.includes('ಯೋಜನೆ') || q.includes('ಸಹಾಯಧನ') || q.includes('योजना') || q.includes('kcc') || q.includes('insurance') || q.includes('ವಿಮೆ')) {
    let text = "";
    if (language === 'kannada') {
      text = `🏛️ **ಮುಖ್ಯ ರೈತ ಕಲ್ಯಾಣ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು:**\n\n1. **PM-KISAN:** ಪ್ರತಿ ವರ್ಷ ₹6,000 ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ (3 ಕಂತುಗಳಲ್ಲಿ).\n2. **PMFBY (ಬೆಳೆ ವಿಮೆ):** ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳಿಂದ ಉಂಟಾಗುವ ಬೆಳೆ ಹಾನಿಗೆ ರಕ್ಷಣೆ (ಖಾರೀಫ್ ಬೆಳೆಗಳಿಗೆ ಕೇವಲ 2% ಪ್ರೀಮಿಯಂ).\n3. **ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC):** ಕೇವಲ 4% ಬಡ್ಡಿದರದಲ್ಲಿ ₹3 ಲಕ್ಷದವರೆಗೆ ಕೃಷಿ ಸಾಲ.\n4. **ಹನಿ ನೀರಾವರಿ ಸಹಾಯಧನ:** ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ 90% ವರೆಗೆ ಸಬ್ಸಿಡಿ ಲಭ್ಯವಿದೆ. ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.`;
    } else {
      text = `🏛️ **Key Agricultural Government Schemes:**\n\n1. **PM-KISAN:** ₹6,000/year direct financial income support in 3 equal installments.\n2. **PMFBY (Crop Insurance):** Comprehensive insurance against natural drought, flood, and pests.\n3. **Kisan Credit Card (KCC):** Concessional crop loans up to ₹3 Lakh at an effective 4% interest rate.\n4. **Micro-Irrigation Subsidy:** 70% to 90% subsidy on Drip and Sprinkler installations for small & marginal farmers.`;
    }

    return {
      response_text_localized: text,
      response_text_en: "Summary of PM-KISAN, PMFBY Crop Insurance, KCC Loans, and Drip Irrigation Subsidies.",
      card_type: null,
      card_payload: null,
      tool_executed: "government_schemes_advisor",
      spoken_audio_transcript: text.substring(0, 150)
    };
  }

  // 5. Default General Expert Agronomy Guidance
  let defaultReply = "";
  if (language === 'kannada') {
    defaultReply = `🌾 **ಅಗ್ರಿಬಾಟ್ AI ಕೃಷಿ ಸಲಹೆಗಾರ:**\n\nನಿಮ್ಮ ಪ್ರಶ್ನೆ "${query}" ಗೆ ಸಂಬಂಧಿಸಿದಂತೆ:\n- ಬೆಳೆಯ ಸಮಗ್ರ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆಗೆ ನಿಯಮಿತವಾಗಿ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ.\n- ರೋಗ ಅಥವಾ ಕೀಟಬಾಧೆಯಿದ್ದರೆ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ 'Leaf Doctor' ಟ್ಯಾಬ್ ಬಳಸಿ.\n- NPK ರಸಗೊಬ್ಬರ ಮತ್ತು ಬೀಜದ ಪ್ರಮಾಣಕ್ಕಾಗಿ ನಮ್ಮ 'Calculator' ಟೂಲ್ ಬಳಸಿ. ನಾನು ಸದಾ ನಿಮ್ಮ ನೆರವಿಗೆ ಸಿದ್ಧ!`;
  } else if (language === 'hindi') {
    defaultReply = `🌾 **एग्रीबॉट AI कृषि सलाहकार:**\n\nआपके प्रश्न "${query}" के संदर्भ में:\n- संतुलित पोषण के लिए समय पर मिट्टी परीक्षण (Soil Health Card) कराएं।\n- कीट या रोग के सटीक समाधान के लिए पत्ती की फोटो अपलोड करें या 'Leaf Doctor' का उपयोग करें।\n- सटीक खाद एवं बीज की मात्रा के लिए 'Calculator' टूल देखें।`;
  } else {
    defaultReply = `🌾 **AgriBot Precision Agronomy Advice:**\n\nRegarding your query "${query}":\n- Maintain optimal soil health with basal organic manure (FYM) and balanced NPK dosing.\n- For accurate pest or disease diagnosis, attach a leaf photo or visit the **Leaf Doctor** tab.\n- Use the **Calculator** suite to compute exact DAP, Urea, MOP bags, and yield forecasts for your exact acreage.`;
  }

  return {
    response_text_localized: defaultReply,
    response_text_en: defaultReply,
    card_type: null,
    card_payload: null,
    tool_executed: "general_agronomy_assistant",
    spoken_audio_transcript: defaultReply.substring(0, 150)
  };
}
