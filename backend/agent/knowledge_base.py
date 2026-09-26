"""
Comprehensive Agronomy, Pathology, Organic Farming, and Scheme Knowledge Base
Specially tailored for Indian farmers, smallholders, coastal and national agro-climatic zones.
"""

# Crop Master Database with agronomic parameters
CROPS_DATABASE = {
    "paddy": {
        "name": "Paddy / Rice (ಬತ್ತ / धान)",
        "scientific_name": "Oryza sativa",
        "category": "Cereal",
        "season": "Kharif / Rabi",
        "duration_days": "120 - 150",
        "recommended_npk_kg_per_acre": {"N": 40.0, "P": 20.0, "K": 20.0},
        "seed_rate_kg_per_acre": {"broadcast": 30.0, "line_sowing": 20.0, "transplanting": 12.0, "sri_method": 2.5},
        "standard_spacing_cm": {"row": 20.0, "plant": 15.0},
        "avg_yield_quintals_per_acre": {"min": 18.0, "avg": 24.0, "max": 32.0},
        "market_price_per_quintal_inr": 2300,
        "msp_inr": 2300,
        "water_requirement_mm": 1200,
        "critical_stages": ["Tillering", "Panicle Initiation", "Flowering", "Grain Filling"],
        "common_diseases": ["paddy_blast", "bacterial_leaf_blight", "sheath_blight", "brown_spot", "stem_borer"]
    },
    "arecanut": {
        "name": "Areca Nut / Betel Nut (ಅಡಿಕೆ / सुपारी)",
        "scientific_name": "Areca catechu",
        "category": "Plantation",
        "season": "Perennial",
        "duration_days": "Perennial (Harvest Nov - Feb)",
        "recommended_npk_per_palm_per_year_grams": {"N": 100.0, "P": 40.0, "K": 140.0},
        "recommended_npk_kg_per_acre": {"N": 55.0, "P": 22.0, "K": 77.0},  # Assuming ~550 palms/acre
        "palms_per_acre": 550,
        "standard_spacing_m": {"row": 2.7, "plant": 2.7},
        "avg_yield_quintals_per_acre": {"min": 8.0, "avg": 12.0, "max": 16.0},
        "market_price_per_quintal_inr": 48000,
        "msp_inr": 48000,
        "water_requirement_mm": 1800,
        "critical_stages": ["Pre-Monsoon flowering", "Nut setting", "Monsoon development", "Harvest"],
        "common_diseases": ["arecanut_koleroga", "arecanut_yellow_leaf", "anabe_roga", "inflorescence_dieback", "spindle_rot"]
    },
    "coconut": {
        "name": "Coconut (ತೆಂಗು / नारियल)",
        "scientific_name": "Cocos nucifera",
        "category": "Plantation",
        "season": "Perennial",
        "duration_days": "Perennial",
        "recommended_npk_per_palm_per_year_grams": {"N": 500.0, "P": 320.0, "K": 1200.0},
        "recommended_npk_kg_per_acre": {"N": 35.0, "P": 22.4, "K": 84.0}, # ~70 palms/acre
        "palms_per_acre": 70,
        "standard_spacing_m": {"row": 7.5, "plant": 7.5},
        "avg_yield_nuts_per_palm_year": {"min": 60, "avg": 90, "max": 140},
        "market_price_per_nut_inr": 25,
        "msp_inr": 12000, # Copra per quintal
        "water_requirement_mm": 1500,
        "critical_stages": ["Button setting", "Nut development", "Summer irrigation"],
        "common_diseases": ["coconut_stem_bleeding", "coconut_bud_rot", "rhinoceros_beetle", "eriophyid_mite", "root_wilt"]
    },
    "maize": {
        "name": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)",
        "scientific_name": "Zea mays",
        "category": "Cereal",
        "season": "Kharif / Rabi",
        "duration_days": "95 - 110",
        "recommended_npk_kg_per_acre": {"N": 48.0, "P": 24.0, "K": 16.0},
        "seed_rate_kg_per_acre": {"hybrid": 7.5, "composite": 8.5},
        "standard_spacing_cm": {"row": 60.0, "plant": 20.0},
        "avg_yield_quintals_per_acre": {"min": 22.0, "avg": 30.0, "max": 40.0},
        "market_price_per_quintal_inr": 2225,
        "msp_inr": 2225,
        "water_requirement_mm": 550,
        "critical_stages": ["Knee-high", "Tasseling", "Silking", "Cob formation"],
        "common_diseases": ["fall_armyworm", "turcicum_leaf_blight", "maydis_leaf_blight", "stem_borer"]
    },
    "tomato": {
        "name": "Tomato (ಟೊಮೇಟೊ / टमाटर)",
        "scientific_name": "Solanum lycopersicum",
        "category": "Vegetable",
        "season": "All Season",
        "duration_days": "110 - 140",
        "recommended_npk_kg_per_acre": {"N": 50.0, "P": 30.0, "K": 35.0},
        "seed_rate_kg_per_acre": {"hybrid": 0.08, "open_pollinated": 0.16}, # in kg (80g - 160g)
        "standard_spacing_cm": {"row": 75.0, "plant": 45.0},
        "avg_yield_quintals_per_acre": {"min": 120.0, "avg": 180.0, "max": 260.0},
        "market_price_per_quintal_inr": 1800,
        "msp_inr": 1800,
        "water_requirement_mm": 600,
        "critical_stages": ["Transplanting", "Vegetative", "Flowering", "Fruit enlargement", "Harvest"],
        "common_diseases": ["tomato_early_blight", "tomato_late_blight", "tomato_leaf_curl_virus", "bacterial_wilt", "blossom_end_rot"]
    },
    "cotton": {
        "name": "Cotton (ಹತ್ತಿ / कपास)",
        "scientific_name": "Gossypium hirsutum",
        "category": "Commercial Fiber",
        "season": "Kharif",
        "duration_days": "150 - 180",
        "recommended_npk_kg_per_acre": {"N": 48.0, "P": 24.0, "K": 24.0},
        "seed_rate_kg_per_acre": {"bt_hybrid": 0.9, "desi": 4.0},
        "standard_spacing_cm": {"row": 90.0, "plant": 60.0},
        "avg_yield_quintals_per_acre": {"min": 8.0, "avg": 12.0, "max": 18.0},
        "market_price_per_quintal_inr": 7122,
        "msp_inr": 7122,
        "water_requirement_mm": 700,
        "critical_stages": ["Squaring", "Flowering", "Boll development", "Boll opening"],
        "common_diseases": ["cotton_pink_bollworm", "cotton_leaf_curl", "bacterial_blight", "grey_mildew", "aphids"]
    },
    "wheat": {
        "name": "Wheat (ಗೋಧಿ / गेहूं)",
        "scientific_name": "Triticum aestivum",
        "category": "Cereal",
        "season": "Rabi",
        "duration_days": "115 - 130",
        "recommended_npk_kg_per_acre": {"N": 48.0, "P": 24.0, "K": 16.0},
        "seed_rate_kg_per_acre": {"normal": 40.0, "late_sown": 50.0},
        "standard_spacing_cm": {"row": 20.0, "plant": 5.0},
        "avg_yield_quintals_per_acre": {"min": 16.0, "avg": 22.0, "max": 28.0},
        "market_price_per_quintal_inr": 2275,
        "msp_inr": 2275,
        "water_requirement_mm": 450,
        "critical_stages": ["CRI (Crown Root Initiation)", "Tillering", "Late Jointing", "Flowering", "Milk & Dough"],
        "common_diseases": ["yellow_rust", "brown_rust", "powdery_mildew", "loose_smut", "karnal_bunt"]
    },
    "chilli": {
        "name": "Chilli / Red Pepper (ಮೆಣಸಿನಕಾಯಿ / मिर्च)",
        "scientific_name": "Capsicum annuum",
        "category": "Spices / Vegetable",
        "season": "Kharif / Rabi",
        "duration_days": "120 - 160",
        "recommended_npk_kg_per_acre": {"N": 60.0, "P": 30.0, "K": 30.0},
        "seed_rate_kg_per_acre": {"hybrid": 0.15, "regular": 0.4},
        "standard_spacing_cm": {"row": 60.0, "plant": 45.0},
        "avg_yield_quintals_per_acre": {"min": 15.0, "avg": 25.0, "max": 40.0},
        "market_price_per_quintal_inr": 18000, # Dry chilli
        "msp_inr": 18000,
        "water_requirement_mm": 650,
        "critical_stages": ["Vegetative", "Flowering", "Fruit set", "Picking"],
        "common_diseases": ["chilli_leaf_curl", "chilli_anthracnose", "thrips_mites", "dieback", "damping_off"]
    },
    "pepper": {
        "name": "Black Pepper (ಕಾಳುಮೆಣಸು / काली मिर्च)",
        "scientific_name": "Piper nigrum",
        "category": "Spices",
        "season": "Perennial",
        "duration_days": "Perennial (Harvest Dec - Mar)",
        "recommended_npk_per_vine_grams": {"N": 50.0, "P": 50.0, "K": 150.0},
        "recommended_npk_kg_per_acre": {"N": 25.0, "P": 25.0, "K": 75.0}, # ~500 standard trees
        "standard_spacing_m": {"row": 3.0, "plant": 3.0},
        "avg_yield_quintals_per_acre": {"min": 3.0, "avg": 6.0, "max": 10.0},
        "market_price_per_quintal_inr": 62000,
        "msp_inr": 62000,
        "water_requirement_mm": 2000,
        "critical_stages": ["Spike emergence", "Berry setting", "Monsoon drenches"],
        "common_diseases": ["pepper_quick_wilt", "pepper_pollu_beetle", "slow_decline", "anthracnose"]
    },
    "sugarcane": {
        "name": "Sugarcane (ಕಬ್ಬು / गन्ना)",
        "scientific_name": "Saccharum officinarum",
        "category": "Commercial Cash Crop",
        "season": "Annual",
        "duration_days": "300 - 360",
        "recommended_npk_kg_per_acre": {"N": 100.0, "P": 40.0, "K": 50.0},
        "seed_rate_kg_per_acre": {"setts": 30000}, # 30k eye buds
        "standard_spacing_cm": {"row": 120.0, "plant": 30.0},
        "avg_yield_quintals_per_acre": {"min": 350.0, "avg": 450.0, "max": 600.0}, # in Tonnes / Quintals
        "market_price_per_quintal_inr": 340, # FRP
        "msp_inr": 340,
        "water_requirement_mm": 2000,
        "critical_stages": ["Germination", "Formative", "Grand Growth", "Maturity"],
        "common_diseases": ["red_rot", "smut", "early_shoot_borer", "woolly_aphid", "pokkah_boeng"]
    },
    "coffee": {
        "name": "Coffee (ಕಾಫಿ / कॉफी)",
        "scientific_name": "Coffea canephora / arabica",
        "category": "Plantation",
        "season": "Perennial",
        "duration_days": "Perennial (Harvest Dec - Feb)",
        "recommended_npk_kg_per_acre": {"N": 40.0, "P": 30.0, "K": 40.0},
        "standard_spacing_m": {"row": 2.5, "plant": 2.5},
        "avg_yield_quintals_per_acre": {"min": 5.0, "avg": 8.0, "max": 14.0},
        "market_price_per_quintal_inr": 36000,
        "msp_inr": 36000,
        "water_requirement_mm": 1600,
        "critical_stages": ["Blossom shower", "Backing shower", "Berry development", "Ripening"],
        "common_diseases": ["coffee_leaf_rust", "coffee_berry_borer", "black_rot", "stem_borer"]
    },
    "banana": {
        "name": "Banana (ಬಾಳೆ / केला)",
        "scientific_name": "Musa acuminata",
        "category": "Fruit",
        "season": "All Season",
        "duration_days": "300 - 360",
        "recommended_npk_per_plant_grams": {"N": 200.0, "P": 60.0, "K": 300.0},
        "recommended_npk_kg_per_acre": {"N": 200.0, "P": 60.0, "K": 300.0}, # ~1000 plants/acre
        "standard_spacing_m": {"row": 1.8, "plant": 1.8},
        "avg_yield_quintals_per_acre": {"min": 200.0, "avg": 280.0, "max": 380.0},
        "market_price_per_quintal_inr": 2400,
        "msp_inr": 2400,
        "water_requirement_mm": 1800,
        "critical_stages": ["Shooting", "Bunch formation", "Finger development"],
        "common_diseases": ["sigatoka_leaf_spot", "panama_wilt", "banana_bunchy_top", "rhizome_weevil"]
    }
}

