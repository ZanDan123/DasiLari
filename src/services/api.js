// API Service for DasiLari
// Connects frontend with FastAPI backend

// Use empty string for proxy in development, or full URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// ==================== Survey/Users API ====================

/**
 * Save user survey data
 * @param {Object} surveyData - Survey form data
 * @returns {Promise<Object>} - { user_id, message, status }
 */
export const saveSurvey = async (surveyData) => {
  // Map frontend values to backend enum values
  const personalityType = surveyData.personality === 'extrovert' ? 'extrovert' : 'introvert';
  const travelStyle = surveyData.travelStyle === 'group' ? 'group' : 'solo';
  const transportType = surveyData.transportType || surveyData.transport || 'rental';
  
  const response = await fetch(`${API_BASE_URL}/api/survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: surveyData.name || 'Anonymous',
      personality_type: personalityType,
      travel_style: travelStyle,
      transport_type: transportType === 'yes' ? 'own' : (transportType === 'no' ? 'rental' : transportType),
      has_itinerary: surveyData.hasItinerary === 'yes' || surveyData.hasItinerary === true,
    }),
  });
  return handleResponse(response);
};

/**
 * Get user profile by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} - User profile data
 */
export const getUserProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
  return handleResponse(response);
};

// ==================== Destinations API ====================

/**
 * Get all destinations with optional filters
 * @param {Object} filters - { category, photo_spot, max_cost }
 * @returns {Promise<Array>} - List of destinations
 */
export const getDestinations = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.photo_spot !== undefined) params.append('photo_spot', filters.photo_spot);
  if (filters.max_cost) params.append('max_cost', filters.max_cost);

  const url = `${API_BASE_URL}/api/destinations${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);
  return handleResponse(response);
};

/**
 * Get all photo spots with photography tips
 * @returns {Promise<Object>} - { total_photo_spots, photo_spots, general_tips }
 */
export const getPhotoSpots = async () => {
  const response = await fetch(`${API_BASE_URL}/api/destinations/photo-spots`);
  return handleResponse(response);
};

// ==================== Chat API ====================

/**
 * Send message to AI chat assistant
 * @param {Object} chatData - { message, user_id?, conversation_history? }
 * @returns {Promise<Object>} - AI response with suggestions
 */
export const sendChatMessage = async (chatData) => {
  // user_id is required by the API
  if (!chatData.user_id) {
    throw new Error('User ID is required. Please complete the survey first.');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: chatData.message,
      user_id: chatData.user_id,
    }),
  });
  return handleResponse(response);
};

// ==================== Itineraries API ====================

/**
 * Generate AI-powered itinerary
 * @param {Object} data - { user_id, destination_ids, visit_date, emotion? }
 * @returns {Promise<Object>} - Generated itinerary with schedule
 */
export const generateItinerary = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/itineraries/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: data.user_id,
      destination_ids: data.destination_ids,
      visit_date: data.visit_date,
      emotion: data.emotion || null,
    }),
  });
  return handleResponse(response);
};

/**
 * Get user's itineraries
 * @param {number} userId - User ID
 * @returns {Promise<Array>} - List of user's itineraries
 */
export const getUserItineraries = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/itineraries?user_id=${userId}`);
  return handleResponse(response);
};

// ==================== Matching/Buddies API ====================

/**
 * Find matching travelers (travel buddies)
 * Note: This endpoint may not be implemented yet in the backend
 * @param {Object} data - { user_id, destination_id, time_slot, visit_date? }
 * @returns {Promise<Array>} - List of matching travelers
 */
export const findMatchingTravelers = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/matching/travelers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

/**
 * Get group itinerary suggestions
 * Note: This endpoint may not be implemented yet in the backend
 * @param {Object} data - { user_ids, target_date }
 * @returns {Promise<Object>} - Group itinerary suggestion
 */
export const getGroupItinerary = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/matching/group-itinerary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// ==================== Utility Functions ====================

/**
 * Check API health/status
 * @returns {Promise<Object>} - API status
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return handleResponse(response);
  } catch (error) {
    return { status: 'offline', error: error.message };
  }
};

// Export API base URL for debugging
export const getApiBaseUrl = () => API_BASE_URL;

export default {
  saveSurvey,
  getUserProfile,
  getDestinations,
  getPhotoSpots,
  sendChatMessage,
  generateItinerary,
  getUserItineraries,
  checkApiHealth,
  getApiBaseUrl,
};
