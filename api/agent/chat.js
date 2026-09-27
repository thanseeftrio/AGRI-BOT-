// Vercel Serverless Function: AgriBot AI Gemini Reasoning Engine
// Hidden server-side execution - Never exposes API Key to clients

const AGRIBOT_SYSTEM_PROMPT = `
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, language = 'kannada', mode = 'cloud', image_name = null, imageDataUrl = null, history = [] } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  try {
    const langInstruction = `Please respond comprehensively in ${language.toUpperCase()} language as AgriBot AI.`;
    const fullPrompt = `${langInstruction}\n\nFarmer Query: ${query}`;

    const contents = [];

    if (history && Array.isArray(history)) {
      history.slice(-4).forEach(msg => {
        if (msg.sender === 'user' && msg.text) {
          contents.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.sender === 'bot' && msg.text) {
          contents.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      });
    }

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

    const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.7-flash', 'gemini-2.5-pro'];
    let replyText = null;

    for (const modelName of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) break;
        }
      } catch (err) {
        // try next
      }
    }

    if (!replyText) {
      return res.status(500).json({ error: 'AI generation failed across all model tiers' });
    }

    // Check if query is about fertilizer or disease to provide card metadata
    const q = (query || '').toLowerCase();
    let cardType = null;
    if (q.includes('npk') || q.includes('fertilizer') || q.includes('ಗೊಬ್ಬರ') || q.includes('खाद')) {
      cardType = 'npk_card';
    } else if (image_name || q.includes('leaf') || q.includes('disease') || q.includes('blast') || q.includes('blight')) {
      cardType = 'prescription_card';
    }

    return res.status(200).json({
      response_text_localized: replyText,
      response_text_en: replyText,
      card_type: cardType,
      tool_executed: 'gemini_agribot_engine',
      spoken_audio_transcript: replyText.substring(0, 150)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
