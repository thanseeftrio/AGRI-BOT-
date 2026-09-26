"""
AgriBot Conversational Orchestrator
Empowering farmers with ChatGPT / Claude-grade conversational agronomy intelligence.
Combines deterministic calculation tools, plant pathology diagnosis, organic recipes, and government schemes.
"""

from typing import Dict, Any, List, Optional
from backend.agent.tools import (
    calculate_npk_fertilizer,
    calculate_seed_and_spacing,
    calculate_yield_projection,
    calculate_water_irrigation
)
from backend.agent.vision_engine import vision_engine
from backend.agent.voice_engine import voice_engine
from backend.agent.knowledge_base import (
    CROPS_DATABASE, 
    PATHOLOGY_DATABASE, 
    ORGANIC_RECIPES, 
    GOVT_SCHEMES
)

class AgriBotOrchestrator:
    def __init__(self):
        self.mode = "cloud" # "cloud" (Deep LLM Reasoning) or "edge" (Fast On-Device Reasoning)
        self.default_language = "kannada"
        self.conversation_history: List[Dict[str, Any]] = []

    def set_mode(self, mode: str) -> str:
        """Toggles between 'cloud' and 'edge' mode."""
        clean_mode = mode.lower().strip()
        if clean_mode in ["edge", "local", "offline"]:
            self.mode = "edge"
        else:
            self.mode = "cloud"
        return self.mode

    def process_query(
        self,
        query_text: str,
        image_name: Optional[str] = None,
        language: Optional[str] = None,
        mode_override: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Main Conversational AI Agentic loop:
        1. Analyzes intent, language & entities (crop, area, disease, recipe, scheme).
        2. Dispatches appropriate agricultural calculation tools, vision diagnostics, or knowledge bases.
        3. Formats rich markdown response with interactive cards (Fertilizer card, Disease card, Scheme card, etc.).
        """
        active_mode = mode_override.lower() if mode_override else self.mode
        
        # 1. Parse Voice/Text Intent & Entities
        parsed = voice_engine.detect_language_and_intent(query_text)
        user_lang = language or parsed["detected_language"]
        intent = parsed["detected_intent"]
        crop = parsed["extracted_crop"]
        area = parsed["extracted_area"]
        unit = parsed["extracted_area_unit"]

        # If an image is attached, force disease diagnostic intent
        if image_name:
            intent = "diagnose_disease"

        tool_executed = None
        tool_result = None
        card_type = None
        card_payload = None
        response_text_en = ""
        response_text_localized = ""

        # -------------------------------------------------------------
        # 1. FERTILIZER & NPK DOSING INTENT
        # -------------------------------------------------------------
        if intent == "calculate_fertilizer":
            tool_executed = "calc_npk_fertilizer"
            tool_result = calculate_npk_fertilizer(crop_name=crop, area_value=area, area_unit=unit)
            card_type = "fertilizer_card"
            card_payload = tool_result
            
            dap = tool_result["primary_recommendation"]["dap_kg"]
            urea = tool_result["primary_recommendation"]["urea_kg"]
            mop = tool_result["primary_recommendation"]["mop_kg"]
            cost = tool_result["primary_recommendation"]["total_chemical_cost_inr"]
            fym = tool_result["organic_supplements"]["farmyard_manure_tons"]
            vermi = tool_result["organic_supplements"]["vermicompost_kg"]
            
            response_text_en = (
                f"### 🧪 Precision Fertilizer Dosage for {area} {unit} of {crop.capitalize()}\n\n"
                f"**Chemical Fertilizer Schedule:**\n"
                f"- **DAP (Di-Ammonium Phosphate)**: **{dap} kg** ({tool_result['primary_recommendation']['dap_50kg_bags']} bags of 50kg)\n"
                f"- **Urea**: **{urea} kg** ({tool_result['primary_recommendation']['urea_50kg_bags']} bags of 50kg)\n"
                f"- **MOP (Muriate of Potash)**: **{mop} kg** ({tool_result['primary_recommendation']['mop_50kg_bags']} bags of 50kg)\n"
                f"- **Estimated Chemical Cost**: **₹{cost:,.2f}**\n\n"
                f"**🌿 Organic Basal Supplement:**\n"
                f"- Apply **{fym} tons** of Farmyard Manure (FYM) or **{vermi} kg** Vermicompost before sowing.\n\n"
                f"**Split Application Advice:** Apply 100% DAP and 50% MOP as basal dose during sowing. Apply Urea in 2-3 equal splits during vegetative growth and flowering."
            )
            
            if user_lang == "kannada":
                response_text_localized = (
                    f"### 🧪 ನಿಮ್ಮ {area} {unit} {tool_result['crop_name']} ಬೆಳೆಗೆ ನಿಖರ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ\n\n"
                    f"**ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ ಶಿಫಾರಸು:**\n"
                    f"- **ಡಿಎಪಿ (DAP)**: **{dap} ಕೆ.ಜಿ** ({tool_result['primary_recommendation']['dap_50kg_bags']} ಚೀಲ)\n"
                    f"- **ಯೂರಿಯಾ (Urea)**: **{urea} ಕೆ.ಜಿ** ({tool_result['primary_recommendation']['urea_50kg_bags']} ಚೀಲ)\n"
                    f"- **ಪೊಟ್ಯಾಶ್ (MOP)**: **{mop} ಕೆ.ಜಿ** ({tool_result['primary_recommendation']['mop_50kg_bags']} ಚೀಲ)\n"
                    f"- **ಅಂದಾಜು ಖರ್ಚು**: **₹{cost:,.2f}**\n\n"
                    f"**🌿 ಸಾವಯವ ಗೊಬ್ಬರ:** ಬಿತ್ತನೆಗೆ ಮುನ್ನ **{fym} ಟನ್** ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಅಥವಾ **{vermi} ಕೆ.ಜಿ** ಎರೆಹುಳು ಗೊಬ್ಬರ ಹಾಕಿ.\n\n"
                    f"**ಸಿಂಪರಣಾ ಸಲಹೆ:** ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಡಿಎಪಿ ಪೂರ್ಣ ಪ್ರಮಾಣ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಅರ್ಧ ಪ್ರಮಾಣ ಹಾಕಿ. ಯೂರಿಯಾವನ್ನು ೨-೩ ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ."
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 🧪 {area} {unit} {crop} की फसल के लिए सटीक खाद अनुशंसा\n\n"
                    f"**रासायनिक उर्वरक मात्रा:**\n"
                    f"- **डीएपी (DAP)**: **{dap} किग्रा** ({tool_result['primary_recommendation']['dap_50kg_bags']} बोरी)\n"
                    f"- **यूरिया (Urea)**: **{urea} किग्रा** ({tool_result['primary_recommendation']['urea_50kg_bags']} बोरी)\n"
                    f"- **पोटाश (MOP)**: **{mop} किग्रा** ({tool_result['primary_recommendation']['mop_50kg_bags']} बोरी)\n"
                    f"- **अनुमानित खाद लागत**: **₹{cost:,.2f}**\n\n"
                    f"**🌿 जैविक खाद:** बुवाई से पहले **{fym} टन** सड़ी गोबर खाद या **{vermi} किग्रा** केंचुआ खाद डालें।\n\n"
                    f"**डोज़ बांटने की सलाह:** डीएपी की पूरी और पोटाश की आधी मात्रा बुवाई के समय बेसल डोज़ के रूप में दें। यूरिया को २-३ बार में दें।"
                )
            elif user_lang == "telugu":
                response_text_localized = (
                    f"### 🧪 మీ {area} {unit} {crop} పంటకు ఎరువుల మోతాదు\n\n"
                    f"- **DAP**: **{dap} కిలోలు** ({tool_result['primary_recommendation']['dap_50kg_bags']} బస్తాలు)\n"
                    f"- **యూరియా**: **{urea} కిలోలు** ({tool_result['primary_recommendation']['urea_50kg_bags']} బస్తాలు)\n"
                    f"- **MOP పొటాష్**: **{mop} కిలోలు** ({tool_result['primary_recommendation']['mop_50kg_bags']} బస్తాలు)\n"
                    f"- **ఖర్చు**: ₹{cost:,.2f}\n"
                    f"- **సేంద్రీయ ఎరువు**: {fym} టన్నుల పశువుల ఎరువు వేయండి."
                )

        # -------------------------------------------------------------
        # 2. CROP DISEASE & PEST DIAGNOSIS INTENT
        # -------------------------------------------------------------
        elif intent == "diagnose_disease":
            tool_executed = "diagnose_crop_disease"
            tool_result = vision_engine.diagnose_image(
                image_name=image_name or query_text,
                crop_hint=crop,
                mode=active_mode
            )
            card_type = "disease_diagnosis_card"
            card_payload = tool_result
            
            d_name = tool_result["disease_name_en"]
            conf = tool_result["confidence_score"]
            sev = tool_result["severity_level"]
            dmg = tool_result["foliar_damage_percentage"]
            org_rems = "\n".join([f"- {r}" for r in tool_result["organic_remedy"]])
            chem_rems = "\n".join([f"- {r}" for r in tool_result["chemical_remedy"]])
            phi = tool_result["safety_interval_phi_days"]

            symptoms_text = tool_result.get("symptoms_observed") or tool_result.get("symptoms", "")

            response_text_en = (
                f"### 🩺 Plant Pathology Diagnosis: **{d_name}**\n\n"
                f"- **Confidence Score**: **{conf}%** | **Severity**: **{sev.upper()}** ({dmg}% leaf damage)\n"
                f"- **Pathogen / Causal Agent**: {tool_result['pathogen_type']} (*{tool_result['causal_agent']}*)\n"
                f"- **Symptoms**: {symptoms_text}\n\n"
                f"#### 🌿 Organic & Biological Remedy (Safe for Soil & Pollinators):\n{org_rems}\n\n"
                f"#### 🧪 Targeted Chemical Spray (Emergency Control):\n{chem_rems}\n\n"
                f"⚠️ **Pre-Harvest Safety Interval (PHI)**: Wait at least **{phi} days** after chemical spraying before harvesting crops."
            )

            if user_lang == "kannada":
                response_text_localized = (
                    f"### 🩺 ಬೆಳೆ ರೋಗ ತಪಾಸಣಾ ವರದಿ: **{tool_result.get('disease_name_kn', d_name)}**\n\n"
                    f"- **ಖಚಿತತೆ (Confidence)**: **{conf}%** | **ರೋಗದ ತೀವ್ರತೆ**: **{sev.upper()}** ({dmg}% ಎಲೆ ಹಾನಿ)\n"
                    f"- **ರೋಗಕಾರಕ**: {tool_result['pathogen_type']} (*{tool_result['causal_agent']}*)\n"
                    f"- **ರೋಗದ ಲಕ್ಷಣಗಳು**: {symptoms_text}\n\n"
                    f"#### 🌿 ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಪರಿಹಾರ:\n{org_rems}\n\n"
                    f"#### 🧪 ರಾಸಾಯನಿಕ ಸಿಂಪರಣೆ ಔಷಧ:\n{chem_rems}\n\n"
                    f"⚠️ **ಸುರಕ್ಷತಾ ಅವಧಿ (PHI)**: ಔಷಧ ಸಿಂಪಡಿಸಿದ ನಂತರ ಕಟಾವಿಗೆ ಕನಿಷ್ಠ **{phi} ದಿನಗಳ** ಅಂತರವಿರಲಿ."
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 🩺 फसल रोग निदान रिपोर्ट: **{tool_result.get('disease_name_hi', d_name)}**\n\n"
                    f"- **सटीकता (Confidence)**: **{conf}%** | **गंभीरता**: **{sev.upper()}** ({dmg}% पत्ती क्षति)\n"
                    f"- **रोगजनक**: {tool_result['pathogen_type']} (*{tool_result['causal_agent']}*)\n"
                    f"- **लक्षण**: {symptoms_text}\n\n"
                    f"#### 🌿 जैविक एवं प्राकृतिक उपचार:\n{org_rems}\n\n"
                    f"#### 🧪 सटीक रासायनिक कीटनाशक/फफूंदनाशक:\n{chem_rems}\n\n"
                    f"⚠️ **सुरक्षा अंतराल (PHI)**: छिड़काव के बाद कटाई से पहले कम से कम **{phi} दिन** प्रतीक्षा करें।"
                )

        # -------------------------------------------------------------
        # 3. ORGANIC & NATURAL FARMING RECIPES INTENT
        # -------------------------------------------------------------
        elif intent == "organic_farming":
            tool_executed = "fetch_organic_recipe"
            recipe_key = "jeevamrutha"
            if any(w in query_text.lower() for w in ["agniastra", "ಅಗ್ನಿಯಾಸ್ತ್ರ", "अग्नियास्त्र"]):
                recipe_key = "agniastra"
            elif any(w in query_text.lower() for w in ["dashaparni", "ದಶಪರ್ಣಿ", "दशपर्णी"]):
                recipe_key = "dashaparni"
            elif any(w in query_text.lower() for w in ["beejamrutha", "ಬೀಜಾಮೃತ", "बीजामृत"]):
                recipe_key = "beejamrutha"
            
            recipe = ORGANIC_RECIPES.get(recipe_key, ORGANIC_RECIPES["jeevamrutha"])
            card_type = "organic_recipe_card"
            card_payload = recipe
            
            ing_list = "\n".join([f"- {i}" for i in recipe["ingredients"]])
            step_list = "\n".join([f"{s}" for s in recipe["preparation_steps"]])

            response_text_en = (
                f"### 🌿 {recipe['name']} Preparation Guide\n\n"
                f"**🎯 Purpose**: {recipe['purpose']}\n\n"
                f"#### 🛒 Required Ingredients:\n{ing_list}\n\n"
                f"#### 🥣 Step-by-Step Preparation Method:\n{step_list}\n\n"
                f"#### 💧 Application Instructions:\n{recipe['application_method']}"
            )

            if user_lang == "kannada":
                response_text_localized = (
                    f"### 🌿 {recipe['name']} ತಯಾರಿಸುವ ವಿಧಾನ\n\n"
                    f"**🎯 ಉದ್ದೇಶ**: {recipe['purpose']}\n\n"
                    f"#### 🛒 ಬೇಕಾಗುವ ಸಾಮಗ್ರಿಗಳು:\n{ing_list}\n\n"
                    f"#### 🥣 ಹಂತ-ಹಂತವಾಗಿ ತಯಾರಿಸುವ ವಿಧಾನ:\n{step_list}\n\n"
                    f"#### 💧 ಬಳಸುವ ವಿಧಾನ:\n{recipe['application_method']}"
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 🌿 {recipe['name']} बनाने की विधि\n\n"
                    f"**🎯 उद्देश्य**: {recipe['purpose']}\n\n"
                    f"#### 🛒 आवश्यक सामग्री:\n{ing_list}\n\n"
                    f"#### 🥣 बनाने की चरणबद्ध विधि:\n{step_list}\n\n"
                    f"#### 💧 प्रयोग का तरीका:\n{recipe['application_method']}"
                )

        # -------------------------------------------------------------
        # 4. GOVERNMENT SCHEMES & MSP INTENT
        # -------------------------------------------------------------
        elif intent == "govt_schemes":
            tool_executed = "fetch_govt_scheme"
            scheme_key = "pm_kisan"
            if any(w in query_text.lower() for w in ["pmfby", "fasal bima", "insurance", "ವಿಮೆ", "बीमा"]):
                scheme_key = "pmfby"
            elif any(w in query_text.lower() for w in ["kcc", "credit card", "ಕ್ರೆಡಿಟ್", "कार्ड"]):
                scheme_key = "kcc"
            elif any(w in query_text.lower() for w in ["drip", "sprinkler", "ಹನಿ", "ड्रिप"]):
                scheme_key = "pmksy_drip"
            elif any(w in query_text.lower() for w in ["soil", "ಮಣ್ಣು", "मृदा"]):
                scheme_key = "soil_health_card"

            scheme = GOVT_SCHEMES.get(scheme_key, GOVT_SCHEMES["pm_kisan"])
            card_type = "govt_scheme_card"
            card_payload = scheme

            response_text_en = (
                f"### 🏛️ {scheme['name']}\n\n"
                f"**💰 Key Benefits**: {scheme['benefit']}\n\n"
                f"**👥 Eligibility**: {scheme.get('eligibility', 'All registered farmers.')}\n\n"
                f"**📄 Required Documents**: {', '.join(scheme.get('documents_required', ['Aadhaar', 'Land Record (RTC)', 'Bank Passbook']))}\n\n"
                f"**📝 How to Apply**: {scheme.get('how_to_apply', 'Apply at nearest CSC / Agriculture department office.')}"
            )

            if user_lang == "kannada":
                response_text_localized = (
                    f"### 🏛️ {scheme.get('name_kn', scheme['name'])}\n\n"
                    f"**💰 ಪ್ರಮುಖ ಸೌಲಭ್ಯ**: {scheme['benefit']}\n\n"
                    f"**👥 ಅರ್ಹತೆ**: {scheme.get('eligibility', 'ಎಲ್ಲಾ ಭೂಹಿಡುವಳಿ ಹೊಂದಿರುವ ರೈತರು.')}\n\n"
                    f"**📄 ಬೇಕಾಗುವ ದಾಖಲೆಗಳು**: {', '.join(scheme.get('documents_required', ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಪಹಣಿ (RTC)', 'ಬ್ಯಾಂಕ್ ಪಾಸ್ ಬುಕ್']))}\n\n"
                    f"**📝 ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ**: {scheme.get('how_to_apply', 'ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ / ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.')}"
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 🏛️ {scheme.get('name_hi', scheme['name'])}\n\n"
                    f"**💰 मुख्य लाभ**: {scheme['benefit']}\n\n"
                    f"**👥 पात्रता**: {scheme.get('eligibility', 'सभी भूमिधारक किसान.')}\n\n"
                    f"**📄 आवश्यक दस्तावेज**: {', '.join(scheme.get('documents_required', ['आधार कार्ड', 'खसरा-खतौनी/जमीन पर्चा', 'बैंक पासबुक']))}\n\n"
                    f"**📝 आवेदन प्रक्रिया**: {scheme.get('how_to_apply', 'नजदीकी सीएससी केंद्र या कृषि विभाग में आवेदन करें.')}"
                )

        # -------------------------------------------------------------
        # 5. SEED SPACING & BLUEPRINT INTENT
        # -------------------------------------------------------------
        elif intent == "calculate_seed_spacing":
            tool_executed = "calc_seed_spacing"
            tool_result = calculate_seed_and_spacing(crop_name=crop, area_value=area, area_unit=unit)
            card_type = "seed_spacing_card"
            card_payload = tool_result
            
            response_text_en = (
                f"### 🌾 Seed & Spacing Blueprint for {area} {unit} of {crop.capitalize()}\n\n"
                f"- **Total Seed Required**: **{tool_result['total_seed_required_kg']} kg**\n"
                f"- **Row-to-Row Spacing**: **{tool_result['recommended_spacing']['row_to_row']}**\n"
                f"- **Plant-to-Plant Spacing**: **{tool_result['recommended_spacing']['plant_to_plant']}**\n"
                f"- **Estimated Plant Population**: **{tool_result['estimated_plant_population']['total_field_plants']:,} plants**\n"
                f"- **Seed Treatment Protocol**: {tool_result['seed_treatment_protocol']}"
            )
            if user_lang == "kannada":
                response_text_localized = (
                    f"### 🌾 {area} {unit} {tool_result['crop_name']} ಬೆಳೆಗೆ ಬೀಜ ಮತ್ತು ಸಾಲುಗಳ ಅಂತರ\n\n"
                    f"- **ಒಟ್ಟು ಬೇಕಾಗುವ ಬೀಜ**: **{tool_result['total_seed_required_kg']} ಕೆ.ಜಿ**\n"
                    f"- **ಸಾಲಿನಿಂದ ಸಾಲಿಗೆ ಅಂತರ**: **{tool_result['recommended_spacing']['row_to_row']}**\n"
                    f"- **ಗಿಡದಿಂದ ಗಿಡಕ್ಕೆ ಅಂತರ**: **{tool_result['recommended_spacing']['plant_to_plant']}**\n"
                    f"- **ಒಟ್ಟು ಸಸಿಗಳ ಸಂಖ್ಯೆ**: **{tool_result['estimated_plant_population']['total_field_plants']:,} ಗಿಡಗಳು**\n"
                    f"- **ಬೀಜೋಪಚಾರ**: {tool_result['seed_treatment_protocol']}"
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 🌾 {area} {unit} {crop} के लिए बीज दर एवं दूरी\n\n"
                    f"- **कुल बीज आवश्यकता**: **{tool_result['total_seed_required_kg']} किग्रा**\n"
                    f"- **कतार से कतार की दूरी**: **{tool_result['recommended_spacing']['row_to_row']}**\n"
                    f"- **पौधे से पौधे की दूरी**: **{tool_result['recommended_spacing']['plant_to_plant']}**\n"
                    f"- **कुल पौधों की संख्या**: **{tool_result['estimated_plant_population']['total_field_plants']:,} पौधे**\n"
                    f"- **बीज उपचार विधि**: {tool_result['seed_treatment_protocol']}"
                )

        # -------------------------------------------------------------
        # 6. YIELD & PROFITABILITY FORECAST INTENT
        # -------------------------------------------------------------
        elif intent == "calculate_yield":
            tool_executed = "calc_yield_projection"
            tool_result = calculate_yield_projection(crop_name=crop, area_value=area, area_unit=unit)
            card_type = "yield_profit_card"
            card_payload = tool_result
            
            q = tool_result["projected_yield"]["total_quintals"]
            t = tool_result["projected_yield"]["total_metric_tonnes"]
            rev = tool_result["economics"]["projected_gross_revenue_inr"]
            cost = tool_result["economics"]["estimated_production_cost_inr"]
            profit = tool_result["economics"]["estimated_net_profit_inr"]
            roi = tool_result["economics"]["return_on_investment_roi_pct"]

            response_text_en = (
                f"### 💰 Harvest Yield & Revenue Forecast for {area} {unit} of {crop.capitalize()}\n\n"
                f"- **Projected Yield**: **{q} Quintals** ({t} Metric Tonnes)\n"
                f"- **Gross Revenue (at MSP/Market)**: **₹{rev:,.2f}**\n"
                f"- **Estimated Production Cost**: **₹{cost:,.2f}**\n"
                f"- **Estimated Net Profit**: **₹{profit:,.2f}**\n"
                f"- **Return on Investment (ROI)**: **{roi}%**"
            )
            if user_lang == "kannada":
                response_text_localized = (
                    f"### 💰 {area} {unit} {tool_result['crop_name']} ಇಳುವರಿ ಮತ್ತು ಆದಾಯ ವರದಿ\n\n"
                    f"- **ನಿರೀಕ್ಷಿತ ಇಳುವರಿ**: **{q} ಕ್ವಿಂಟಾಲ್** ({t} ಮೆಟ್ರಿಕ್ ಟನ್)\n"
                    f"- **ಒಟ್ಟು ನಿರೀಕ್ಷಿತ ಆದಾಯ**: **₹{rev:,.2f}**\n"
                    f"- **ಅಂದಾಜು ಕೃಷಿ ಖರ್ಚು**: **₹{cost:,.2f}**\n"
                    f"- **ನಿವ್ವಳ ಲಾಭ (Net Profit)**: **₹{profit:,.2f}**\n"
                    f"- **ಲಾಭಾಂಶ (ROI)**: **{roi}%**"
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 💰 {area} {unit} {crop} उपज एवं मुनाफा रिपोर्ट\n\n"
                    f"- **अनुमानित कुल उपज**: **{q} क्विंटल** ({t} मीट्रिक टन)\n"
                    f"- **कुल अनुमानित आय (MSP)**: **₹{rev:,.2f}**\n"
                    f"- **उत्पादन लागत**: **₹{cost:,.2f}**\n"
                    f"- **शुद्ध मुनाफा (Net Profit)**: **₹{profit:,.2f}**\n"
                    f"- **मुनाफा दर (ROI)**: **{roi}%**"
                )

        # -------------------------------------------------------------
        # 7. IRRIGATION & WATER REQUIREMENT INTENT
        # -------------------------------------------------------------
        elif intent == "calculate_irrigation":
            tool_executed = "calc_irrigation"
            tool_result = calculate_water_irrigation(crop_name=crop, area_value=area, area_unit=unit)
            card_type = "irrigation_card"
            card_payload = tool_result
            
            litres = tool_result["irrigation_demand"]["total_water_litres"]
            hours = tool_result["pump_runtime_estimate_hours"]["5hp_pump_hours"]
            status = tool_result["irrigation_demand"]["status"]

            response_text_en = (
                f"### 💧 Irrigation & Water Demand for {area} {unit} of {crop.capitalize()}\n\n"
                f"- **Soil Moisture Status**: **{status.upper()}**\n"
                f"- **Total Water Needed**: **{litres:,} Litres**\n"
                f"- **Recommended 5 HP Pump Runtime**: **{hours} Hours**\n"
                f"- **Irrigation Strategy**: Apply water in early morning or evening hours through drip to minimize evaporation."
            )
            if user_lang == "kannada":
                response_text_localized = (
                    f"### 💧 {area} {unit} {tool_result['crop_name']} ನೀರಾವರಿ ಅಗತ್ಯತೆ\n\n"
                    f"- **ಮಣ್ಣಿನ ತೇವಾಂಶ ಸ್ಥಿತಿ**: **{status.upper()}**\n"
                    f"- **ಬೇಕಾಗುವ ಒಟ್ಟು ನೀರು**: **{litres:,} ಲೀಟರ್**\n"
                    f"- **5 HP ಮೋಟಾರ್ ಚಾಲನೆ ಸಮಯ**: **{hours} ಗಂಟೆಗಳು**\n"
                    f"- **ಸಲಹೆ**: ನೀರನ್ನು ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ವೇಳೆ ಹನಿ ನೀರಾವರಿ ಮೂಲಕ ನೀಡಿ."
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"### 💧 {area} {unit} {crop} सिंचाई एवं जल आवश्यकता\n\n"
                    f"- **मृदा नमी स्थिति**: **{status.upper()}**\n"
                    f"- **कुल आवश्यक पानी**: **{litres:,} लीटर**\n"
                    f"- **5 HP पंप चलाने का समय**: **{hours} घंटे**\n"
                    f"- **सलाह**: वाष्पीकरण से बचने के लिए सुबह या शाम को ड्रिप द्वारा सिंचाई करें।"
                )

        # -------------------------------------------------------------
        # 8. GENERAL FARMING ASSISTANCE & DIALOGUE
        # -------------------------------------------------------------
        else:
            response_text_en = (
                f"Hello! I am **AgriBot**, your dedicated AI Agricultural Guide.\n\n"
                f"You can ask me anything about your farm:\n"
                f"- 🧪 **Fertilizer & NPK Dosing**: *'Calculate DAP and Urea for 2 acres of Paddy'* \n"
                f"- 🩺 **Crop Disease Diagnosis**: *'My tomato leaves have yellow spots'* or attach a photo\n"
                f"- 🌿 **Organic Farming**: *'How to prepare Jeevamrutha or Agniastra?'*\n"
                f"- 🏛️ **Govt Subsidies & Schemes**: *'How to get PM-KISAN ₹6000 or PMFBY crop insurance?'*\n"
                f"- 🌾 **Seed Spacing & Yield Forecasts**: *'Seed rate and expected yield for 1 acre Maize'*\n\n"
                f"How can I help your farm today?"
            )
            if user_lang == "kannada":
                response_text_localized = (
                    f"ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ **ಕೃಷಿ AI ಸಹಾಯಕ (AgriBot)**.\n\n"
                    f"ನಿಮ್ಮ ಕೃಷಿ ಬಗ್ಗೆ ನೀವು ಕೇಳಬಹುದು:\n"
                    f"- 🧪 **ಗೊಬ್ಬರದ ನಿಖರ ಲೆಕ್ಕ**: *'೨ ಎಕರೆ ಬತ್ತಕ್ಕೆ ಎಷ್ಟು ಡಿಎಪಿ ಮತ್ತು ಯೂರಿಯಾ ಬೇಕು?'*\n"
                    f"- 🩺 **ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ**: *'ಅಡಿಕೆ ಮರದಲ್ಲಿ ಎಲೆ ಹಳದಿಯಾಗ್ತಿದೆ'* ಅಥವಾ ಎಲೆಯ ಫೋಟೋ ಲಗತ್ತಿಸಿ\n"
                    f"- 🌿 **ಸಾವಯವ ಕೃಷಿ**: *'ಜೀವಾಮೃತ ಮತ್ತು ಅಗ್ನಿಯಾಸ್ತ್ರ ತಯಾರಿಸುವ ವಿಧಾನ'* \n"
                    f"- 🏛️ **ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು**: *'ಪಿಎಂ ಕಿಸಾನ್ ಮತ್ತು ಬೆಳೆ ವಿಮೆ (PMFBY) ಪಡೆಯುವುದು ಹೇಗೆ?'*\n"
                    f"- 🌾 **ಬೀಜ ಮತ್ತು ಇಳುವರಿ**: *'೧ ಎಕರೆ ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಎಷ್ಟು ಬೀಜ ಮತ್ತು ಎಷ್ಟು ಲಾಭ?'*\n\n"
                    f"ಇಂದು ನಿಮ್ಮ ಕೃಷಿಗೆ ನಾನು ಹೇಗೆ ನೆರವಾಗಲಿ?"
                )
            elif user_lang == "hindi":
                response_text_localized = (
                    f"नमस्ते! मैं आपका **कृषि AI सहायक (AgriBot)** हूँ।\n\n"
                    f"आप अपनी खेती के बारे में मुझसे पूछ सकते हैं:\n"
                    f"- 🧪 **सटीक खाद गणना**: *'२ एकड़ धान के लिए डीएपी और यूरिया कितना लगेगा?'*\n"
                    f"- 🩺 **फसल रोग निदान**: *'टमाटर की पत्ती पर धब्बे हैं'* या पौधे का फोटो भेजें\n"
                    f"- 🌿 **जैविक खेती**: *'जीवामृत या अग्नियास्त्र कैसे बनाएं?'*\n"
                    f"- 🏛️ **सरकारी योजनाएं**: *'पीएम किसान ₹6000 और फसल बीमा कैसे पाएं?'*\n"
                    f"- 🌾 **बीज व उपज**: *'१ एकड़ मक्के के लिए कितना बीज और कितनी उपज?'*\n\n"
                    f"आज आपकी खेती में किस प्रकार सहायता करूँ?"
                )
            elif user_lang == "telugu":
                response_text_localized = (
                    f"నమస్కారం! నేను మీ **అగ్రిబాట్ AI** సహాయకుడిని.\n\n"
                    f"మీ పంటల గురించి నన్ను అడగవచ్చు:\n"
                    f"- 🧪 **ఎరువుల మోతాదు**: DAP, యూరియా లెక్కలు\n"
                    f"- 🩺 **పంట వ్యాధులు**: ఆకుల ఫోటో లేదా లక్షణాలు\n"
                    f"- 🌿 **సేంద్రీయ పద్ధతులు**: జీవామృతం తయారీ\n"
                    f"- 🏛️ **ప్రభుత్వ పథకాలు**: PM-కిసాన్, పంట బీమా\n\n"
                    f"ఈరోజు నేను మీకు ఎలా సహాయపడగలను?"
                )

        final_spoken_text = response_text_localized if response_text_localized else response_text_en
        # Strip markdown syntax for clean voice synthesis
        clean_voice_text = final_spoken_text.replace('#', '').replace('*', '').replace('-', '').replace('•', '')

        output = {
            "query": query_text,
            "detected_intent": intent,
            "detected_language": user_lang,
            "mode": active_mode.upper(),
            "tool_executed": tool_executed,
            "tool_data": tool_result,
            "card_type": card_type,
            "card_payload": card_payload,
            "response_text_en": response_text_en,
            "response_text_localized": response_text_localized or response_text_en,
            "spoken_audio_transcript": clean_voice_text,
            "offline_executable": True
        }

        self.conversation_history.append(output)
        return output

# Global Orchestrator Singleton
agri_orchestrator = AgriBotOrchestrator()
