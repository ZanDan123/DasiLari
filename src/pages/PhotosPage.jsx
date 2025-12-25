import React, { useState, useEffect } from 'react'
import { Camera, MapPin, Sunrise, Sunset, Sun, Instagram, Heart, Share2, Navigation } from 'lucide-react'

const PhotosPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}')
    setUserPreferences(prefs)
  }, [])

  const photoSpots = [
    {
      id: 1,
      name: 'Cu Lan Hill',
      category: 'nature',
      icon: '🌲',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
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
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
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
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
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
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
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
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
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
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
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
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
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
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
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
    { id: 'cafe', name: 'Cafes', icon: '☕' }
  ]

  const filteredSpots = selectedFilter === 'all' 
    ? photoSpots 
    : photoSpots.filter(spot => spot.category === selectedFilter)

  const getTimeIcon = (time) => {
    switch (time) {
      case 'sunrise': return <Sunrise className="w-4 h-4" />
      case 'sunset': return <Sunset className="w-4 h-4" />
      default: return <Sun className="w-4 h-4" />
    }
  }

  if (!userPreferences || !userPreferences.photoInterest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Camera className="w-24 h-24 mx-auto text-dalat-pink mb-4" />
            <h2 className="text-3xl font-bold mb-4">Best Photo Spots</h2>
            <p className="text-gray-600 mb-6">
              Complete the survey and enable "Photo Interest" to discover the most Instagram-worthy spots!
            </p>
            <a
              href="/survey"
              className="inline-block px-8 py-3 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Take Survey
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
            📸 Photo-Perfect Locations
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 mr-2" />
            {filteredSpots.length} Instagram-worthy spots waiting for you!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-dalat-pink/10'
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
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-dalat-pink hover:text-white rounded-xl transition-all">
                    <Navigation className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-dalat-pink hover:text-white rounded-xl transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="col-span-1 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                    Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photography Tips */}
        <div className="mt-12 bg-gradient-to-r from-dalat-pink/10 to-dalat-blue/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Camera className="w-8 h-8 mr-3 text-dalat-pink" />
            Pro Photography Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-pink">🌅 Golden Hour Magic</h4>
              <p className="text-gray-600 text-sm">
                Best lighting occurs 1 hour after sunrise and 1 hour before sunset. Plan your photo shoots accordingly!
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-pink">📱 Mobile Photography</h4>
              <p className="text-gray-600 text-sm">
                Use portrait mode for depth, HDR for landscapes, and clean your lens before shooting!
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-pink">👥 Avoid Crowds</h4>
              <p className="text-gray-600 text-sm">
                Visit popular spots early morning (before 8 AM) or late afternoon to get cleaner shots.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold mb-2 text-dalat-pink">🎨 Composition Tips</h4>
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
