const DEFAULT_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export function getStoredGeminiKey() {
  return localStorage.getItem('agribot_gemini_api_key') || DEFAULT_GEMINI_KEY;
}

export function setStoredGeminiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('agribot_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('agribot_gemini_api_key');
  }
}

export const AGRIBOT_SYSTEM_PROMPT = `
You are AgriBot AI (ಅಗ್ರಿಬಾಟ್ AI / एग्रीबॉट AI), an elite Precision Agronomist, Plant Pathologist, and Agricultural Scientist developed specifically for farmers.

CRITICAL IDENTITY RULES:
1. NEVER identify as "Gemini" or "an AI trained by Google". Your exclusive name is "AgriBot AI".
2. If asked who created you, say: "I am AgriBot AI, an advanced precision agricultural AI assistant developed by the research engineering team at MITE (Mangalore Institute of Technology & Engineering) to empower farmers across India with AI agronomy."
3. Always maintain a respectful, empathetic, practical, and highly scientific tone suitable for farmers.

EXPERTISE AREAS:
- Plant Pathology & Pest Diagnosis (identifying leaf spots, blast, blights, rusts, borers, wilts, leaf curls, nutrient deficiencies).
- Chemical Treatments with exact dosage (g/L or ml/L), spray timing, and mandatory Pre-Harvest Safety Intervals (PHI in days).
- Organic / Natural Farming (Jeevamrutha, Beejamrutha, Dashaparni Kashaya, Neem cake, Trichoderma viride, Pseudomonas fluorescens).
- Precision Fertilizer (NPK) Dosage in kg and 50kg bag counts (DAP, Urea, MOP) with basal and top dressing split schedules.
- Government Schemes (PM-KISAN, PM Fasal Bima Yojana, Kisan Credit Card, Drip Irrigation Subsidies).

LANGUAGE INSTRUCTIONS:
- Respond in the language requested by the user (Kannada, Hindi, English, Telugu, Tamil, Marathi).
- In Kannada: Use clear, friendly farmer Kannada terms (e.g. ರಸಗೊಬ್ಬರ, ಬತ್ತದ ಬೆಂಕಿ ರೋಗ, ಜೀವಾಮೃತ, ಸಿಂಪರಣೆ).
- In Hindi: Use clear farmer Hindi terms (e.g. उर्वरक, झुलसा रोग, जीवामृत, छिड़काव).
- Format all responses with clean markdown headings (###), bullet points, and bold text for easy reading on mobile screens.
`;

export async function queryGeminiChat({
  query,
  language = 'kannada',
  imageDataUrl = null,
  history = []
}) {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    throw new Error('No Gemini API key available');
  }

  // Model hierarchy with automatic fallback
  const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.7-flash', 'gemini-2.5-pro'];

  const langInstruction = `Please respond comprehensively in ${language.toUpperCase()} language as AgriBot AI.`;
  const fullPrompt = `${langInstruction}\n\nFarmer Query: ${query}`;

  const contents = [];

  // Build conversation context
  if (history && history.length > 0) {
    history.slice(-4).forEach(msg => {
      if (msg.sender === 'user' && msg.text) {
        contents.push({
          role: 'user',
          parts: [{ text: msg.text }]
        });
      } else if (msg.sender === 'bot' && msg.text) {
        contents.push({
          role: 'model',
          parts: [{ text: msg.text }]
        });
      }
    });
  }

  // Current User Turn
  const currentParts = [{ text: fullPrompt }];

  if (imageDataUrl && imageDataUrl.includes(',')) {
    const base64Data = imageDataUrl.split(',')[1];
    const mimeType = imageDataUrl.substring(imageDataUrl.indexOf(':') + 1, imageDataUrl.indexOf(';')) || 'image/jpeg';
    currentParts.unshift({
      inline_data: {
        mime_type: mimeType,
        data: base64Data
      }
    });
  }

  contents.push({
    role: 'user',
    parts: currentParts
  });

  const payload = {
    system_instruction: {
      parts: [{ text: AGRIBOT_SYSTEM_PROMPT }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1000
    }
  };

  for (const modelName of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const result = await res.json();
        const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) return textOutput;
      }
    } catch (e) {
      console.warn(`Model ${modelName} failed, trying next:`, e.message);
    }
  }

  throw new Error('All Gemini model endpoints failed');
}
