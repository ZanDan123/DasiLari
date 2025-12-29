import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, Sunrise, Sun, Sunset, Moon, Coffee, UtensilsCrossed, HelpCircle, Plus, Star, Loader2 } from 'lucide-react'
import Joyride from 'react-joyride'
import { useTour } from '../hooks/useTour'
import { getDestinations, generateItinerary as generateItineraryAPI } from '../services/api'

const ItineraryPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [suggestedPlaces, setSuggestedPlaces] = useState([])
  const [myTravelList, setMyTravelList] = useState([])
  const [apiDestinations, setApiDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Tour guide
  const { run, startTour, handleJoyrideCallback } = useTour('itinerary')
  
  const tourSteps = [
    {
      target: 'body',
      content: 'Welcome to the Itinerary page! AI creates personalized day-by-day plans based on your mood and preferences. 📅',
      placement: 'center',
    },
  ]

  useEffect(() => {
    // Try userPreferences first, fallback to dalatSurvey
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || localStorage.getItem('dalatSurvey') || '{}')
    const savedTravelList = JSON.parse(localStorage.getItem('myTravelList') || '[]')
    setUserPreferences(prefs)
    setMyTravelList(savedTravelList)
    
    // Fetch destinations from API
    const fetchDestinations = async () => {
      try {
        const destinations = await getDestinations()
        if (destinations && destinations.length > 0) {
          // Transform API data to match component format
          const transformedDestinations = destinations.map(dest => ({
            id: dest.id,
            name: dest.name,
            category: mapCategory(dest.category),
            image: `https://placehold.co/800x600/2d5016/ffffff?text=${encodeURIComponent(dest.name)}`,
            description: dest.description,
            mood: getMoodFromCategory(dest.category),
            rating: 4.5 + Math.random() * 0.5,
            estimatedCost: dest.estimated_cost,
            estimatedTime: dest.estimated_time,
            location: dest.location,
            photoSpot: dest.photo_spot
          }))
          setApiDestinations(transformedDestinations)
        }
      } catch (error) {
        console.warn('Failed to fetch destinations from API:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDestinations()
    
    if (prefs.currentMood || prefs.interests) {
      if (prefs.currentMood && prefs.duration) {
        generateItinerary(prefs)
      }
      generateSuggestedPlaces(prefs)
    }
  }, [])
  
  const mapCategory = (category) => {
    const categoryMap = {
      'local': 'nature',
      'famous': 'culture',
    }
    return categoryMap[category] || category || 'nature'
  }
  
  const getMoodFromCategory = (category) => {
    const moodMap = {
      'nature': ['relaxed', 'happy', 'romantic'],
      'culture': ['cultural', 'relaxed'],
      'adventure': ['adventurous', 'happy'],
      'food': ['happy', 'cultural', 'relaxed'],
      'photography': ['happy', 'romantic', 'adventurous'],
      'local': ['relaxed', 'cultural'],
      'famous': ['happy', 'cultural']
    }
    return moodMap[category] || ['happy', 'relaxed']
  }
  
  // Function to generate AI itinerary using API
  const generateAIItinerary = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId || myTravelList.length === 0) {
      alert('Please complete the survey and add places to your travel list first!')
      return
    }
    
    setIsGenerating(true)
    try {
      const destinationIds = myTravelList.map(place => place.id).filter(id => id)
      const today = new Date().toISOString().split('T')[0]
      
      const result = await generateItineraryAPI({
        user_id: parseInt(userId),
        destination_ids: destinationIds,
        visit_date: today,
        emotion: userPreferences?.currentMood || null
      })
      
      // Transform API result to component format
      if (result.schedule) {
        const generatedItinerary = [{
          day: 1,
          activities: result.schedule.map(item => ({
            name: item.destination,
            time: item.time_slot,
            icon: getIconForDestination(item.destination),
            duration: `${item.duration} minutes`,
            activity: item.activity_description || 'Explore and enjoy',
            cost: item.cost
          }))
        }]
        setItinerary(generatedItinerary)
      }
    } catch (error) {
      console.error('Failed to generate AI itinerary:', error)
      alert('Failed to generate itinerary. Using local suggestions instead.')
      if (userPreferences) {
        generateItinerary(userPreferences)
      }
    } finally {
      setIsGenerating(false)
    }
  }
  
  const getIconForDestination = (name) => {
    const iconMap = {
      'lake': '🏞️',
      'mountain': '⛰️',
      'waterfall': '🌊',
      'market': '🛍️',
      'palace': '🏛️',
      'pagoda': '⛩️',
      'cafe': '☕',
      'garden': '🌸',
      'valley': '💕'
    }
    const lowerName = name.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) return icon
    }
    return '📍'
  }

  const generateItinerary = (prefs) => {
    const moodActivities = {
      happy: [
        { name: 'Xuan Huong Lake', time: 'morning', icon: '🏞️', duration: '2 hours', activity: 'Peaceful walk around the lake' },
        { name: 'Da Lat Market', time: 'afternoon', icon: '🛍️', duration: '2 hours', activity: 'Local shopping & snacks' },
        { name: 'Night Market', time: 'evening', icon: '🌃', duration: '2 hours', activity: 'Street food tour' }
      ],
      relaxed: [
        { name: 'Cu Lan Hill', time: 'morning', icon: '🌲', duration: '3 hours', activity: 'Tea plantation visit' },
        { name: 'Spa & Coffee', time: 'afternoon', icon: '☕', duration: '2 hours', activity: 'Relaxation time' },
        { name: 'Sunset at Lake', time: 'evening', icon: '🌅', duration: '1 hour', activity: 'Evening stroll' }
      ],
      adventurous: [
        { name: 'Datanla Falls', time: 'morning', icon: '🌊', duration: '3 hours', activity: 'Canyoning & alpine coaster' },
        { name: 'Langbiang Mountain', time: 'afternoon', icon: '⛰️', duration: '4 hours', activity: 'Hiking & jeep tour' },
        { name: 'BBQ Dinner', time: 'evening', icon: '🍖', duration: '2 hours', activity: 'Local BBQ experience' }
      ],
      romantic: [
        { name: 'Love Valley', time: 'morning', icon: '💕', duration: '2 hours', activity: 'Romantic walk' },
        { name: 'Crazy House', time: 'afternoon', icon: '🏰', duration: '2 hours', activity: 'Unique architecture' },
        { name: 'Rooftop Dinner', time: 'evening', icon: '🌹', duration: '2 hours', activity: 'Candlelight dinner' }
      ],
      cultural: [
        { name: 'Bao Dai Palace', time: 'morning', icon: '🏛️', duration: '2 hours', activity: 'Historical tour' },
        { name: 'Linh Phuoc Pagoda', time: 'afternoon', icon: '⛩️', duration: '2 hours', activity: 'Temple exploration' },
        { name: 'Traditional Show', time: 'evening', icon: '🎭', duration: '2 hours', activity: 'Cultural performance' }
      ]
    }

    const activities = moodActivities[prefs.currentMood] || moodActivities.happy
    const days = parseInt(prefs.duration) || 3

    const generatedItinerary = []
    for (let day = 1; day <= days; day++) {
      generatedItinerary.push({
        day,
        activities: activities.map(act => ({ ...act }))
      })
    }

    setItinerary(generatedItinerary)
  }

  const generateSuggestedPlaces = (prefs) => {
    // Database of all places based on interests and mood
    const placesDatabase = {
      nature: [
        {
          id: 1,
          name: 'Cu Lan Hill',
          category: 'nature',
          image: 'https://placehold.co/800x600/2d5016/ffffff?text=Cu+Lan+Hill+%F0%9F%8C%B2',
          description: 'Stunning pine forests with rolling hills and tea plantations. Perfect for nature lovers seeking tranquility.',
          mood: ['relaxed', 'happy', 'romantic'],
          rating: 4.8
        },
        {
          id: 2,
          name: 'Xuan Huong Lake',
          category: 'nature',
          image: 'https://placehold.co/800x600/1e40af/ffffff?text=Xuan+Huong+Lake+%F0%9F%8F%9E%EF%B8%8F',
          description: 'Beautiful heart-shaped lake in the center of Da Lat. Ideal for morning walks and sunset views.',
          mood: ['relaxed', 'romantic', 'happy'],
          rating: 4.7
        },
        {
          id: 3,
          name: 'Dalat Flower Gardens',
          category: 'nature',
          image: 'https://placehold.co/800x600/db2777/ffffff?text=Dalat+Flower+Gardens+%F0%9F%8C%B8',
          description: 'Colorful flower displays year-round with hydrangeas, roses, and unique plant species.',
          mood: ['happy', 'romantic', 'relaxed'],
          rating: 4.6
        }
      ],
      culture: [
        {
          id: 4,
          name: 'Bao Dai Palace',
          category: 'culture',
          image: 'https://placehold.co/800x600/92400e/ffffff?text=Bao+Dai+Palace+%F0%9F%8F%9B%EF%B8%8F',
          description: 'Former summer residence of the last emperor of Vietnam. Rich history and beautiful architecture.',
          mood: ['cultural', 'relaxed'],
          rating: 4.5
        },
        {
          id: 5,
          name: 'Linh Phuoc Pagoda',
          category: 'culture',
          image: 'https://placehold.co/800x600/c026d3/ffffff?text=Linh+Phuoc+Pagoda+%E2%9B%A9%EF%B8%8F',
          description: 'Stunning mosaic temple decorated with broken glass and pottery. A masterpiece of art.',
          mood: ['cultural', 'happy'],
          rating: 4.9
        }
      ],
      adventure: [
        {
          id: 6,
          name: 'Datanla Falls',
          category: 'adventure',
          image: 'https://placehold.co/800x600/0891b2/ffffff?text=Datanla+Falls+%F0%9F%8C%8A',
          description: 'Exciting waterfall with alpine coaster and canyoning activities. Adrenaline rush guaranteed!',
          mood: ['adventurous', 'happy'],
          rating: 4.7
        },
        {
          id: 7,
          name: 'Langbiang Mountain',
          category: 'adventure',
          image: 'https://placehold.co/800x600/0f766e/ffffff?text=Langbiang+Mountain+%E2%9B%B0%EF%B8%8F',
          description: 'Highest peak in Da Lat. Hiking trails and jeep tours with breathtaking panoramic views.',
          mood: ['adventurous', 'cultural'],
          rating: 4.8
        }
      ],
      food: [
        {
          id: 8,
          name: 'Da Lat Market',
          category: 'food',
          image: 'https://placehold.co/800x600/ea580c/ffffff?text=Da+Lat+Market+%F0%9F%9B%8D%EF%B8%8F',
          description: 'Central market with fresh produce, local snacks, and authentic Vietnamese street food.',
          mood: ['happy', 'cultural', 'relaxed'],
          rating: 4.6
        },
        {
          id: 9,
          name: 'Night Market',
          category: 'food',
          image: 'https://placehold.co/800x600/7c3aed/ffffff?text=Night+Market+%F0%9F%8C%83',
          description: 'Vibrant night market offering street food, grilled specialties, and local delicacies.',
          mood: ['happy', 'adventurous'],
          rating: 4.7
        }
      ],
      photography: [
        {
          id: 10,
          name: 'Crazy House',
          category: 'photography',
          image: 'https://placehold.co/800x600/ec4899/ffffff?text=Crazy+House+%F0%9F%8F%B0',
          description: 'Unique surrealist architecture resembling a fairy tale treehouse. Instagram paradise!',
          mood: ['happy', 'romantic', 'adventurous'],
          rating: 4.9
        },
        {
          id: 11,
          name: 'Love Valley',
          category: 'photography',
          image: 'https://placehold.co/800x600/f43f5e/ffffff?text=Love+Valley+%F0%9F%92%95',
          description: 'Romantic valley with heart-shaped decorations, perfect for couples and photo enthusiasts.',
          mood: ['romantic', 'happy'],
          rating: 4.5
        }
      ],
      relaxation: [
        {
          id: 12,
          name: 'Da Lat Coffee Plantations',
          category: 'relaxation',
          image: 'https://placehold.co/800x600/78350f/ffffff?text=Coffee+Plantations+%E2%98%95',
          description: 'Peaceful coffee farms where you can taste fresh Vietnamese coffee and enjoy mountain views.',
          mood: ['relaxed', 'cultural'],
          rating: 4.7
        }
      ]
    }

    // Filter places based on user interests and mood
    let suggested = []
    
    if (prefs.interests && prefs.interests.length > 0) {
      prefs.interests.forEach(interest => {
        if (placesDatabase[interest]) {
          suggested = [...suggested, ...placesDatabase[interest]]
        }
      })
    }

    // Filter by mood if available
    if (prefs.currentMood && suggested.length > 0) {
      suggested = suggested.filter(place => 
        place.mood.includes(prefs.currentMood)
      )
    }

    // If no matches, show popular places
    if (suggested.length === 0) {
      suggested = [
        ...placesDatabase.nature,
        ...placesDatabase.culture,
        ...placesDatabase.adventure
      ].slice(0, 6)
    }

    // Remove duplicates and limit to 8 places
    const uniquePlaces = Array.from(new Map(suggested.map(item => [item.id, item])).values())
    setSuggestedPlaces(uniquePlaces.slice(0, 8))
  }

  const addToTravelList = (place) => {
    // Check if already in list
    if (myTravelList.find(p => p.id === place.id)) {
      alert('This place is already in your travel list!')
      return
    }

    const updatedList = [...myTravelList, place]
    setMyTravelList(updatedList)
    localStorage.setItem('myTravelList', JSON.stringify(updatedList))
    
    // Show success message
    alert(`✅ ${place.name} added to your travel list! AI will use this to create your personalized itinerary.`)
  }

  const getTimeIcon = (time) => {
    switch (time) {
      case 'morning': return <Sunrise className="w-5 h-5" />
      case 'afternoon': return <Sun className="w-5 h-5" />
      case 'evening': return <Sunset className="w-5 h-5" />
      case 'night': return <Moon className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      relaxed: '😌',
      adventurous: '🤠',
      romantic: '💕',
      cultural: '🎭'
    }
    return emojis[mood] || '😊'
  }

  // If no preferences at all, show prompt
  if (!userPreferences || (!userPreferences.interests && !userPreferences.currentMood)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Calendar className="w-24 h-24 mx-auto text-dalat-pink mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Personalized Itinerary</h2>
            <p className="text-gray-600 mb-6">
              Complete the survey to get a mood-based itinerary and place recommendations tailored just for you!
            </p>
            <Link
              to="/survey"
              className="inline-block px-8 py-3 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Take Survey
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8 relative">
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
        className="fixed bottom-6 right-6 z-[999] bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-4 rounded-full shadow-2xl hover:shadow-dalat-hover transition-all duration-300 hover:scale-110"
        title="Show Guide"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
            📅 Your Travel Recommendations
          </h1>
          {userPreferences.currentMood && userPreferences.duration ? (
            <p className="text-gray-600 text-lg flex items-center justify-center">
              <span className="text-3xl mr-2">{getMoodEmoji(userPreferences.currentMood)}</span>
              Curated for your <span className="font-semibold mx-1 capitalize">{userPreferences.currentMood}</span> mood
            </p>
          ) : (
            <p className="text-gray-600 text-lg">
              Personalized place recommendations based on your interests
            </p>
          )}
        </div>

        {/* Suggested Places for Your Trip */}
        {suggestedPlaces.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Star className="w-8 h-8 text-yellow-500" />
                Suggested Places for Your Trip
              </h2>
              <p className="text-gray-600">
                {userPreferences.currentMood 
                  ? `Based on your interests and ${userPreferences.currentMood} mood`
                  : 'Based on your selected interests'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedPlaces.map((place) => (
                <div key={place.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Place Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-sm">{place.rating}</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-dalat-pink/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold capitalize">{place.category}</span>
                    </div>
                  </div>

                  {/* Place Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-dalat-pink" />
                      {place.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {place.description}
                    </p>

                    {/* Add to Travel List Button */}
                    <button
                      onClick={() => addToTravelList(place)}
                      disabled={myTravelList.find(p => p.id === place.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        myTravelList.find(p => p.id === place.id)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                      {myTravelList.find(p => p.id === place.id) 
                        ? 'Added to List' 
                        : 'Add to My Travel List'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* My Travel List Summary */}
            {myTravelList.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3 text-green-900 flex items-center gap-2">
                  ✅ Your Travel List ({myTravelList.length} places)
                </h3>
                <p className="text-green-800 mb-3">
                  Great choices! Our AI will use these places to create a personalized itinerary for you.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {myTravelList.map((place) => (
                    <span 
                      key={place.id} 
                      className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm"
                    >
                      {place.name}
                    </span>
                  ))}
                </div>
                {/* Generate AI Itinerary Button */}
                <button
                  onClick={generateAIItinerary}
                  disabled={isGenerating}
                  className="w-full py-4 px-6 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating AI Itinerary...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5" />
                      🤖 Generate AI Itinerary
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Itinerary Days - Only show if we have mood and duration */}
        {itinerary.length > 0 && userPreferences.currentMood && userPreferences.duration && (
          <div className="space-y-8">
          {itinerary.map((day) => (
            <div key={day.day} className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
              {/* Day Header */}
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  {day.day}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Day {day.day}</h2>
                  <p className="text-gray-600">Full day of {userPreferences.currentMood} activities</p>
                </div>
              </div>

              {/* Activities Timeline */}
              <div className="space-y-6 relative pl-8">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dalat-pink to-dalat-blue"></div>

                {day.activities.map((activity, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[1.875rem] top-6 w-4 h-4 bg-white border-4 border-dalat-pink rounded-full z-10"></div>

                    {/* Activity Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all">
                      {/* Time Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-dalat-blue font-semibold capitalize">
                          {getTimeIcon(activity.time)}
                          <span>{activity.time}</span>
                        </div>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.duration}
                        </span>
                      </div>

                      {/* Activity Info */}
                      <div className="flex items-start space-x-3">
                        <span className="text-4xl">{activity.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-dalat-pink" />
                            {activity.name}
                          </h3>
                          <p className="text-gray-600">{activity.activity}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-white hover:bg-dalat-pink hover:text-white px-4 py-2 rounded-lg font-semibold transition-all border-2 border-dalat-pink text-dalat-pink">
                          Get Directions
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                          Book Ride
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Meal Breaks */}
                <div className="relative">
                  <div className="absolute -left-[1.875rem] top-4 w-4 h-4 bg-white border-4 border-yellow-400 rounded-full z-10"></div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                    <div className="flex items-center space-x-2 text-yellow-700">
                      <UtensilsCrossed className="w-5 h-5" />
                      <span className="font-semibold">Meal breaks & rest</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">
          <h3 className="font-bold text-lg mb-3 text-blue-900">💡 Travel Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Book transportation in advance for popular attractions</li>
            <li>• Da Lat weather can change quickly - bring a light jacket</li>
            <li>• Best time to visit most places is early morning to avoid crowds</li>
            <li>• Try local strawberries and artichoke tea!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ItineraryPage