# Chemical & Organic Fertilizer Nutrient Specifications
FERTILIZERS = {
    "urea": {"name": "Urea", "N": 0.46, "P": 0.0, "K": 0.0, "form": "Granular Chemical", "cost_per_50kg_bag_inr": 266.5},
    "dap": {"name": "Di-Ammonium Phosphate (DAP)", "N": 0.18, "P": 0.46, "K": 0.0, "form": "Granular Chemical", "cost_per_50kg_bag_inr": 1350.0},
    "mop": {"name": "Muriate of Potash (MOP)", "N": 0.0, "P": 0.0, "K": 0.60, "form": "Granular Chemical", "cost_per_50kg_bag_inr": 1650.0},
    "ssp": {"name": "Single Super Phosphate (SSP)", "N": 0.0, "P": 0.16, "K": 0.0, "form": "Powder/Granular", "cost_per_50kg_bag_inr": 480.0},
    "complex_10_26_26": {"name": "Complex (10:26:26)", "N": 0.10, "P": 0.26, "K": 0.26, "form": "Granular", "cost_per_50kg_bag_inr": 1470.0},
    "complex_20_20_0_13": {"name": "Ammonium Phosphate Sulphate (20:20:0:13S)", "N": 0.20, "P": 0.20, "K": 0.0, "form": "Granular", "cost_per_50kg_bag_inr": 1200.0},
    "vermicompost": {"name": "Vermicompost (ಎರೆಹುಳು ಗೊಬ್ಬರ)", "N": 0.015, "P": 0.01, "K": 0.015, "form": "Organic", "cost_per_ton_inr": 5000.0},
    "farmyard_manure": {"name": "Farmyard Manure (FYM / ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ)", "N": 0.005, "P": 0.0025, "K": 0.005, "form": "Organic", "cost_per_ton_inr": 2000.0},
    "neem_cake": {"name": "Neem Cake (ಬೇವಿನ ಹಿಂಡಿ)", "N": 0.05, "P": 0.01, "K": 0.015, "form": "Organic Bio-pesticide", "cost_per_50kg_bag_inr": 1100.0}
}

