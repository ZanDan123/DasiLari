import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Sparkles, Navigation2, Car, Info, HelpCircle } from 'lucide-react'
import L from 'leaflet'
import Joyride from 'react-joyride'
import AIChat from '../components/AIChat'
import { useTour } from '../hooks/useTour'

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const attractions = [
  {
    id: 1,
    name: 'Xuan Huong Lake',
    category: 'nature',
    lat: 11.9404,
    lng: 108.4388,
    description: 'The most beautiful lake in Da Lat center, perfect for walking and photos',
    icon: '🌊',
  },
  {
    id: 2,
    name: 'Bao Dai Palace',
    category: 'culture',
    lat: 11.9386,
    lng: 108.4450,
    description: 'Summer palace of the last Nguyen Dynasty emperor',
    icon: '👑',
  },
  {
    id: 3,
    name: 'Da Lat Market',
    category: 'food',
    lat: 11.9415,
    lng: 108.4400,
    description: 'Traditional market with local specialties and food',
    icon: '🍓',
  },
  {
    id: 4,
    name: 'Crazy House',
    category: 'culture',
    lat: 11.9467,
    lng: 108.4208,
    description: 'The most unique and bizarre architecture in Vietnam',
    icon: '🏰',
  },
  {
    id: 5,
    name: 'Datanla Waterfall',
    category: 'adventure',
    lat: 11.9042,
    lng: 108.4383,
    description: 'Beautiful waterfall with exciting alpine coaster ride',
    icon: '💦',
  },
  {
    id: 6,
    name: 'Cu Lan Hill',
    category: 'photography',
    lat: 11.8969,
    lng: 108.4306,
    description: 'Famous photo spot with pine forests and tea hills',
    icon: '📸',
  },
]

