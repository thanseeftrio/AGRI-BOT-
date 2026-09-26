"""
FastAPI Backend Server for AgriBot - AI Agricultural Assistant
Institution: Manglore Institute of Technology & Engineering (MITE)
Team Lead: Shashank DB | Core Team: Sampath K S, Mohammed Ifaan, Mohammed Jaffar Bastham
"""

import os
from typing import Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.agent.orchestrator import agri_orchestrator
from backend.agent.tools import (
    calculate_npk_fertilizer,
    calculate_seed_and_spacing,
    calculate_yield_projection,
    calculate_water_irrigation
)
from backend.agent.vision_engine import vision_engine
from backend.agent.knowledge_base import (
    CROPS_DATABASE, 
    PATHOLOGY_DATABASE, 
    ORGANIC_RECIPES, 
    GOVT_SCHEMES, 
    DIALECT_DICTIONARY
)

app = FastAPI(
    title="AgriBot - AI Agricultural Assistant API",
    description="ChatGPT & Claude style Conversational AI for Farmers - MITE Team",
    version="2.0.0"
)

# Enable CORS for local dev, web, and mobile frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class AgentChatRequest(BaseModel):
    query: str
    language: Optional[str] = "kannada"
    mode: Optional[str] = "cloud"
    image_name: Optional[str] = None

class ModeToggleRequest(BaseModel):
    mode: str

class NPKCalcRequest(BaseModel):
    crop_name: str
    area_value: float = 1.0
    area_unit: str = "acre"
    soil_n_status: Optional[str] = "medium"
    soil_p_status: Optional[str] = "medium"
    soil_k_status: Optional[str] = "medium"

class SeedCalcRequest(BaseModel):
    crop_name: str
    area_value: float = 1.0
    area_unit: str = "acre"
    planting_method: Optional[str] = "transplanting"

class YieldCalcRequest(BaseModel):
    crop_name: str
    area_value: float = 1.0
    area_unit: str = "acre"
    vitality_score_pct: Optional[float] = 85.0
    soil_health_rating: Optional[str] = "good"

class IrrigationCalcRequest(BaseModel):
    crop_name: str
    area_value: float = 1.0
    area_unit: str = "acre"
    current_soil_moisture_pct: Optional[float] = 38.0
    soil_type: Optional[str] = "red_loam"
    irrigation_method: Optional[str] = "drip"


# Endpoints
@app.get("/health")
@app.get("/api/health")
def get_health():
    return {
        "status": "ONLINE",
        "system": "AgriBot - AI Agricultural Chatbot",
        "institution": "Manglore Institute of Technology & Engineering (MITE)",
        "team_lead": "Shashank DB",
        "core_team": ["Sampath K S", "Mohammed Ifaan", "Mohammed Jaffar Bastham"],
        "track": "Agentic AI For Billions",
        "active_mode": agri_orchestrator.mode.upper(),
        "offline_edge_ready": True
    }

@app.post("/api/agent/chat")
def process_agent_chat(req: AgentChatRequest):
    """Unified conversational query endpoint for text, voice transcripts, and image diagnoses."""
    try:
        response = agri_orchestrator.process_query(
            query_text=req.query,
            image_name=req.image_name,
            language=req.language,
            mode_override=req.mode
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agent/mode")
def set_agent_mode(req: ModeToggleRequest):
    """Toggles Edge vs Cloud Mode."""
    current_mode = agri_orchestrator.set_mode(req.mode)
    return {
        "mode": current_mode.upper(),
        "description": "Zero-Downtime Offline Edge Mode (Fast on-device reasoning)" if current_mode == "edge" else "Cloud Deep Agricultural LLM (Deep multimodal reasoning)"
    }

@app.post("/api/agent/diagnose")
async def diagnose_crop_image(
    file: Optional[UploadFile] = File(None),
    image_name: Optional[str] = Form("paddy_blast.jpg"),
    crop_hint: Optional[str] = Form("paddy"),
    mode: Optional[str] = Form("cloud")
):
    """Multimodal visual crop disease diagnostic endpoint."""
    img_name = file.filename if file else image_name
    result = vision_engine.diagnose_image(
        image_name=img_name,
        crop_hint=crop_hint,
        mode=mode
    )
    return result

@app.post("/api/agent/calculate/npk")
def api_calculate_npk(req: NPKCalcRequest):
    return calculate_npk_fertilizer(
        crop_name=req.crop_name,
        area_value=req.area_value,
        area_unit=req.area_unit,
        soil_n_status=req.soil_n_status,
        soil_p_status=req.soil_p_status,
        soil_k_status=req.soil_k_status
    )

@app.post("/api/agent/calculate/seed")
def api_calculate_seed(req: SeedCalcRequest):
    return calculate_seed_and_spacing(
        crop_name=req.crop_name,
        area_value=req.area_value,
        area_unit=req.area_unit,
        planting_method=req.planting_method
    )

@app.post("/api/agent/calculate/yield")
def api_calculate_yield(req: YieldCalcRequest):
    return calculate_yield_projection(
        crop_name=req.crop_name,
        area_value=req.area_value,
        area_unit=req.area_unit,
        vitality_score_pct=req.vitality_score_pct,
        soil_health_rating=req.soil_health_rating
    )

@app.post("/api/agent/calculate/irrigation")
def api_calculate_irrigation(req: IrrigationCalcRequest):
    return calculate_water_irrigation(
        crop_name=req.crop_name,
        area_value=req.area_value,
        area_unit=req.area_unit,
        current_soil_moisture_pct=req.current_soil_moisture_pct,
        soil_type=req.soil_type,
        irrigation_method=req.irrigation_method
    )

@app.get("/api/knowledge/crops")
def list_crops():
    return CROPS_DATABASE

@app.get("/api/knowledge/diseases")
def list_diseases():
    return PATHOLOGY_DATABASE

@app.get("/api/knowledge/organic")
def list_organic_recipes():
    return ORGANIC_RECIPES

@app.get("/api/knowledge/schemes")
def list_schemes():
    return GOVT_SCHEMES

@app.get("/api/knowledge/dialects")
def list_dialects():
    return DIALECT_DICTIONARY


@app.get("/api/download/apk")
@app.get("/AgriBot-AI-v2.0.apk")
def download_apk():
    # Look for compiled or packaged APK
    apk_candidates = [
        os.path.join(os.path.dirname(__file__), "..", "frontend", "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"),
        os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "AgriBot-AI-v2.0.apk"),
        os.path.join(os.path.dirname(__file__), "..", "frontend", "dist", "AgriBot-AI-v2.0.apk")
    ]
    
    for candidate in apk_candidates:
        if os.path.exists(candidate) and os.path.getsize(candidate) > 0:
            return FileResponse(
                path=candidate,
                filename="AgriBot-AI-v2.0.apk",
                media_type="application/vnd.android.package-archive"
            )
            
    # Fallback to serving the standalone packaged installer
    fallback_apk = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "AgriBot-AI-v2.0.apk")
    if not os.path.exists(fallback_apk):
        import zipfile
        dist_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
        with zipfile.ZipFile(fallback_apk, 'w', zipfile.ZIP_DEFLATED) as zipf:
            if os.path.exists(dist_dir):
                for root, _, files in os.walk(dist_dir):
                    for file in files:
                        full_p = os.path.join(root, file)
                        arcname = os.path.relpath(full_p, dist_dir)
                        zipf.write(full_p, arcname)
                        
    return FileResponse(
        path=fallback_apk,
        filename="AgriBot-AI-v2.0.apk",
        media_type="application/vnd.android.package-archive"
    )


# Serve static frontend if directory exists
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=True)