# Detailed Pathology & Plant Disease Database
PATHOLOGY_DATABASE = {
    "paddy_blast": {
        "id": "paddy_blast",
        "crop": "paddy",
        "name_en": "Paddy Blast Disease",
        "name_kn": "ಬತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
        "name_hi": "धान का झुलसा रोग (ब्लास्ट)",
        "pathogen_type": "Fungal",
        "causal_agent": "Magnaporthe oryzae (Pyricularia oryzae)",
        "symptoms": "Spindle-shaped or eye-shaped lesions with brown borders and grey/whitish centers on leaves; node rot and neck rot resulting in empty chaffy panicles.",
        "severity_stages": {
            "mild": "Few scattered spindle spots on lower leaves (<5% leaf area).",
            "moderate": "Coalescing diamond spots covering 10-25% foliar canopy.",
            "severe": "Extensive foliar burn, neck rot, panicles breaking and lodging."
        },
        "organic_remedy": [
            "Spray Pseudomonas fluorescens @ 10g/L or 2.5 kg/ha in 500L water.",
            "Apply Jeevamrutha foliar spray (10% solution) every 10 days.",
            "Seed treatment with Trichoderma viride @ 4g/kg seed before sowing."
        ],
        "chemical_remedy": [
            "Tricyclazole 75% WP @ 0.6g/L of water (or 120g/acre) at first sight of leaf blast.",
            "Isoprothiolane 40% EC @ 1.5 ml/L of water.",
            "Avoid excess nitrogen fertilizer application during cloudy/humid spells."
        ],
        "safety_interval_phi_days": 21,
        "preventative_measures": "Use resistant varieties (e.g., Intan, MO-4, Jaya); burn infected stubble; balance potassium application."
    },
    "bacterial_leaf_blight": {
        "id": "bacterial_leaf_blight",
        "crop": "paddy",
        "name_en": "Bacterial Leaf Blight (BLB)",
        "name_kn": "ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಎಲೆ ಕರಕು ರೋಗ",
        "name_hi": "जीवाणु पत्ती झुलसा",
        "pathogen_type": "Bacterial",
        "causal_agent": "Xanthomonas oryzae pv. oryzae",
        "symptoms": "Water-soaked lesions turning yellowish-white stripes with wavy margins along leaf edges; milky bacterial ooze droplets visible early morning.",
        "severity_stages": {
            "mild": "Tip yellowing and small wavy lesions on upper leaves.",
            "moderate": "Leaf edges drying downwards with characteristic scalloped margins (20-40%).",
            "severe": "Kresek symptom (systemic seedling wilt) or complete field wilting and drying."
        },
        "organic_remedy": [
            "Foliar spray of fresh cow dung slurry supernatant (20%) + neem oil (3ml/L).",
            "Spray Plantomycin or bio-formulation Bacillus subtilis @ 5g/L."
        ],
        "chemical_remedy": [
            "Streptocycline (Streptomycin sulphate + Tetracycline) @ 6g/acre mixed with Copper Oxychloride 50% WP @ 500g/acre in 200L water.",
            "Immediately drain standing water from field to arrest bacterial flow."
        ],
        "safety_interval_phi_days": 15,
        "preventative_measures": "Avoid clipping seedling tips before transplanting; split nitrogen dosage into 3-4 applications."
    },
    "arecanut_koleroga": {
        "id": "arecanut_koleroga",
        "crop": "arecanut",
        "name_en": "Areca Nut Fruit Rot (Koleroga / Mahali)",
        "name_kn": "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಾಲಿ)",
        "name_hi": "सुपारी का फल सड़न (कोलेरोगा)",
        "pathogen_type": "Fungal / Oomycete",
        "causal_agent": "Phytophthora meadii",
        "symptoms": "Water-soaked dark green lesions on unripe arecanuts, followed by white felt-like mycelial growth. Nuts lose shine and drop heavily (shedding), leading to empty bunches.",
        "severity_stages": {
            "mild": "Occasional water-soaked lesions on individual bunches with slight nut fall.",
            "moderate": "Severe nut dropping under crowns; white fungal coating on fallen nuts.",
            "severe": "Crown rot (Shiradholle), spindle rot, and entire tree bunch devastation."
        },
        "organic_remedy": [
            "Tie poly-bags or areca bunch covers (Kotte kattuva paddhati) before heavy monsoon rains.",
            "Apply Trichoderma-enriched organic compost @ 5 kg per palm root zone."
        ],
        "chemical_remedy": [
            "Spray 1% Bordeaux Mixture (1 kg Copper Sulphate + 1 kg Lime in 100L water) thoroughly covering all bunches before onset of South-West monsoon.",
            "Second spray of Bordeaux mixture 40-45 days after the first spray during rain breaks.",
            "Metalaxyl-M + Mancozeb 72% WP (Ridomil MZ) @ 2g/L as emergency curative spray."
        ],
        "safety_interval_phi_days": 30,
        "preventative_measures": "Provide good field drainage; clear fallen diseased nuts and destroy them to reduce inoculum."
    },
    "arecanut_yellow_leaf": {
        "id": "arecanut_yellow_leaf",
        "crop": "arecanut",
        "name_en": "Areca Nut Yellow Leaf Disease (YLD)",
        "name_kn": "ಅಡಿಕೆ ಹಳದಿ ಎಲೆ ರೋಗ",
        "name_hi": "सुपारी का पीला पत्ता रोग",
        "pathogen_type": "Phytoplasma / Complex",
        "causal_agent": "Candidatus Phytoplasma arecae",
        "symptoms": "Characteristic yellowing of inner whorl of leaves spreading outward; marginal necrosis, dark brown tissue, stunted crown, tapering stem, blackening of kernel inside nut.",
        "severity_stages": {
            "mild": "Yellowing starts at leaf tips of middle whorl fronds.",
            "moderate": "Chlorosis covers entire crown, reduced nut size, blackish core in nut.",
            "severe": "Crown completely yellow, canopy reduction, kernel rotting (Chali loss)."
        },
        "organic_remedy": [
            "Heavy application of organic matter: 12 kg FYM + 2 kg Neem Cake + 100g Trichoderma per palm annually.",
            "Intercropping with Pepper, Banana, and Cocoa to improve microclimate and root microbiome."
        ],
        "chemical_remedy": [
            "Apply balanced fertilizer dose: N:P:K 100:40:140g + Magnesium Sulphate @ 100g + Borax @ 15g per palm per year.",
            "Phorate / Chlorpyrifos soil application around root zone to control insect vectors (plant hoppers)."
        ],
        "safety_interval_phi_days": 28,
        "preventative_measures": "Ensure proper drainage in monsoon; avoid waterlogging; lime acidic soils (pH < 5.5) with 500g agricultural lime/palm."
    },
    "tomato_early_blight": {
        "id": "tomato_early_blight",
        "crop": "tomato",
        "name_en": "Tomato Early Blight",
        "name_kn": "ಟೊಮೇಟೊ ಮುಂಚಿನ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
        "name_hi": "टमाटर का अगेती झुलसा",
        "pathogen_type": "Fungal",
        "causal_agent": "Alternaria solani",
        "symptoms": "Concentric rings ('target-board' pattern) with dark brown to black spots surrounded by yellow halos on older lower leaves. Stem lesions and dark sunken fruit rot near calyx.",
        "severity_stages": {
            "mild": "Target-board spots localized on bottom 20% foliage.",
            "moderate": "Yellowing and defoliation spreading to middle canopy; dark stem cankers.",
            "severe": "Total defoliation, sunburn on exposed fruits, leathery sunken black rot on fruits."
        },
        "organic_remedy": [
            "Spray Neem Seed Kernel Extract (NSKE 5%) or 3ml Neem Oil/L with soap emulsion.",
            "Spray fermented butter-milk / sour curd water (5%) mixed with Asafoetida (Hing) 1g/L."
        ],
        "chemical_remedy": [
            "Mancozeb 75% WP @ 2.5g/L of water or Chlorothalonil 75% WP @ 2g/L.",
            "Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L for severe infestations."
        ],
        "safety_interval_phi_days": 7,
        "preventative_measures": "Prune lower leaves touching soil; adopt drip irrigation to keep foliage dry; practice crop rotation away from Solanaceae family."
    },
    "fall_armyworm": {
        "id": "fall_armyworm",
        "crop": "maize",
        "name_en": "Fall Armyworm (FAW)",
        "name_kn": "ಮೆಕ್ಕೆಜೋಳದ ಲದ್ದಿ ಹುಳು (ಆರ್ಮಿವರ್ಮ್)",
        "name_hi": "मक्का फॉल आर्मीवर्म (सैनिक कीट)",
        "pathogen_type": "Insect Pest (Lepidoptera)",
        "causal_agent": "Spodoptera frugiperda",
        "symptoms": "Ragged shot-hole feeding marks on young leaves in the central whorl, sawdust-like brownish fecal frass accumulation in whorl; chewed tassels and cobs.",
        "severity_stages": {
            "mild": "Pin-hole and window-pane leaf damage in <10% plants.",
            "moderate": "Extensive skeletonized leaf whorls with visible caterpillar frass (10-30%).",
            "severe": "Central growing whorl severed (dead heart), bore holes in developing cobs (>30%)."
        },
        "organic_remedy": [
            "Apply Neem formulation (Azadirachtin 1500 ppm) @ 5 ml/L in central whorl.",
            "Release egg parasitoid Trichogramma pretiosum @ 50,000/acre at 15 and 30 days after sowing.",
            "Apply biological entomopathogen Metarhizium rileyi or Beauveria bassiana @ 5g/L into whorls."
        ],
        "chemical_remedy": [
            "Chlorantraniliprole 18.5% SC (Coragen) @ 0.4 ml/L of water directed into the whorl.",
            "Emamectin Benzoate 5% SG @ 0.4 g/L of water.",
            "Poison baiting: Jaggery 1kg + Rice bran 10kg + Thiodicarb 75% WP 100g fermented overnight and applied to whorls."
        ],
        "safety_interval_phi_days": 14,
        "preventative_measures": "Deep summer plowing; intercrop with cowpea or pulses; install pheromone traps @ 5 traps/acre for moth monitoring."
    },
    "nitrogen_deficiency": {
        "id": "nitrogen_deficiency",
        "crop": "general",
        "name_en": "Nitrogen (N) Deficiency / General Chlorosis",
        "name_kn": "ಸಾರಜನಕ (ನೈಟ್ರೋಜನ್) ಕೊರತೆ / ಹಳದಿ ಎಲೆ",
        "name_hi": "नाइट्रोजन की कमी (पीलापन)",
        "pathogen_type": "Nutrient Deficiency",
        "causal_agent": "Soil Nitrogen Depletion",
        "symptoms": "Uniform pale-yellowing (chlorosis) starting from older bottom leaves and moving upward; V-shaped yellowing along midrib; stunted growth and reduced tillering.",
        "severity_stages": {
            "mild": "Light green tinge on bottom foliage.",
            "moderate": "Distinct yellowing of lower 30% leaves with stunted stems.",
            "severe": "Complete lower leaf necrosis and premature drying; severely stunted yield."
        },
        "organic_remedy": [
            "Top-dress with Vermicompost (200-400 kg/acre) or well-rotted cattle manure.",
            "Foliar spray of Panchagavya 3% or Jeevamrutha 10% solution.",
            "Incorporate green manure crops like Sunn hemp (Dhaincha)."
        ],
        "chemical_remedy": [
            "Top-dress with Urea @ 25-35 kg/acre in moist soil.",
            "Emergency foliar spray: 1-2% Urea solution (10-20g per 1L water) for instant greening."
        ],
        "safety_interval_phi_days": 0,
        "preventative_measures": "Soil testing before sowing; apply neem-coated urea in splits."
    },
    "potassium_deficiency": {
        "id": "potassium_deficiency",
        "crop": "general",
        "name_en": "Potassium (K) Deficiency",
        "name_kn": "ಪೊಟ್ಯಾಶ್ / ಪೊಟ್ಯಾಷಿಯಂ ಕೊರತೆ",
        "name_hi": "पोटाश की कमी",
        "pathogen_type": "Nutrient Deficiency",
        "causal_agent": "Soil Potassium Depletion",
        "symptoms": "Marginal scorching and firing (drying of leaf edges and tips) of older leaves; weak stems prone to lodging; poor fruit/grain filling.",
        "severity_stages": {
            "mild": "Yellowing along leaf edges.",
            "moderate": "Brown necrotic scorching on margins (burnt appearance).",
            "severe": "Leaves curl upwards, severe lodging, shriveled grains/nuts."
        },
        "organic_remedy": [
            "Apply wood ash (50-100 kg/acre) or coconut husk biochar.",
            "Apply Potassium-solubilizing bacteria (KSB) @ 2 kg/acre with FYM."
        ],
        "chemical_remedy": [
            "Apply MOP (Muriate of Potash 60% K2O) @ 20-30 kg/acre.",
            "Foliar spray of Potassium Nitrate (13:0:45) or Sulphate of Potash (0:0:50) @ 10g/L."
        ],
        "safety_interval_phi_days": 0,
        "preventative_measures": "Ensure adequate organic mulch to retain soil potassium reserves."
    },
    "chilli_leaf_curl": {
        "id": "chilli_leaf_curl",
        "crop": "chilli",
        "name_en": "Chilli Leaf Curl & Thrips/Mites",
        "name_kn": "ಮೆಣಸಿನಕಾಯಿ ಮುದುರು ರೋಗ (ನುಸಿ / ಜಿಗಿ)",
        "name_hi": "मिर्च का पर्ण कुंचन (मुरड़ा रोग)",
        "pathogen_type": "Viral & Vector Pest (Thrips/Mites/Whitefly)",
        "causal_agent": "Chilli Leaf Curl Virus transmitted by Bemisia tabaci / Scirtothrips dorsalis",
        "symptoms": "Upward curling (boat-shaped) caused by thrips; downward curling (inverted boat) caused by yellow mites; crinkled, stunted leaves and reduced flowering.",
        "severity_stages": {
            "mild": "Tips of new leaves slightly curled.",
            "moderate": "Upward/downward cupping on top 40% leaves, flower drop.",
            "severe": "Severe rosette stunting, total flower abortion, fruit deformities."
        },
        "organic_remedy": [
            "Spray Agniastra or Dashaparni Kashayam @ 20-30 ml/L.",
            "Foliar spray of Neem Oil (10,000 ppm) @ 3 ml/L + soap solution.",
            "Install Blue & Yellow Sticky Traps @ 15-20 traps per acre."
        ],
        "chemical_remedy": [
            "For Thrips: Spinetoram 11.7% SC @ 1 ml/L or Fipronil 5% SC @ 1.5 ml/L.",
            "For Mites: Diafenthiuron 50% WP @ 1.2 g/L or Spiromesifen 22.9% SC @ 1 ml/L.",
            "For Whitefly: Acetamiprid 20% SP @ 0.5 g/L."
        ],
        "safety_interval_phi_days": 7,
        "preventative_measures": "Erect 2-3 rows of maize/sorghum border crops as live barrier against sucking pests."
    },
    "cotton_pink_bollworm": {
        "id": "cotton_pink_bollworm",
        "crop": "cotton",
        "name_en": "Cotton Pink Bollworm (PBW)",
        "name_kn": "ಹತ್ತಿಯ ಗುಲಾಬಿ ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು",
        "name_hi": "कपास की गुलाबी सुंडी",
        "pathogen_type": "Insect Pest (Lepidoptera)",
        "causal_agent": "Pectinophora gossypiella",
        "symptoms": "Rosetted flowers ('rosette blooms') that fail to open properly; bore holes plugged with excreta in green bolls; stained lint and damaged seeds inside bolls.",
        "severity_stages": {
            "mild": "Rosetted flowers seen in 5% plants.",
            "moderate": "Green boll damage 10-20% upon splitting.",
            "severe": "Severe boll rotting, premature opening, stained discolored lint."
        },
        "organic_remedy": [
            "Install Pheromone Traps (Pectino-lure) @ 8 traps/acre for mass trapping.",
            "Release Trichogramma bactrae @ 60,000/acre at weekly intervals from 45 DAS.",
            "Spray Neem oil 5% or NSKE 5% at flower bud formation stage."
        ],
        "chemical_remedy": [
            "Profenofos 50% EC @ 2 ml/L or Chlorpyrifos 20% EC @ 2.5 ml/L.",
            "Emamectin Benzoate 5% SG @ 0.5 g/L or Indoxacarb 14.5% SC @ 1 ml/L."
        ],
        "safety_interval_phi_days": 21,
        "preventative_measures": "Avoid extending crop beyond 160 days; destroy crop residues after harvest to break lifecycle."
    }
}