const MapPage = () => {
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [userPreferences, setUserPreferences] = useState(null)
  const [showRideOptions, setShowRideOptions] = useState(false)
  
  // Tour guide
  const { run, startTour, handleJoyrideCallback } = useTour('map')
  
  const tourSteps = [
    {
      target: 'body',
      content: 'Welcome to DasiLari - Your Smart Travel Companion! Let me show you around Da Lat. 🌸',
      placement: 'center',
    },
    {
      target: '.nav-map',
      content: '🗺️ MAP - Explore all attractions in Da Lat with interactive map and AI recommendations!',
      disableBeacon: true,
    },
    {
      target: '.nav-about',
      content: '🌸 ABOUT - Learn everything about Da Lat: climate, culture, history, and travel tips!',
      disableBeacon: true,
    },
    {
      target: '.nav-survey',
      content: '📋 SURVEY - Tell us your preferences so AI can create personalized recommendations just for you!',
      disableBeacon: true,
    },
    {
      target: '.nav-buddies',
      content: '👥 BUDDIES - Find and connect with other travelers to explore Da Lat together!',
      disableBeacon: true,
    },
    {
      target: '.nav-itinerary',
      content: '📅 ITINERARY - Plan your perfect Da Lat trip with AI-generated itineraries based on your mood!',
      disableBeacon: true,
    },
    {
      target: '.nav-photos',
      content: '📸 PHOTOS - Discover the best photo spots in Da Lat for Instagram-worthy shots!',
      disableBeacon: true,
    },
    {
      target: '.ai-section',
      content: 'Here are personalized AI recommendations based on your preferences. Click on any place to explore!',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '.p-4.md\\:p-6.border-b',
      content: 'Filter attractions by category - Nature, Culture, Food, Adventure, and more!',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '.attraction-card:nth-child(3)',
      content: 'Browse all attractions here. Click on any card to see details and get directions.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '.leaflet-container',
      content: 'This interactive map shows all attractions. Click on markers to explore locations visually!',
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: '[data-tour="ai-chat"]',
      content: 'Need help? Ask our AI assistant anything about Da Lat travel! Click here to start chatting. 🤖',
      disableBeacon: true,
      placement: 'left',
    },
  ]

  // Reset ride options when modal closes
  useEffect(() => {
    if (!selectedAttraction) {
      setShowRideOptions(false)
    }
  }, [selectedAttraction])

  useEffect(() => {
    // Load user preferences from localStorage
    const savedPrefs = localStorage.getItem('dalatSurvey')
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs)
      setUserPreferences(prefs)
      generateAIRecommendations(prefs)
    }
  }, [])

  const generateAIRecommendations = (prefs) => {
    // Simulate AI recommendations based on user preferences
    const recommended = attractions
      .filter(attr => {
        if (!prefs.interests) return true
        return prefs.interests.some(interest => 
          attr.category.toLowerCase().includes(interest.toLowerCase())
        )
      })
      .slice(0, 3)
    
    setAiRecommendations(recommended)
  }

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'adventure', name: 'Adventure', icon: '🎢' },
    { id: 'photography', name: 'Photography', icon: '📷' },
  ]

  const filteredAttractions = filterCategory === 'all'
    ? attractions
    : attractions.filter(a => a.category === filterCategory)

  const getDirections = (attraction) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lng}`,
      '_blank'
    )
  }

  const callRide = (attraction) => {
    setShowRideOptions(true)
  }

  const rideServices = [
    { name: 'Grab', icon: '🚗', color: 'from-green-500 to-green-600', url: 'https://grab.com' },
    { name: 'Gojek', icon: '🏍️', color: 'from-emerald-500 to-emerald-600', url: 'https://gojek.com' },
    { name: 'Local Taxi', icon: '🚕', color: 'from-yellow-500 to-yellow-600', phone: '+84-xxx-xxx-xxx' },
    { name: 'Bike Rental', icon: '🏍️', color: 'from-blue-500 to-blue-600', info: 'Daily: $5-10' },
  ]

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col lg:flex-row relative">
      {/* Tour Guide */}
      <Joyride
        steps={tourSteps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#ec4899',
            zIndex: 10000,
          },
        }}
      />
      
      {/* Guide Button */}
      <button
        onClick={startTour}
        className="fixed bottom-24 right-6 z-[999] bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-4 rounded-full shadow-2xl hover:shadow-dalat-hover transition-all duration-300 hover:scale-110"
        title="Show Guide"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white shadow-2xl overflow-y-auto">
        {/* User Info */}
        {userPreferences && (
          <div className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              Welcome, {userPreferences.name}! 👋
            </h3>
            <p className="text-sm opacity-90">
              From {userPreferences.country} • {userPreferences.duration} days in Da Lat
            </p>
          </div>
        )}

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="ai-section p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-b-2 border-dalat-pink/20">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-dalat-purple" />
              <h3 className="text-lg md:text-xl font-bold text-dalat-purple">
                AI Recommendations for You
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Based on your preferences, AI suggests these amazing places:
            </p>
            <div className="space-y-3">
              {aiRecommendations.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedAttraction(rec)}
                  className="p-3 md:p-4 bg-white rounded-xl border-l-4 border-dalat-pink cursor-pointer hover:shadow-lg transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl md:text-3xl">{rec.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-dalat-purple text-sm md:text-base truncate">
                        {rec.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="p-4 md:p-6 border-b">
          <h3 className="font-bold text-base md:text-lg mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 md:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                  filterCategory === cat.id
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-dalat-pink/20'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions List */}
        <div className="p-4 md:p-6">
          <h3 className="font-bold text-base md:text-lg mb-4">
            Attractions ({filteredAttractions.length})
          </h3>
          <div className="space-y-3">
            {filteredAttractions.map(attraction => (
              <div
                key={attraction.id}
                onClick={() => setSelectedAttraction(attraction)}
                className="attraction-card p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl md:text-3xl flex-shrink-0">{attraction.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base truncate">
                      {attraction.name}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative h-96 lg:h-auto z-0">
        <MapContainer
          center={[11.9404, 108.4388]}
          zoom={13}
          className="w-full h-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {filteredAttractions.map(attraction => (
            <Marker
              key={attraction.id}
              position={[attraction.lat, attraction.lng]}
              eventHandlers={{
                click: () => setSelectedAttraction(attraction)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{attraction.name}</h3>
                  <p className="text-sm">{attraction.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Selected Attraction Modal */}
        {selectedAttraction && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[1000]">
            <div className="glass-card max-w-md w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <span className="text-5xl md:text-6xl">{selectedAttraction.icon}</span>
                <h2 className="text-xl md:text-2xl font-bold mt-4 bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
                  {selectedAttraction.name}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  {selectedAttraction.description}
                </p>
              </div>

              {!showRideOptions ? (
                <div className="space-y-3">
                  <button
                    onClick={() => getDirections(selectedAttraction)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Navigation2 className="w-5 h-5" />
                    <span>Get Directions</span>
                  </button>

                  <button
                    onClick={() => setShowRideOptions(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Car className="w-5 h-5" />
                    <span>Book a Ride</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowRideOptions(false)
                      setSelectedAttraction(null)
                    }}
                    className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-center mb-4">Choose Your Ride</h3>
                  {rideServices.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (service.url) window.open(service.url, '_blank')
                        else if (service.phone) window.open(`tel:${service.phone}`)
                        else alert(`${service.name}: ${service.info}`)
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${service.color} text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <span>{service.name}</span>
                      </div>
                      {service.info && <span className="text-sm opacity-90">{service.info}</span>}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowRideOptions(false)}
                    className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Back
                  </button>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">💡 Travel Tip:</p>
                    <p>Click "Get Directions" to open Google Maps. Click "Book a Ride" to connect with local transportation services!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  )
}

export default MapPage
