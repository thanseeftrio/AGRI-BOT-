export const SAMPLE_CROPS = [
  {
    id: "arecanut_koleroga",
    crop_id: "arecanut",
    crop_name: "Areca Nut (ಅಡಿಕೆ)",
    crop_icon: "🌴",
    suspected_disease: "Koleroga / Fruit Rot",
    image_filename: "areca_koleroga_leaf.jpg"
  },
  {
    id: "paddy_blast",
    crop_id: "paddy",
    crop_name: "Paddy / Rice (ಬತ್ತ)",
    crop_icon: "🌾",
    suspected_disease: "Paddy Blast Disease",
    image_filename: "paddy_blast_lesion.jpg"
  },
  {
    id: "tomato_early_blight",
    crop_id: "tomato",
    crop_name: "Tomato (ಟೊಮೇಟೊ)",
    crop_icon: "🍅",
    suspected_disease: "Early Blight (Alternaria)",
    image_filename: "tomato_early_blight.png"
  },
  {
    id: "fall_armyworm",
    crop_id: "maize",
    crop_name: "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    crop_icon: "🌽",
    suspected_disease: "Fall Armyworm (Caterpillar)",
    image_filename: "maize_fall_armyworm.jpg"
  }
];

export const SAMPLE_DIAGNOSTICS = [
  {
    id: "arecanut_koleroga",
    crop: "Areca Nut (ಅಡಿಕೆ)",
    disease: "Koleroga / Mahali (Fruit Rot)",
    disease_kn: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ / ಮಹಾಲಿ",
    imageUrl: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    symptomSummary: "Dark water-soaked rot on unripe arecanuts, white mycelium, extensive nut fall",
    pathogen: "Phytophthora meadii (Fungal Oomycete)",
    riskLevel: "Critical"
  },
  {
    id: "paddy_blast",
    crop: "Paddy / Rice (ಬತ್ತ)",
    disease: "Paddy Blast Disease",
    disease_kn: "ಬತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    imageUrl: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80",
    symptomSummary: "Spindle-shaped lesions with brown margins, grey centers on foliar canopy",
    pathogen: "Magnaporthe oryzae (Pyricularia)",
    riskLevel: "High"
  },
  {
    id: "tomato_early_blight",
    crop: "Tomato (ಟೊಮೇಟೊ)",
    disease: "Early Blight (Alternaria)",
    disease_kn: "ಮುಂಚಿನ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80",
    symptomSummary: "Concentric target-board rings with yellow halos on lower foliage",
    pathogen: "Alternaria solani (Fungal)",
    riskLevel: "Moderate"
  },
  {
    id: "fall_armyworm",
    crop: "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    disease: "Fall Armyworm Infestation",
    disease_kn: "ಮೆಕ್ಕೆಜೋಳದ ಸೈನಿಕ ಹುಳು",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    symptomSummary: "Windowing of leaf tissue, sawdust-like frass in central whorl",
    pathogen: "Spodoptera frugiperda (Insect Pest)",
    riskLevel: "High"
  }
];

export const CROPS_LIST = [
  { id: "paddy", name: "Paddy / Rice (ಬತ್ತ / धान)", category: "Cereal" },
  { id: "arecanut", name: "Areca Nut (ಅಡಿಕೆ / सुपारी)", category: "Plantation" },
  { id: "coconut", name: "Coconut (ತೆಂಗು / नारियल)", category: "Plantation" },
  { id: "maize", name: "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)", category: "Cereal" },
  { id: "tomato", name: "Tomato (ಟೊಮೇಟೊ / टमाटर)", category: "Vegetable" },
  { id: "cotton", name: "Cotton (ಹತ್ತಿ / कपास)", category: "Commercial" },
  { id: "wheat", name: "Wheat (ಗೋಧಿ / गेहूं)", category: "Cereal" },
  { id: "chilli", name: "Chilli / Red Pepper (ಮೆಣಸಿನಕಾಯಿ / मिर्च)", category: "Spices" },
  { id: "pepper", name: "Black Pepper (ಕಾಳುಮೆಣಸು / काली मिर्च)", category: "Spices" },
  { id: "sugarcane", name: "Sugarcane (ಕಬ್ಬು / गन्ना)", category: "Commercial" },
  { id: "coffee", name: "Coffee (ಕಾಫಿ / कॉफी)", category: "Plantation" },
  { id: "banana", name: "Banana (ಬಾಳೆ / केला)", category: "Fruit" }
];