# Organic & Natural Farming Preparation Recipes
ORGANIC_RECIPES = {
    "jeevamrutha": {
        "name": "Jeevamrutha (ಜೀವಾಮೃತ / जीवामृत)",
        "purpose": "Soil Microbiome Enrichment & Natural Growth Booster",
        "ingredients": [
            "Fresh Desi Cow Dung: 10 kg",
            "Desi Cow Urine (Gomutra): 5 to 10 Litres",
            "Jaggery (organic / unrefined): 2 kg",
            "Pulse Flour (Gram/Besan): 2 kg",
            "Undisturbed Forest/Farm Basin Soil: Handful (approx 100g)",
            "Water: 200 Litres"
        ],
        "preparation_steps": [
            "1. Take 200L clean water in a plastic drum in the shade.",
            "2. Mix 10kg fresh cow dung and 5-10L gomutra thoroughly.",
            "3. Add 2kg dissolved jaggery and 2kg pulse flour; mix well.",
            "4. Add a handful of virgin soil rich in beneficial micro-organisms.",
            "5. Stir the solution clockwise with a wooden stick for 2-3 minutes twice daily (morning & evening).",
            "6. Cover with a breathable jute bag and allow to ferment for 48 to 72 hours."
        ],
        "application_method": "Apply 200 Litres per acre along with irrigation water (flood/drip) or spray filtered solution @ 10-20% concentration on crops every 15 days."
    },
    "agniastra": {
        "name": "Agniastra (ಅಗ್ನಿಯಾಸ್ತ್ರ / अग्नियास्त्र)",
        "purpose": "Broad-spectrum Natural Pesticide for Leaf Chewers, Bollworms & Borers",
        "ingredients": [
            "Desi Cow Urine: 10 Litres",
            "Neem Leaf Paste: 5 kg",
            "Tobacco Leaves / Powder: 500g",
            "Hot Green Chilli Paste: 500g",
            "Garlic Paste: 500g"
        ],
        "preparation_steps": [
            "1. In an earthen or stainless steel pot, mix 10L cow urine with 5kg crushed neem leaves.",
            "2. Add 500g tobacco powder, 500g green chilli paste, and 500g crushed garlic.",
            "3. Boil the entire mixture on a gentle fire for 20-30 minutes until bubbling.",
            "4. Let the mixture cool down completely and ferment for 48 hours.",
            "5. Filter thoroughly using a fine cotton cloth."
        ],
        "application_method": "Dilute 2 to 3 Litres of Agniastra in 100 Litres of water and spray on crop canopy. Effective against caterpillars, aphids, thrips, and borers."
    },
    "dashaparni": {
        "name": "Dashaparni Kashayam (ದಶಪರ್ಣಿ ಕಷಾಯ / दशपर्णी कषाय)",
        "purpose": "Master Organic Immunity & Multi-pest Repellent",
        "ingredients": [
            "Cow Urine: 20 Litres + Cow Dung: 2 kg",
            "Leaves of 10 Plants (Neem, Pongamia, Custard Apple, Castor, Papaya, Marigold, Guava, Calotropis/Ekkada, Lantana, Tulsi): 2 kg each (Total 20 kg)",
            "Turmeric Powder: 500g + Ginger Paste: 500g",
            "Water: 200 Litres"
        ],
        "preparation_steps": [
            "1. Mix cow dung, cow urine, and crushed leaves of 10 medicinal plants in 200L water.",
            "2. Add crushed ginger, turmeric, garlic, and hot chilli paste.",
            "3. Ferment in shade for 30 to 45 days, stirring clockwise daily.",
            "4. Filter and store in dark containers (shelf life 6 months)."
        ],
        "application_method": "Use 5-6 Litres per 200 Litres water per acre as a protective and curative foliar spray."
    },
    "beejamrutha": {
        "name": "Beejamrutha (ಬೀಜಾಮೃತ / बीजामृत)",
        "purpose": "Organic Seed Treatment for Pathogen Protection & Vigorous Germination",
        "ingredients": [
            "Desi Cow Dung: 5 kg",
            "Desi Cow Urine: 5 Litres",
            "Cow Milk: 1 Litre",
            "Slaked Lime (Chuna): 50 grams",
            "Water: 20 Litres"
        ],
        "preparation_steps": [
            "1. Suspend 5kg cow dung in a cloth bag in 20L water overnight.",
            "2. Squeeze the extract and add 5L cow urine, 1L milk, and dissolved slaked lime.",
            "3. Stir well and let rest for 8-12 hours."
        ],
        "application_method": "Coat seeds lightly with Beejamrutha, dry in shade for 30 minutes, and sow immediately. For seedlings, dip roots for 5 minutes before transplanting."
    }
}

