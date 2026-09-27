import { 
  calculateNpkPrecision, 
  calculateSeedPrecision, 
  calculateYieldPrecision, 
  calculateIrrigationPrecision, 
  diagnoseLeafOnDevice, 
  generateSmartChatResponse 
} from './agronomyEngine';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const ApiService = {
  async chat({ query, language = 'kannada', mode = 'cloud', image_name = null }) {
    try {
      const res = await fetch(`${API_BASE}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language, mode, image_name })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.info('Backend unavailable, running on-device Agronomy Engine:', e.message);
    }
    // Seamless on-device client fallback
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
      console.info('Backend unavailable, running on-device Leaf Doctor:', e.message);
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
      console.info('Backend unavailable, running on-device NPK Calculator:', e.message);
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
      console.info('Backend unavailable, running on-device Seed Calculator:', e.message);
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
      console.info('Backend unavailable, running on-device Yield Calculator:', e.message);
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
      console.info('Backend unavailable, running on-device Irrigation Calculator:', e.message);
    }
    return calculateIrrigationPrecision(crop_name, area_value, area_unit, soil_type);
  }
};
