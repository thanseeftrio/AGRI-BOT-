"""
AgriBot - AI Agricultural Assistant & Chatbot
Institution: Manglore Institute of Technology & Engineering (MITE)
Team Lead: Shashank DB | Core Team: Sampath K S, Mohammed Ifaan, Mohammed Jaffar Bastham
Track: Agentic AI For Billions
"""

import sys
import os
import uvicorn

if __name__ == "__main__":
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding='utf-8')
            sys.stderr.reconfigure(encoding='utf-8')
        except Exception:
            pass

    print("================================================================")
    print("🌾 AgriBot AI: Conversational Agricultural Assistant for Farmers")
    print("Institution: Manglore Institute of Technology & Engineering (MITE)")
    print("Team Lead: Shashank DB")
    print("Core Team: Sampath K S, Mohammed Ifaan, Mohammed Jaffar Bastham")
    print("Track: Agentic AI For Billions")
    print("================================================================")
    print("🚀 Web App & Chatbot UI: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("================================================================")

    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=False)