# Major Government Agricultural Schemes & MSP Data
GOVT_SCHEMES = {
    "pm_kisan": {
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "name_kn": "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
        "name_hi": "पीएम किसान सम्मान निधि",
        "benefit": "₹6,000 per year in 3 equal installments of ₹2,000 directly transferred to farmer's Aadhaar-linked bank account (DBT).",
        "eligibility": "All landholding farmer families having cultivable land in their names (subject to exclusion criteria like institutional landholders, income tax payers).",
        "documents_required": ["Aadhaar Card", "Land Ownership Record (RTC / Pahani / 7/12 / Khasra-Khatauni)", "Bank Account Passbook (Aadhaar Seeded)", "Active Mobile Number"],
        "how_to_apply": "Apply via pmkisan.gov.in -> Farmer Corner -> New Farmer Registration, or through nearest CSC (Common Service Center) / Grama One centre."
    },
    "pmfby": {
        "name": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
        "name_kn": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಬೆಳೆ ವಿಮೆ)",
        "name_hi": "प्रधानमंत्री फसल बीमा योजना",
        "benefit": "Comprehensive crop insurance coverage against non-preventable natural risks (drought, flood, pest outbreaks, cyclone, unseasonal rains).",
        "premium_rates": "Kharif Food & Oilseed crops: 2.0% of Sum Insured | Rabi Food & Oilseed crops: 1.5% | Annual Commercial & Horticultural crops: 5.0%.",
        "claim_process": "Report localized calamity (hailstorm, inundation, post-harvest rain) within 72 hours via Crop Insurance App, Toll-Free No 14447, or nearest Agricultural Officer / Bank.",
        "portal": "pmfby.gov.in"
    },
    "kcc": {
        "name": "Kisan Credit Card (KCC)",
        "name_kn": "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
        "name_hi": "किसान क्रेडिट कार्ड",
        "benefit": "Institutional crop credit up to ₹3,00,000 at highly subsidized effective interest rate of 4% per annum (with prompt repayment incentive).",
        "collateral_free": "Collateral-free loan limit up to ₹1.60 Lakh (and up to ₹2 Lakh for tie-up arrangements).",
        "validity": "5 years with annual renewal based on crop pattern."
    },
    "soil_health_card": {
        "name": "Soil Health Card Scheme (SHC)",
        "name_kn": "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ",
        "name_hi": "मृदा स्वास्थ्य कार्ड योजना",
        "benefit": "Free customized report of soil nutrient status (12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) and crop-wise fertilizer dosage recommendations.",
        "how_to_avail": "Contact Village Agriculture Assistant (Raitha Samparka Kendra / Krishi Vigyan Kendra) to collect soil sample from your field."
    },
    "pmksy_drip": {
        "name": "PMKSY - Per Drop More Crop (Micro-Irrigation Subsidy)",
        "name_kn": "ಹನಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ ಸಹಾಯಧನ ಯೋಜನೆ",
        "name_hi": "ड्रिप एवं स्प्रिंकलर सिंचाई सब्सिडी (प्रति बूंद अधिक फसल)",
        "benefit": "45% to 90% government subsidy on Drip and Sprinkler irrigation systems for small, marginal, and general farmers.",
        "subsidy_slab": "Small & Marginal Farmers (up to 5 acres): Up to 90% subsidy in many states (Karnataka/AP/TN/MH); General Farmers: 45% - 70% subsidy.",
        "how_to_apply": "Register on state horticulture/agriculture portal with Land RTC, Aadhaar, Water source proof (borewell/well certificate), and farm sketch."
    }
}

