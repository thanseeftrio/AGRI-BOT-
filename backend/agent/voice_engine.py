"""
Native Dialect Voice Core & Agricultural Intent Parser
Handles Multilingual intent extraction, entity recognition (crop, area, disease, scheme, recipe)
and Speech-to-Text / Text-to-Speech synthesis for Kannada, Hindi, Telugu, Tamil, Marathi, and English.
"""

import re
from typing import Dict, Any, Optional
from backend.agent.knowledge_base import DIALECT_DICTIONARY

class NativeDialectVoiceEngine:
    def __init__(self):
        self.dialects = DIALECT_DICTIONARY

    def detect_language_and_intent(self, transcript: str) -> Dict[str, Any]:
        """
        Detects dialect/language, agricultural domain intent, entities (crop, area, disease, recipe, scheme),
        and extracts parameters for the chatbot reasoning and deterministic tool callers.
        """
        text = transcript.strip()
        lower_text = text.lower()

        # 1. Language Detection
        lang = "english"
        # Kannada / Tulu script (range 0x0C80 - 0x0CFF)
        if any('\u0C80' <= c <= '\u0CFF' for c in text):
            lang = "kannada"
        # Devanagari / Hindi / Marathi script (range 0x0900 - 0x097F)
        elif any('\u0900' <= c <= '\u097F' for c in text):
            if any(w in text for w in ["आहे", "पिकासाठी", "खत", "शेतकरी", "सांगा", "माहिती", "कसे"]):
                lang = "marathi"
            else:
                lang = "hindi"
        # Telugu script (0x0C00 - 0x0C7F)
        elif any('\u0C00' <= c <= '\u0C7F' for c in text):
            lang = "telugu"
        # Tamil script (0x0B80 - 0x0BFF)
        elif any('\u0B80' <= c <= '\u0BFF' for c in text):
            lang = "tamil"

        # 2. Intent Detection
        intent = "general_chat"
        
        # Government schemes
        if any(w in lower_text or w in text for w in [
            "pm kisan", "pm-kisan", "pmfby", "fasal bima", "kcc", "kisan credit card", "soil health card",
            "subsidy", "scheme", "insurance", "loan", "yojana", "compensation",
            "ಪಿಎಂ ಕಿಸಾನ್", "ಬೆಳೆ ವಿಮೆ", "ಸಹಾಯಧನ", "ಯೋಜನೆ", "ಸಾಲ", "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್", "ಕಾರ್ಡ್",
            "पीएम किसान", "फसल बीमा", "योजना", "सब्सिडी", "ऋण", "केसीसी", "मुआवजा"
        ]):
            intent = "govt_schemes"

        # Organic Farming & Natural Remedies
        elif any(w in lower_text or w in text for w in [
            "jeevamrutha", "jeevamrut", "beejamrutha", "agniastra", "brahmastra", "dashaparni", "panchagavya",
            "organic", "natural farming", "desi cow", "cow dung", "bio pesticide", "neem oil", "neem spray",
            "ಜೀವಾಮೃತ", "ಬೀಜಾಮೃತ", "ಅಗ್ನಿಯಾಸ್ತ್ರ", "ದಶಪರ್ಣಿ", "ಪಂಚಗವ್ಯ", "ಸಾವಯವ", "ನೈಸರ್ಗಿಕ ಕೃಷಿ", "ಬೇವಿನ ಎಣ್ಣೆ",
            "जीवामृत", "बीजामृत", "अग्नियास्त्र", "दशपर्णी", "पंचगव्य", "जैविक", "प्राकृतिक खेती", "नीम तेल"
        ]):
            intent = "organic_farming"

        # Fertilizer & NPK Dosages
        elif any(w in lower_text or w in text for w in [
            "fertilizer", "urea", "dap", "mop", "npk", "dose", "dosage", "khad", "gobbara", "khaad", "nutrient",
            "ಗೊಬ್ಬರ", "ಯೂರಿಯಾ", "ಡಿಎಪಿ", "ಪೊಟ್ಯಾಶ್", "ಖಾದ್", "ಉರ್ವರಕ", "ಗೊಬ್ಬರದ", "ಪೋಷಕಾಂಶ",
            "खाद", "यूरिया", "डीएपी", "पोटाश", "उर्वरक", "पोषण", "मात्रा"
        ]):
            intent = "calculate_fertilizer"

        # Crop Diseases & Pest Diagnosis
        elif any(w in lower_text or w in text for w in [
            "disease", "blight", "rot", "koleroga", "pest", "leaf", "spot", "spots", "burn", "wilt", 
            "roga", "seeku", "dava", "medicine", "spray", "caterpillar", "armyworm", "borer", "yellowing", "curl", "fungus",
            "ರೋಗ", "ಸೀಕ್", "ಬೆಂಕಿ", "ಕೊಳೆ", "ಹುಳು", "ಹಳದಿ", "ಚುಕ್ಕೆ", "ಮದ್ದು", "ಔಷಧ", "ಕೀಟ", "ಮುದುರು", "ಲದ್ದಿ",
            "रोग", "कीट", "पत्ती", "धब्बे", "झुलसा", "सड़न", "दवा", "इलाज", "रोकथाम", "सुंडी", "मुरड़ा", "पीलापन"
        ]):
            intent = "diagnose_disease"

        # Irrigation & Water
        elif any(w in lower_text or w in text for w in [
            "irrigation", "water", "drip", "sprinkler", "moisture", "watering", "pump",
            "ನೀರಾವರಿ", "ನೀರು", "ಹನಿ ನೀರಾವರಿ", "ತೇವಾಂಶ", "ಮೋಟಾರ್",
            "सिंचाई", "पानी", "ड्रिप", "स्प्रिंकलर", "नमी"
        ]):
            intent = "calculate_irrigation"

        # Seed Spacing & Density
        elif any(w in lower_text or w in text for w in [
            "seed", "spacing", "bija", "bithane", "plants", "population", "row spacing", "distance",
            "ಬೀಜ", "ಅಂತರ", "ಬಿತ್ತನೆ", "ಸಸಿ", "ಗಿಡಗಳ ಸಂಖ್ಯೆ",
            "बीज", "दूरी", "बुवाई", "पौधे", "बीज दर"
        ]):
            intent = "calculate_seed_spacing"

        # Yield & Market MSP
        elif any(w in lower_text or w in text for w in [
            "yield", "harvest", "iluvari", "profit", "msp", "rate", "price", "income", "cost", "market",
            "ಇಳುವರಿ", "ಲಾಭ", "ಬೆಲೆ", "ಖರ್ಚು", "ಆದಾಯ", "ಮಾರುಕಟ್ಟೆ", "ಎಂಎಸ್ಪಿ",
            "उपज", "उत्पादन", "लाभ", "भाव", "दाम", "कमाई", "मुनाफा", "मंडी", "एमएसपी"
        ]):
            intent = "calculate_yield"

        # 3. Entity Extraction: Crop
        crop = "paddy"
        crop_map = {
            "paddy": ["paddy", "rice", "bhatta", "dhan", "vari", "nellu", "bhat", "ಬತ್ತ", "ಭತ್ತ", "धान", "भात", "వరి", "நெல்"],
            "arecanut": ["arecanut", "areca", "betel", "adike", "supari", "ಅಡಿಕೆ", "ಸುಪಾರಿ", "सुपारी", "अडकित्ता"],
            "coconut": ["coconut", "tengu", "nariyal", "thengu", "kobari", "ತೆಂಗು", "ತೆಂಗಿನ", "ತಾರೆ", "नारियल", "नारळ", "కొబ్బరి", "தேங்காய்"],
            "maize": ["maize", "corn", "mekkejola", "makka", "makkajonna", "cholam", "ಮೆಕ್ಕೆಜೋಳ", "ಜೋಳ", "मक्का", "मका", "మొక్కజొన్న", "மக்காச்சோளம்"],
            "tomato": ["tomato", "tamata", "tometo", "tamatar", "thakkali", "ಟೊಮೇಟೊ", "ಟೊಮೆಟೊ", "टमाटर", "टोमॅटो", "టమాటా", "தக்காளி"],
            "cotton": ["cotton", "hatti", "kapas", "paruthi", "prathi", "ಹತ್ತಿ", "कपास", "कापूस", "పత్తి", "பருத்தி"],
            "wheat": ["wheat", "godhi", "gehun", "gehu", "godhumai", "godhumalu", "ಗೋಧಿ", "गेहूं", "गहू", "గోధుమలు", "கோதுமை"],
            "chilli": ["chilli", "chili", "menasinakai", "mirch", "mirchi", "milagai", "ಮೆಣಸಿನಕಾಯಿ", "ಮೆಣಸು", "मिर्च", "मिरची", "మిరప", "மிளகாய்"],
            "pepper": ["pepper", "kalumenasu", "black pepper", "kali mirch", "kuru milagu", "ಕಾಳುಮೆಣಸು", "काली मिर्च", "काळी मिरी", "నల్ల మిరియాలు", "மிளகு"],
            "sugarcane": ["sugarcane", "kabbu", "ganna", "us", "cheruku", "karumbu", "ಕಬ್ಬು", "गन्ना", "ऊस", "చెరకు", "கரும்பு"],
            "coffee": ["coffee", "kaapi", "ಕಾಫಿ", "कॉफ़ी", "कॉफी", "కాఫీ", "காபி"],
            "banana": ["banana", "bale", "kela", "keli", "arati", "vazhai", "ಬಾಳೆ", "ಬಾಳೆಗಿಡ", "केला", "केळी", "అరటి", "வாழை"]
        }
        for c_name, keywords in crop_map.items():
            if any(k in lower_text or k in text for k in keywords):
                crop = c_name
                break

        # 4. Entity Extraction: Land Area & Unit
        area_value = 1.0
        area_unit = "acre"
        
        match = re.search(r'(\d+(\.\d+)?)\s*(acre|acres|ಎಕರೆ|एकड़|एकर|gunta|guntas|ಗುಂಟೆ|गुंठे|hectare|ha|ಹೆಕ್ಟೇರ್|हेक्टेयर)', text, re.IGNORECASE)
        if match:
            area_value = float(match.group(1))
            matched_u = match.group(3).lower()
            if any(g in matched_u for g in ["gunta", "ಗುಂಟೆ", "गुंठे"]):
                area_unit = "gunta"
            elif any(h in matched_u for h in ["hectare", "ha", "ಹೆಕ್ಟೇರ್", "हेक्टेयर"]):
                area_unit = "hectare"
            else:
                area_unit = "acre"
        else:
            num_match = re.search(r'(\d+(\.\d+)?)', text)
            if num_match:
                try:
                    v = float(num_match.group(1))
                    if 0.1 <= v <= 500:
                        area_value = v
                except ValueError:
                    pass

        return {
            "detected_language": lang,
            "detected_intent": intent,
            "extracted_crop": crop,
            "extracted_area": area_value,
            "extracted_area_unit": area_unit,
            "raw_text": text
        }

voice_engine = NativeDialectVoiceEngine()
