import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Globe, Heart, Calendar, DollarSign, Car, Sparkles } from 'lucide-react'

const SurveyPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    interests: [],
    duration: '',
    budget: '',
    transport: '',
    personality: '', // extrovert/introvert
    travelStyle: '', // group/solo
    transportType: '', // rental/pickup/own
    hasItinerary: '', // yes/no
    currentMood: '', // happy/relaxed/adventurous/romantic/cultural
    photoInterest: false, // interested in photo spots
    findBuddies: false, // want to find travel buddies
  })

  const interests = [
    { value: 'nature', label: 'Nature & Lakes', icon: '🌲' },
    { value: 'culture', label: 'Culture & History', icon: '🏛️' },
    { value: 'food', label: 'Food & Markets', icon: '🍽️' },
    { value: 'adventure', label: 'Adventure & Sports', icon: '🎢' },
    { value: 'photography', label: 'Photography Spots', icon: '📸' },
    { value: 'relaxation', label: 'Relaxation & Wellness', icon: '🧘' },
  ]

  const handleInterestChange = (value) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save to localStorage
    localStorage.setItem('dalatSurvey', JSON.stringify(formData))
    // Navigate to map
    navigate('/')
  }

  const skipSurvey = () => {
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      {/* Header */}
      <div className="glass-card p-6 md:p-10 text-center mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dalat-pink via-dalat-blue to-dalat-pink bg-[length:200%_100%] animate-[gradientShift_3s_linear_infinite]"></div>
        <div className="flex justify-center mb-4">
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-dalat-pink" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent mb-4">
          DasiLari Travel Survey
        </h1>
        <p className="text-base md:text-xl text-gray-600 font-medium">
          Help us create your perfect Da Lat experience with AI-powered recommendations
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10">
        <div className="space-y-6 md:space-y-8">
          {/* Name */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-3 text-sm md:text-base">
              <User className="w-5 h-5 text-dalat-pink" />
              <span>What's your name?</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-dalat-pink focus:ring-4 focus:ring-dalat-pink/20 outline-none transition-all duration-300 bg-white/90 text-sm md:text-base"
              placeholder="Enter your name..."
            />
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-3 text-sm md:text-base">
              <Globe className="w-5 h-5 text-dalat-pink" />
              <span>Which country are you from?</span>
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-dalat-pink focus:ring-4 focus:ring-dalat-pink/20 outline-none transition-all duration-300 bg-white/90 text-sm md:text-base"
              placeholder="E.g.: Vietnam, USA, Korea..."
            />
          </div>

          {/* Interests */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <Heart className="w-5 h-5 text-dalat-pink" />
              <span>What types of attractions interest you most?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests.map(interest => (
                <label
                  key={interest.value}
                  className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    formData.interests.includes(interest.value)
                      ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                      : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest.value)}
                    onChange={() => handleInterestChange(interest.value)}
                    className="w-5 h-5 accent-dalat-pink cursor-pointer"
                  />
                  <span className="text-xl md:text-2xl">{interest.icon}</span>
                  <span className="font-medium text-gray-800 text-sm md:text-base">{interest.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-3 text-sm md:text-base">
              <Calendar className="w-5 h-5 text-dalat-pink" />
              <span>How many days will you stay in Da Lat?</span>
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-dalat-pink focus:ring-4 focus:ring-dalat-pink/20 outline-none transition-all duration-300 bg-white/90 cursor-pointer text-sm md:text-base"
            >
              <option value="">Select duration</option>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4-5">4-5 days</option>
              <option value="6+">6+ days</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-3 text-sm md:text-base">
              <DollarSign className="w-5 h-5 text-dalat-pink" />
              <span>What's your daily budget (USD)?</span>
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-dalat-pink focus:ring-4 focus:ring-dalat-pink/20 outline-none transition-all duration-300 bg-white/90 cursor-pointer text-sm md:text-base"
            >
              <option value="">Select budget</option>
              <option value="low">Under $30 (Budget)</option>
              <option value="medium">$30 - $70 (Moderate)</option>
              <option value="high">$70 - $150 (Comfortable)</option>
              <option value="luxury">Over $150 (Luxury)</option>
            </select>
          </div>

          {/* Transport */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <Car className="w-5 h-5 text-dalat-pink" />
              <span>Do you have your own transportation?</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.transport === 'yes'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="yes"
                  checked={formData.transport === 'yes'}
                  onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">Yes, I have motorbike/car</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.transport === 'no'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="no"
                  checked={formData.transport === 'no'}
                  onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">No, I'll need ride services</span>
              </label>
            </div>
          </div>

          {/* Personality Type */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <span className="text-xl">🧠</span>
              <span>What's your personality type?</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.personality === 'extrovert'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="extrovert"
                  checked={formData.personality === 'extrovert'}
                  onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🎉 Extrovert - I love meeting new people</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.personality === 'introvert'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="introvert"
                  checked={formData.personality === 'introvert'}
                  onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🤫 Introvert - I prefer quiet exploration</span>
              </label>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <span className="text-xl">👥</span>
              <span>How do you prefer to travel?</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.travelStyle === 'group'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="group"
                  checked={formData.travelStyle === 'group'}
                  onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">👨‍👩‍👧‍👦 With group/family</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.travelStyle === 'solo'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="solo"
                  checked={formData.travelStyle === 'solo'}
                  onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🚶 Solo traveler</span>
              </label>
            </div>
          </div>

          {/* Transportation Type */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <Car className="w-5 h-5 text-dalat-pink" />
              <span>What type of transportation will you use?</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.transportType === 'rental'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="rental"
                  checked={formData.transportType === 'rental'}
                  onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🚗 Rental car/motorbike</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.transportType === 'pickup'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="pickup"
                  checked={formData.transportType === 'pickup'}
                  onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🚐 Pickup/shuttle service</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.transportType === 'own'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="own"
                  checked={formData.transportType === 'own'}
                  onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🏍️ My own vehicle</span>
              </label>
            </div>
          </div>

          {/* Has Itinerary */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <span className="text-xl">📋</span>
              <span>Do you have a specific itinerary planned?</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.hasItinerary === 'yes'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="yes"
                  checked={formData.hasItinerary === 'yes'}
                  onChange={(e) => setFormData({ ...formData, hasItinerary: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">✅ Yes, I have a detailed plan</span>
              </label>
              <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                formData.hasItinerary === 'no'
                  ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                  : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
              }`}>
                <input
                  type="radio"
                  value="no"
                  checked={formData.hasItinerary === 'no'}
                  onChange={(e) => setFormData({ ...formData, hasItinerary: e.target.value })}
                  required
                  className="w-5 h-5 accent-dalat-pink cursor-pointer"
                />
                <span className="font-medium text-gray-800 text-sm md:text-base">🗺️ No, I need AI to help me plan</span>
              </label>
            </div>
          </div>

          {/* Current Mood */}
          <div>
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-4 text-sm md:text-base">
              <span className="text-xl">😊</span>
              <span>What's your current mood for this trip?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'happy', label: 'Happy & Energetic', icon: '😄' },
                { value: 'relaxed', label: 'Calm & Relaxed', icon: '😌' },
                { value: 'adventurous', label: 'Adventurous', icon: '🤠' },
                { value: 'romantic', label: 'Romantic', icon: '💕' },
                { value: 'cultural', label: 'Cultural Explorer', icon: '🎭' },
              ].map(mood => (
                <label
                  key={mood.value}
                  className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    formData.currentMood === mood.value
                      ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                      : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
                  }`}
                >
                  <input
                    type="radio"
                    value={mood.value}
                    checked={formData.currentMood === mood.value}
                    onChange={(e) => setFormData({ ...formData, currentMood: e.target.value })}
                    required
                    className="w-5 h-5 accent-dalat-pink cursor-pointer"
                  />
                  <span className="text-xl">{mood.icon}</span>
                  <span className="font-medium text-gray-800 text-sm md:text-base">{mood.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-4">
            <label className="flex items-center space-x-2 font-bold text-gray-800 mb-3 text-sm md:text-base">
              <span className="text-xl">✨</span>
              <span>Additional preferences (optional):</span>
            </label>
            
            <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              formData.photoInterest
                ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
            }`}>
              <input
                type="checkbox"
                checked={formData.photoInterest}
                onChange={(e) => setFormData({ ...formData, photoInterest: e.target.checked })}
                className="w-5 h-5 accent-dalat-pink cursor-pointer"
              />
              <span className="text-xl">📸</span>
              <span className="font-medium text-gray-800 text-sm md:text-base">I'm interested in photo locations</span>
            </label>

            <label className={`flex items-center space-x-3 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              formData.findBuddies
                ? 'bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 border-dalat-pink'
                : 'bg-white/60 border-gray-200 hover:border-dalat-pink/50 hover:bg-dalat-pink/5'
            }`}>
              <input
                type="checkbox"
                checked={formData.findBuddies}
                onChange={(e) => setFormData({ ...formData, findBuddies: e.target.checked })}
                className="w-5 h-5 accent-dalat-pink cursor-pointer"
              />
              <span className="text-xl">🤝</span>
              <span className="font-medium text-gray-800 text-sm md:text-base">I want to find travel buddies</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full dalat-button text-base md:text-lg py-4 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Start Exploring Da Lat</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </form>

      {/* Skip Link */}
      <div className="text-center mt-6">
        <button
          onClick={skipSurvey}
          className="inline-block px-6 py-3 rounded-full font-semibold text-white bg-white/20 backdrop-blur-lg border-2 border-white/30 hover:bg-white/30 hover:border-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm md:text-base"
        >
          Skip Survey - Go Directly to Map →
        </button>
      </div>
    </div>
  )
}

export default SurveyPage