# Multilingual Dialect Dictionary & Quick Starter Prompts
DIALECT_DICTIONARY = {
    "kannada": {
        "lang_code": "kn-IN",
        "lang_name": "ಕನ್ನಡ (Kannada)",
        "app_title": "ಅಗ್ರಿಬಾಟ್ AI - ರೈತರ ಡಿಜಿಟಲ್ ಸಹಾಯಕ",
        "subtitle": "ನಿಮ್ಮ ಕೃಷಿ ಬೆಳೆ ರೋಗ, ಗೊಬ್ಬರದ ಲೆಕ್ಕ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಸರ್ಕಾರದ ಯೋಜನೆಗಳ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ",
        "welcome": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ (AgriBot). ನಿಮ್ಮ ಯಾವುದೇ ಬೆಳೆ ರೋಗ, ನಿಖರ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ, ನೀರಾವರಿ ಅಥವಾ ಸರ್ಕಾರದ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
        "input_placeholder": "ಬೆಳೆ ರೋಗ, ಗೊಬ್ಬರದ ಲೆಕ್ಕ, ಕೀಟ ಬಾಧೆ ಅಥವಾ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ... (ಅಥವಾ ಫೋಟೋ ಲಗತ್ತಿಸಿ)",
        "listening": "ಕೇಳುತ್ತಿದ್ದೇನೆ... ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಮಾತನಾಡಿ...",
        "analyzing": "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        "edge_mode": "ಆಫ್‌ಲೈನ್ ಎಡ್ಜ್ ಮೋಡ್ (ನೆಟ್‌ವರ್ಕ್ ರಹಿತ ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ)",
        "cloud_mode": "ಕ್ಲೌಡ್ ಡೀಪ್ ಕೃಷಿ AI ಎಂಜಿನ್ ಸಕ್ರಿಯ",
        "prompts": [
            "2 ಎಕರೆ ಬತ್ತದ ಬೆಳೆಗೆ ಎಷ್ಟು ಯೂರಿಯಾ ಮತ್ತು ಡಿಎಪಿ ಗೊಬ್ಬರ ಬೇಕು?",
            "ಅಡಿಕೆ ಮರದಲ್ಲಿ ಎಲೆ ಹಳದಿಯಾಗ್ತಿದೆ ಮತ್ತು ಕಾಯಿ ಉದುರುತ್ತಿದೆ, ಪರಿಹಾರವೇನು?",
            "ಟೊಮೇಟೊ ಎಲೆಗಳಲ್ಲಿ ಕಪ್ಪು ಕಲೆಗಳು ಮತ್ತು ಮುಂಚಿನ ಮಚ್ಚೆ ರೋಗ ಬಂದಿದೆ, ಯಾವ ಔಷಧ ಸಿಂಪಡಿಸಬೇಕು?",
            "ಜೀವಾಮೃತ ಮತ್ತು ಅಗ್ನಿಯಾಸ್ತ್ರ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ ತಯಾರಿಸುವ ವಿಧಾನ ತಿಳಿಸಿ",
            "ಪಿಎಂ ಕಿಸಾನ್ ₹6000 ನೋಂದಣಿ ಮತ್ತು ಬೆಳೆ ವಿಮೆ (PMFBY) ಪಡೆಯುವುದು ಹೇಗೆ?",
            "ಮೆಕ್ಕೆಜೋಳದಲ್ಲಿ ಲದ್ದಿ ಹುಳು (Fall Armyworm) ನಿಯಂತ್ರಣಕ್ಕೆ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಮದ್ದು ಯಾವುದು?"
        ]
    },
    "hindi": {
        "lang_code": "hi-IN",
        "lang_name": "हिन्दी (Hindi)",
        "app_title": "एग्रीबॉट AI - किसान मित्र एवं मार्गदर्शक",
        "subtitle": "फसल रोग निदान, सटीक खाद गणना, प्राकृतिक खेती एवं सरकारी योजनाओं का संपूर्ण AI सहायक",
        "welcome": "नमस्ते! मैं आपका कृषि AI सहायक (AgriBot) हूँ। फसल के रोग, खाद की सटीक मात्रा, जैविक खेती या सरकारी योजनाओं के बारे में पूछें।",
        "input_placeholder": "फसल रोग, खाद की मात्रा, कीट नियंत्रण या योजनाओं के बारे में पूछें...",
        "listening": "सुन रहा हूँ... अपनी खेती से जुड़ी समस्या बोलें...",
        "analyzing": "विश्लेषण किया जा रहा है...",
        "edge_mode": "ऑफ़लाइन एज मोड सक्रिय (बिना इंटरनेट)",
        "cloud_mode": "क्लाउड डीप एग्रो-LLM सक्रिय",
        "prompts": [
            "2 एकड़ धान की फसल के लिए यूरिया, डीएपी और पोटाश की सटीक मात्रा बताएं",
            "टमाटर की पत्तियों पर भूरे गोल धब्बे हैं, इसका जैविक व रासायनिक इलाज क्या है?",
            "जीवामृत और ब्रह्मास्त्र घर पर बनाने की पूरी विधि क्या है?",
            "पीएम किसान सम्मान निधि और फसल बीमा (PMFBY) का लाभ कैसे लें?",
            "कपास में गुलाबी सुंडी (Pink Bollworm) की रोकथाम कैसे करें?",
            "1 एकड़ मक्के की बुवाई के लिए कितना बीज और कौन सी खाद डालें?"
        ]
    },
    "telugu": {
        "lang_code": "te-IN",
        "lang_name": "తెలుగు (Telugu)",
        "app_title": "అగ్రిబాట్ AI - రైతు మిత్రుడు",
        "subtitle": "పంట వ్యాధుల నిర్ధారణ, ఎరువుల లెక్కలు మరియు వ్యవసాయ పథకాల AI సహాయకుడు",
        "welcome": "నమస్కారం! నేను మీ అగ్రిబాట్ AI సహాయకుడిని. పంట వ్యాధులు, ఎరువుల మోతాదు, సేంద్రీయ పద్ధతులు లేదా ప్రభుత్వ పథకాల గురించి అడగండి.",
        "input_placeholder": "పంట సమస్యలు, ఎరువుల మోతాదు లేదా పథకాల గురించి అడగండి...",
        "listening": "వింటున్నాను... మాట్లాడండి...",
        "analyzing": "పరిశీలిస్తున్నాను...",
        "edge_mode": "ఆఫ్‌లైన్ ఎడ్జ్ మోడ్",
        "cloud_mode": "క్లౌడ్ డీప్ అగ్రి AI",
        "prompts": [
            "2 ఎకరాల వరి పంటకు ఎంత DAP మరియు యూరియా అవసరం?",
            "టమాటా ఆకులపై నల్లటి మచ్చలు వచ్చాయి, నివారణ ఏమిటి?",
            "జీవామృతం ఎలా తయారు చేసుకోవాలి?",
            "PM-కిసాన్ మరియు పంట బీమా ఎలా నమోదు చేసుకోవాలి?"
        ]
    },
    "tamil": {
        "lang_code": "ta-IN",
        "lang_name": "தமிழ் (Tamil)",
        "app_title": "அக்ரிபாட் AI - உழவன் வழிகாட்டி",
        "subtitle": "பயிர் நோய் கண்டறிதல், உர கணக்கீடு மற்றும் வேளாண் திட்டங்கள்",
        "welcome": "வணக்கம்! நான் உங்கள் அக்ரிபாட் AI உதவியாளர். பயிர் நோய்கள், உர பரிந்துரைகள், இயற்கை விவசாயம் பற்றி கேளுங்கள்.",
        "input_placeholder": "பயிர் நோய், உர அளவு அல்லது திட்டங்கள் பற்றி கேளுங்கள்...",
        "listening": "கேட்கிறேன்... பேசுங்கள்...",
        "analyzing": "ஆராய்கிறது...",
        "edge_mode": "ஆஃப்லைன் முறை",
        "cloud_mode": "கிளவுட் AI முறை",
        "prompts": [
            "2 ஏக்கர் நெல் பயிருக்கு எவ்வளவு யூரியா, டிஏபி தேவை?",
            "தக்காளி இலை கருகல் நோய்க்கு மருந்து என்ன?",
            "ஜீவாமிர்தம் தயாரிக்கும் முறை என்ன?",
            "PM-கிசான் உதவித்தொகை பெறுவது எப்படி?"
        ]
    },
    "marathi": {
        "lang_code": "mr-IN",
        "lang_name": "मराठी (Marathi)",
        "app_title": "अॅग्रीबॉट AI - शेतकरी मित्र",
        "subtitle": "पीक रोग निदान, अचूक खत व्यवस्थापन आणि शासकीय योजना AI मार्गदर्शक",
        "welcome": "नमस्कार! मी तुमचा शेतकरी AI मित्र (AgriBot) आहे. पीक रोग, खतांचे प्रमाण, सेंद्रिय शेती किंवा शासकीय योजनांबद्दल विचारा.",
        "input_placeholder": "पिकाचे आजार, खताचे प्रमाण किंवा योजनांबद्दल विचारा...",
        "listening": "ऐकत आहे... बोला...",
        "analyzing": "विश्लेषण करत आहे...",
        "edge_mode": "ऑफलाईन एज मोड",
        "cloud_mode": "क्लाउड डीप AI",
        "prompts": [
            "२ एकर भात पिकासाठी किती डीएपी आणि युरिया खत लागेल?",
            "टोमॅटोच्या पानांवर काळे डाग पडले आहेत, उपाय काय?",
            "जीवामृत कसे तयार करावे?",
            "पीएम किसान सन्मान निधी आणि पिक विमा कसा मिळवावा?"
        ]
    },
    "english": {
        "lang_code": "en-IN",
        "lang_name": "English",
        "app_title": "AgriBot AI - Farmer AI Guide",
        "subtitle": "Crop Pathology Diagnostics, Precision NPK Dosing, Organic Recipes & Govt Schemes",
        "welcome": "Welcome! I am your AgriBot AI Guide. Ask me anything about crop diseases, exact fertilizer dosages, organic remedies, irrigation schedules, or government subsidy schemes.",
        "input_placeholder": "Ask about crop diseases, fertilizer dosing, pest remedies, subsidies, or attach a photo...",
        "listening": "Listening to your voice... Speak your farming question...",
        "analyzing": "Analyzing with agricultural agronomy engine...",
        "edge_mode": "Offline Edge Mode Active (Fast On-Device Reasoning)",
        "cloud_mode": "Cloud Deep Agricultural LLM Active",
        "prompts": [
            "Calculate exact Urea, DAP, and MOP for 2.5 acres of Paddy.",
            "My tomato leaves have concentric target spots with yellow halos, what is the remedy?",
            "How do I prepare Jeevamrutha and Agniastra for natural pest control?",
            "What are the benefits and registration steps for PM-KISAN and PMFBY Crop Insurance?",
            "How to eliminate Fall Armyworm in Maize using biological and chemical methods?",
            "What is the recommended drip irrigation and seed spacing for 1 acre of Tomato?"
        ]
    }
}
