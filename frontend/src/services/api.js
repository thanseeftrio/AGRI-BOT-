import { 
  calculateNpkPrecision, 
  calculateSeedPrecision, 
  calculateYieldPrecision, 
  calculateIrrigationPrecision, 
  diagnoseLeafOnDevice, 
  generateSmartChatResponse 
} from './agronomyEngine';
import { queryGeminiChat } from './geminiService';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const ApiService = {
  async chat({ query, language = 'kannada', mode = 'cloud', image_name = null, imageDataUrl = null, history = [] }) {
    // 1. Try Vercel Serverless / Backend API (which holds GEMINI_API_KEY securely on the server)
    try {
      const res = await fetch(`${API_BASE}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language, mode, image_name, imageDataUrl, history })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.response_text_localized || data.response_text_en)) {
          return data;
        }
      }
    } catch (e) {
      // Backend/Serverless unavailable or running offline
    }

    // 2. If client environment variable VITE_GEMINI_API_KEY is configured
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      try {
        const geminiReply = await queryGeminiChat({
          query,
          language,
          imageDataUrl,
          history
        });

        const q = (query || '').toLowerCase();
        let cardType = null;
        let cardPayload = null;

        if (q.includes('npk') || q.includes('fertilizer') || q.includes('ಗೊಬ್ಬರ') || q.includes('खाद')) {
          cardType = 'npk_card';
          cardPayload = calculateNpkPrecision('paddy', 2.0, 'acre');
        } else if (image_name || q.includes('leaf') || q.includes('disease') || q.includes('blast') || q.includes('blight')) {
          cardType = 'prescription_card';
          cardPayload = diagnoseLeafOnDevice(image_name || 'paddy_blast_lesion.jpg', 'paddy', mode, language);
        }

        return {
          response_text_localized: geminiReply,
          response_text_en: geminiReply,
          card_type: cardType,
          card_payload: cardPayload,
          tool_executed: 'gemini_agribot_engine',
          spoken_audio_transcript: geminiReply.substring(0, 150)
        };
      } catch (geminiErr) {
        console.warn('Direct Gemini call failed:', geminiErr.message);
      }
    }

    // 3. Seamless on-device client Agronomy Engine fallback
    return generateSmartChatResponse(query, language, mode, image_name);
  },

  async diagnose({ image_name, crop_hint = 'paddy', mode = 'cloud', language = 'kannada' }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/diagnose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ image_name, crop_hint, mode })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return diagnoseLeafOnDevice(image_name, crop_hint, mode, language);
  },

  async calculateNpk({ crop_name, area_value, area_unit, soil_n = 'medium', soil_p = 'medium', soil_k = 'medium' }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/calculate/npk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_name, area_value, area_unit, soil_n_status: soil_n, soil_p_status: soil_p, soil_k_status: soil_k })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return calculateNpkPrecision(crop_name, area_value, area_unit, soil_n, soil_p, soil_k);
  },

  async calculateSeed({ crop_name, area_value, area_unit, planting_method = 'transplanting' }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/calculate/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_name, area_value, area_unit, planting_method })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return calculateSeedPrecision(crop_name, area_value, area_unit, planting_method);
  },

  async calculateYield({ crop_name, area_value, area_unit, vitality_score_pct = 85.0, soil_health_rating = 'good' }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/calculate/yield`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_name, area_value, area_unit, vitality_score_pct, soil_health_rating })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return calculateYieldPrecision(crop_name, area_value, area_unit, vitality_score_pct, soil_health_rating);
  },

  async calculateIrrigation({ crop_name, area_value, area_unit, soil_type = 'loam' }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/calculate/irrigation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_name, area_value, area_unit, soil_type })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return calculateIrrigationPrecision(crop_name, area_value, area_unit, soil_type);
  }
};
