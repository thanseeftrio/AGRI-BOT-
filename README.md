# 🌾 AgriBot: AI Agricultural Assistant for Farmers

> **Track**: Agentic AI For Billions  
> **Institution**: Mangalore Institute of Technology & Engineering (MITE)  
> **Team Lead**: Shashank DB  
> **Core Team**: Sampath K S, Mohammed Ifaan, Mohammed Jaffar Bastham  

---

## 🌟 Overview & Vision
**AgriBot** is a conversational AI agricultural assistant designed specifically for smallholders, marginal farmers, and rural farming communities. It delivers a **ChatGPT / Claude-style conversational experience** custom-tailored for agriculture—providing instant crop disease diagnostics, exact NPK fertilizer dosing, organic remedies, irrigation schedules, market prices, and government subsidy guidance.

---

## 🚀 Key Features

### 1. 💬 ChatGPT / Claude-Style Multi-Turn Chatbot
- **Conversational Memory & Context**: Ask follow-up questions about crops, soil health, pests, weather precautions, or schemes.
- **Rich Interactive Cards**:
  - 🩺 **Disease Diagnostic Cards**: Confidence match meter, pathogen details, organic/chemical remedy split, and Pre-Harvest Safety Interval (PHI).
  - 🧪 **Precision Fertilizer Formulation**: 50kg bag counters for DAP, Urea, and MOP, split-application timelines, and estimated costs in ₹.
  - 🌿 **Organic Remedy Preparation**: Ingredients checklist and step-by-step recipes for Jeevamrutha, Agniastra, Dashaparni, and Beejamrutha.
  - 🏛️ **Government Schemes & MSP**: Step-by-step eligibility, documents required, and direct application links for PM-KISAN, PMFBY Crop Insurance, KCC, and Drip Irrigation Subsidies.
- **Session History**: Save, switch, and manage multiple farm consultations across sessions.

### 2. 🗣️ Multilingual & Native Dialect Voice Core
- Native voice recognition (Speech-to-Text) and Text-to-Speech audio readout for:
  - **ಕನ್ನಡ (Kannada)**
  - **हिन्दी (Hindi)**
  - **తెలుగు (Telugu)**
  - **தமிழ் (Tamil)**
  - **मराठी (Marathi)**
  - **English**
- Live pulsating audio waveform during voice input.

### 3. 📸 Multimodal Crop Leaf Doctor
- Drag-and-drop or camera capture of infected crop leaves.
- Visual pathology engine detecting fungal, bacterial, and pest damage across major crops (Paddy, Arecanut, Tomato, Maize, Black Pepper, Cotton, Wheat, Sugarcane, Chilli, Coffee, Banana).

### 4. 🧮 Precision Agronomic Calculator Suite
- **Linear NPK Solver**: Computes exact kg and 50kg bag counts based on soil status and area (Acres, Guntas, Hectares, Cents).
- **Seed Density & Spacing**: Row-to-row spacing, plant population count, and seed treatment protocol.
- **Yield & Revenue Forecast**: Quintals, Metric Tonnes, MSP gross revenue, input expenses, and net profit (ROI%).
- **Drip Irrigation Demand**: Litres needed and 5 HP pump runtime hours.

### 5. 📋 Printable Farm Advisory & Prescription Sheet (Rx)
- Farmers can click **"Save Prescription"** on any diagnosis or calculation card.
- Opens an official printable farm advisory slip with spray schedules, safety warnings, and dosage recommendations (`window.print()`).

---

## 🏗️ Architecture

```
                                  +---------------------------------------------------+
                                  |    Farmer Mobile / Web Device (ChatGPT / Claude)  |
                                  |  - Voice Input / STT (Kannada, Hindi, English...) |
                                  |  - Leaf Photo Capture & Bounding Box Inspection   |
                                  |  - Prescription Rx Slip Print & Download          |
                                  +-------------------------+-------------------------+
                                                            |
                                                            v
                                  +---------------------------------------------------+
                                  |            FastAPI Orchestration Backend          |
                                  |  - Intent & Dialect Parser                        |
                                  |  - Multi-Turn Conversational Reasoning            |
                                  |  - Deterministic Agronomy Math Engines            |
                                  +-------------------------+-------------------------+
                                                            |
                                        +-------------------+-------------------+
                                        |                                       |
                                        v                                       v
                     +--------------------------------------+   +--------------------------------------+
                     |       Zero-Downtime Edge Engine      |   |      High-Capacity Cloud LLM         |
                     |  - Fast On-Device Inference          |   |  - Deep Multimodal VLM Reasoning     |
                     |  - Deterministic Math Tools          |   |  - Multi-Season Agronomy Knowledge   |
                     +--------------------------------------+   +--------------------------------------+
```

---

## 💻 Quick Start & Run

### 1. Install Backend Dependencies
```bash
pip install -r backend/requirements.txt
```

### 2. Build Frontend UI
```bash
cd frontend
npm install
npm run build
cd ..
```

### 3. Run Backend & Chatbot
```bash
python run_demo.py
```
- Open browser at **http://localhost:8000**
- API docs available at **http://localhost:8000/docs**

### 4. Run Tests
```bash
pytest backend/tests -v
```
