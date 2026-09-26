"""
Unit and Integration Tests for AgriBot AI Agricultural Assistant
Institution: Manglore Institute of Technology & Engineering (MITE)
"""

import pytest
from backend.agent.tools import (
    convert_to_acres,
    calculate_npk_fertilizer,
    calculate_seed_and_spacing,
    calculate_yield_projection,
    calculate_water_irrigation
)
from backend.agent.vision_engine import vision_engine
from backend.agent.voice_engine import voice_engine
from backend.agent.orchestrator import agri_orchestrator

def test_unit_conversion():
    assert convert_to_acres(1.0, "acre") == 1.0
    assert convert_to_acres(40.0, "gunta") == 1.0
    assert round(convert_to_acres(1.0, "hectare"), 2) == 2.47
    assert convert_to_acres(100.0, "cent") == 1.0

def test_npk_fertilizer_calculation():
    # 1 acre of paddy standard
    res = calculate_npk_fertilizer("paddy", area_value=1.0, area_unit="acre")
    assert res["standard_acres"] == 1.0
    assert res["primary_recommendation"]["dap_kg"] > 0
    assert res["primary_recommendation"]["urea_kg"] > 0
    assert res["primary_recommendation"]["mop_kg"] > 0
    assert res["primary_recommendation"]["total_chemical_cost_inr"] > 0
    assert len(res["split_schedule"]) > 0

def test_seed_spacing_calculation():
    res = calculate_seed_and_spacing("paddy", area_value=2.0, area_unit="acre", planting_method="transplanting")
    assert res["total_seed_required_kg"] == 24.0 # 12kg * 2
    assert res["estimated_plant_population"]["total_field_plants"] > 0

def test_yield_projection():
    res = calculate_yield_projection("maize", area_value=3.0, area_unit="acre")
    assert res["projected_yield"]["total_quintals"] > 0
    assert res["economics"]["projected_gross_revenue_inr"] > 0
    assert res["economics"]["estimated_net_profit_inr"] > 0

def test_water_irrigation():
    res = calculate_water_irrigation("tomato", area_value=1.5, current_soil_moisture_pct=22.0)
    assert res["water_deficit_mm"] > 0
    assert res["net_water_required_litres"] > 0
    assert "CRITICAL" in res["status_alert"]

def test_vision_diagnostic_engine():
    res_edge = vision_engine.diagnose_image(image_name="areca_koleroga_leaf.jpg", crop_hint="arecanut", mode="edge")
    assert res_edge["disease_id"] == "arecanut_koleroga"
    assert res_edge["confidence_score"] > 80.0
    assert len(res_edge["organic_remedy"]) > 0
    assert len(res_edge["chemical_remedy"]) > 0

    res_cloud = vision_engine.diagnose_image(image_name="tomato_early_blight.png", crop_hint="tomato", mode="cloud")
    assert res_cloud["disease_id"] == "tomato_early_blight"
    assert res_cloud["confidence_score"] > 90.0

def test_voice_engine_detection():
    # Kannada query
    parsed_kn = voice_engine.detect_language_and_intent("ನನ್ನ 2 ಎಕರೆ ಬತ್ತದ ಬೆಳೆಗೆ ಎಷ್ಟು ಯೂರಿಯಾ ಗೊಬ್ಬರ ಬೇಕು?")
    assert parsed_kn["detected_language"] == "kannada"
    assert parsed_kn["detected_intent"] == "calculate_fertilizer"
    assert parsed_kn["extracted_crop"] == "paddy"
    assert parsed_kn["extracted_area"] == 2.0

    # Hindi query
    parsed_hi = voice_engine.detect_language_and_intent("टमाटर की पत्तियों पर धब्बे हैं दवा बताओ")
    assert parsed_hi["detected_language"] == "hindi"
    assert parsed_hi["detected_intent"] == "diagnose_disease"

    # Organic recipe query
    parsed_org = voice_engine.detect_language_and_intent("How to make Jeevamrutha at home?")
    assert parsed_org["detected_intent"] == "organic_farming"

    # Scheme query
    parsed_sch = voice_engine.detect_language_and_intent("How to apply for PM-KISAN subsidy?")
    assert parsed_sch["detected_intent"] == "govt_schemes"

def test_orchestrator_end_to_end():
    # Test Kannada Fertilizer query
    out1 = agri_orchestrator.process_query("2 ಎಕರೆ ಅಡಿಕೆ ತೋಟಕ್ಕೆ ಎಷ್ಟು ಡಿಎಪಿ ಬೇಕು?", language="kannada")
    assert out1["tool_executed"] == "calc_npk_fertilizer"
    assert "ಡಿಎಪಿ" in out1["response_text_localized"]

    # Test Disease Diagnosis query
    out2 = agri_orchestrator.process_query("tomato leaf early blight spots", language="english")
    assert out2["tool_executed"] == "diagnose_crop_disease"
    assert "Early Blight" in out2["response_text_en"]

    # Test Organic Recipe
    out3 = agri_orchestrator.process_query("Jeevamrutha preparation guide", language="english")
    assert out3["card_type"] == "organic_recipe_card"

    # Test Government Scheme
    out4 = agri_orchestrator.process_query("Tell me about PM-KISAN scheme", language="english")
    assert out4["card_type"] == "govt_scheme_card"
