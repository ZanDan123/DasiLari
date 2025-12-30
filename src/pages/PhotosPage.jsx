import React, { useState, useEffect } from 'react'
import { Camera, MapPin, Sunrise, Sunset, Sun, Instagram, Heart, Share2, Navigation, HelpCircle, Plus, Star, Loader2 } from 'lucide-react'
import Joyride from 'react-joyride'
import { useTour } from '../hooks/useTour'
import { getPhotoSpots } from '../services/api'

const PhotosPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [myPhotoList, setMyPhotoList] = useState([])
  const [apiPhotoSpots, setApiPhotoSpots] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [generalTips, setGeneralTips] = useState([])
  
  // Tour guide
  const { run, startTour, handleJoyrideCallback } = useTour('photos')
  
  const tourSteps = [
    {
      target: 'body',
      content: 'Welcome to the Photos page! Discover the most Instagram-worthy spots in Da Lat with perfect timing and photography tips. 📸',
      placement: 'center',
    },
  ]

  useEffect(() => {
    // Try userPreferences first, fallback to dalatSurvey
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || localStorage.getItem('dalatSurvey') || '{}')
    const savedPhotoList = JSON.parse(localStorage.getItem('myPhotoList') || '[]')
    setUserPreferences(prefs)
    setMyPhotoList(savedPhotoList)
    
    // Fetch photo spots from API
    const fetchPhotoSpots = async () => {
      try {
        const data = await getPhotoSpots()
        if (data.photo_spots && data.photo_spots.length > 0) {
          // Transform API data to match component format
          const transformedSpots = data.photo_spots.map((spot, index) => ({
            id: spot.id || index + 1,
            name: spot.name,
            category: spot.category || 'nature',
            icon: getCategoryIcon(spot.category),
            image: `https://placehold.co/800x600/2d5016/ffffff?text=${encodeURIComponent(spot.name)}`,
            bestTime: getBestTime(spot.photography_tips),
            tips: spot.photogenic_features,
            coordinates: [11.9165 + Math.random() * 0.05, 108.4388 + Math.random() * 0.05],
            instagrammability: 90 + Math.floor(Math.random() * 10),
            features: spot.photography_tips || ['Beautiful scenery', 'Great lighting'],
            estimatedCost: spot.estimated_cost,
            estimatedTime: spot.estimated_time
          }))
          setApiPhotoSpots(transformedSpots)
        }
        if (data.general_tips) {
          setGeneralTips(data.general_tips)
        }
      } catch (error) {
        console.warn('Failed to fetch photo spots from API:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPhotoSpots()
  }, [])
  
  const getCategoryIcon = (category) => {
    const icons = {
      local: '🌲',
      famous: '🏛️',
      nature: '🌲',
      culture: '⛩️',
      adventure: '🌊',
      cafe: '☕',
      architecture: '🏰'
    }
    return icons[category] || '📸'
  }
  
  const getBestTime = (tips) => {
    if (!tips || tips.length === 0) return 'morning'
    const tipText = tips.join(' ').toLowerCase()
    if (tipText.includes('sunrise')) return 'sunrise'
    if (tipText.includes('sunset')) return 'sunset'
    if (tipText.includes('afternoon')) return 'afternoon'
    return 'morning'
  }

  const photoSpots = [
    {
      id: 1,
      name: 'Cu Lan Hill',
      category: 'nature',
      icon: '🌲',
      image: 'https://placehold.co/800x600/2d5016/ffffff?text=Cu+Lan+Hill+%F0%9F%8C%B2',
      bestTime: 'sunrise',
      tips: 'Pine forests with rolling hills. Golden hour provides amazing lighting through the trees.',
      coordinates: [11.9165, 108.4388],
      instagrammability: 98,
      features: ['Pine forests', 'Tea plantations', 'Rolling hills', 'Misty mornings']
    },
    {
      id: 2,
      name: 'Xuan Huong Lake',
      category: 'nature',
      icon: '🏞️',
      image: 'https://placehold.co/800x600/1e40af/ffffff?text=Xuan+Huong+Lake+%F0%9F%8F%9E%EF%B8%8F',
      bestTime: 'sunset',
      tips: 'Perfect reflections of the city lights. Sunset colors paint the water beautifully.',
      coordinates: [11.9404, 108.4388],
      instagrammability: 95,
      features: ['Lake reflections', 'City skyline', 'Sunset views', 'Swan boats']
    },
    {
      id: 3,
      name: 'Crazy House',
      category: 'architecture',
      icon: '🏰',
      image: 'https://placehold.co/800x600/ec4899/ffffff?text=Crazy+House+%F0%9F%8F%B0',
      bestTime: 'afternoon',
      tips: 'Unique surrealist architecture. Every corner offers a creative shot!',
      coordinates: [11.9426, 108.4200],
      instagrammability: 99,
      features: ['Unique architecture', 'Creative angles', 'Colorful design', 'Hidden corners']
    },
    {
      id: 4,
      name: 'Linh Phuoc Pagoda',
      category: 'culture',
      icon: '⛩️',
      image: 'https://placehold.co/800x600/c026d3/ffffff?text=Linh+Phuoc+Pagoda+%E2%9B%A9%EF%B8%8F',
      bestTime: 'afternoon',
      tips: 'Stunning mosaic temple made from broken glass and pottery. Best lighting in afternoon.',
      coordinates: [11.9876, 108.4650],
      instagrammability: 97,
      features: ['Mosaic art', 'Dragon sculpture', 'Bell tower', 'Colorful details']
    },
    {
      id: 5,
      name: 'Datanla Falls',
      category: 'adventure',
      icon: '🌊',
      image: 'https://placehold.co/800x600/0891b2/ffffff?text=Datanla+Falls+%F0%9F%8C%8A',
      bestTime: 'morning',
      tips: 'Capture the waterfall with morning mist. Action shots on the alpine coaster!',
      coordinates: [11.9143, 108.4378],
      instagrammability: 94,
      features: ['Waterfall', 'Alpine coaster', 'Jungle scenery', 'Adventure shots']
    },
    {
      id: 6,
      name: 'Dalat Flower Gardens',
      category: 'nature',
      icon: '🌸',
      image: 'https://placehold.co/800x600/db2777/ffffff?text=Dalat+Flower+Gardens+%F0%9F%8C%B8',
      bestTime: 'morning',
      tips: 'Colorful flower displays year-round. Morning dew makes flowers sparkle.',
      coordinates: [11.9436, 108.4364],
      instagrammability: 96,
      features: ['Flower displays', 'Colorful gardens', 'Hydrangeas', 'Rose garden']
    },
    {
      id: 7,
      name: 'Love Valley',
      category: 'nature',
      icon: '💕',
      image: 'https://placehold.co/800x600/f43f5e/ffffff?text=Love+Valley+%F0%9F%92%95',
      bestTime: 'sunset',
      tips: 'Romantic spot with heart-shaped decorations. Sunset creates magical atmosphere.',
      coordinates: [11.8956, 108.4012],
      instagrammability: 93,
      features: ['Heart decorations', 'Valley views', 'Romantic spots', 'Sunset silhouettes']
    },
    {
      id: 8,
      name: 'La Dalatte Cafe',
      category: 'cafe',
      icon: '☕',
      image: 'https://placehold.co/800x600/78350f/ffffff?text=Coffee+Cafe+%E2%98%95',
      bestTime: 'afternoon',
      tips: 'Stunning valley views from the terrace. Perfect for lifestyle photography.',
      coordinates: [11.9234, 108.4156],
      instagrammability: 98,
      features: ['Valley panorama', 'Trendy interior', 'Coffee art', 'Terrace views']
    }
  ]

  const filters = [
    { id: 'all', name: 'All Spots', icon: '📸' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'architecture', name: 'Architecture', icon: '🏰' },
    { id: 'culture', name: 'Culture', icon: '⛩️' },
    { id: 'adventure', name: 'Adventure', icon: '🌊' },
    { id: 'cafe', name: 'Cafes', icon: '☕' },
    { id: 'local', name: 'Local', icon: '🏠' },
    { id: 'famous', name: 'Famous', icon: '⭐' }
  ]

  // Use API data if available, otherwise use default photoSpots
  const allPhotoSpots = apiPhotoSpots.length > 0 ? apiPhotoSpots : photoSpots

  const filteredSpots = selectedFilter === 'all' 
    ? allPhotoSpots 
    : allPhotoSpots.filter(spot => spot.category === selectedFilter)

  // Filter spots based on user preferences
  const getRecommendedSpots = () => {
    if (!userPreferences) return allPhotoSpots

    let recommended = [...allPhotoSpots]

    // Filter by interests if user has photography interest
    if (userPreferences.interests && userPreferences.interests.includes('photography')) {
      // Show all spots with high instagrammability
      recommended = recommended.filter(spot => spot.instagrammability >= 95)
    }

    // Filter by mood
    if (userPreferences.currentMood) {
      const moodCategories = {
        happy: ['nature', 'cafe', 'culture'],
        relaxed: ['nature', 'cafe'],
        adventurous: ['adventure', 'nature'],
        romantic: ['nature', 'architecture'],
        cultural: ['culture', 'architecture']
      }

      const preferredCategories = moodCategories[userPreferences.currentMood] || []
      if (preferredCategories.length > 0) {
        recommended = recommended.filter(spot => 
          preferredCategories.includes(spot.category)
        )
      }
    }

    return recommended.length > 0 ? recommended : allPhotoSpots
  }

  const recommendedSpots = getRecommendedSpots()

  const addToPhotoList = (spot) => {
    // Check if already in list
    if (myPhotoList.find(p => p.id === spot.id)) {
      alert('This photo spot is already in your list!')
      return
    }

    const updatedList = [...myPhotoList, spot]
    setMyPhotoList(updatedList)
    localStorage.setItem('myPhotoList', JSON.stringify(updatedList))
    
    // Show success message
    alert(`📸 ${spot.name} added to your photo list! AI will help you plan the best photography route.`)
  }

  const getTimeIcon = (time) => {
    switch (time) {
      case 'sunrise': return <Sunrise className="w-4 h-4" />
      case 'sunset': return <Sunset className="w-4 h-4" />
      default: return <Sun className="w-4 h-4" />
    }
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
            primaryColor: '#2d7a3a',
            zIndex: 10000,
          },
        }}
      />
      
      {/* Guide Button */}
      <button
        onClick={startTour}
        className="fixed bottom-6 right-6 z-[999] bg-gradient-to-r from-dalat-green to-dalat-yellow text-white p-4 rounded-full shadow-2xl hover:shadow-dalat-hover transition-all duration-300 hover:scale-110"
        title="Show Guide"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dalat-green to-dalat-yellow bg-clip-text text-transparent">
            📸 Photo-Perfect Locations
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 mr-2" />
            {filteredSpots.length} Instagram-worthy spots waiting for you!
          </p>
        </div>

        {/* Recommended Photo Spots Based on Survey */}
        {recommendedSpots.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Camera className="w-8 h-8 text-dalat-green" />
                Recommended for You
              </h2>
              <p className="text-gray-600">
                {userPreferences && userPreferences.currentMood 
                  ? `Perfect photo spots based on your ${userPreferences.currentMood} mood and interests`
                  : 'Perfect photo spots based on your interests'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recommendedSpots.map(spot => (
                <div
                  key={spot.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="font-bold text-sm">{spot.instagrammability}%</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-dalat-green/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-semibold">RECOMMENDED</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 capitalize">
                      {getTimeIcon(spot.bestTime)}
                      <span className="font-semibold text-sm">{spot.bestTime}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1 flex items-center">
                          <span className="text-2xl mr-2">{spot.icon}</span>
                          {spot.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                          {spot.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{spot.tips}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {spot.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Add to Photo List Button */}
                    <button
                      onClick={() => addToPhotoList(spot)}
                      disabled={myPhotoList.find(p => p.id === spot.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        myPhotoList.find(p => p.id === spot.id)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-dalat-green to-dalat-yellow text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                      {myPhotoList.find(p => p.id === spot.id) 
                        ? 'Added to List' 
                        : 'Add to My Photo List'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* My Photo List Summary */}
            {myPhotoList.length > 0 && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3 text-pink-900 flex items-center gap-2">
                  📸 Your Photo Spots ({myPhotoList.length} locations)
                </h3>
                <p className="text-pink-800 mb-3">
                  Awesome! AI will help you plan the best photography route to capture all these amazing spots.
                </p>
                <div className="flex flex-wrap gap-2">
                  {myPhotoList.map((spot) => (
                    <span 
                      key={spot.id} 
                      className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm flex items-center gap-1"
                    >
                      <Camera className="w-3 h-3" />
                      {spot.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-dalat-green to-dalat-yellow text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-dalat-green/10'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </div>

        {/* Photo Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map(spot => (
            <div
              key={spot.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="font-bold text-sm">{spot.instagrammability}%</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 capitalize">
                  {getTimeIcon(spot.bestTime)}
                  <span className="font-semibold text-sm">{spot.bestTime}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center">
                      <span className="text-2xl mr-2">{spot.icon}</span>
                      {spot.name}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                      {spot.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{spot.tips}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {spot.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-dalat-green hover:text-white rounded-xl transition-all">
                    <Navigation className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-dalat-green hover:text-white rounded-xl transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="col-span-1 bg-gradient-to-r from-dalat-green to-dalat-yellow text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                    Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photography Tips */}
        <div className="mt-12 bg-gradient-to-r from-dalat-green/10 to-dalat-yellow/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Camera className="w-8 h-8 mr-3 text-dalat-green" />
            Pro Photography Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-green">🌅 Golden Hour Magic</h4>
              <p className="text-gray-600 text-sm">
                Best lighting occurs 1 hour after sunrise and 1 hour before sunset. Plan your photo shoots accordingly!
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-green">📱 Mobile Photography</h4>
              <p className="text-gray-600 text-sm">
                Use portrait mode for depth, HDR for landscapes, and clean your lens before shooting!
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-green">👥 Avoid Crowds</h4>
              <p className="text-gray-600 text-sm">
                Visit popular spots early morning (before 8 AM) or late afternoon to get cleaner shots.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-green">🎨 Composition Tips</h4>
              <p className="text-gray-600 text-sm">
                Use the rule of thirds, look for leading lines, and frame your subject with natural elements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotosPage
