import React, { useState, useEffect } from 'react'
import { Users, MapPin, Clock, Heart, MessageCircle } from 'lucide-react'

const BuddiesPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}')
    setUserPreferences(prefs)
    
    // Generate mock matches based on user preferences
    if (prefs.interests) {
      generateMatches(prefs)
    }
  }, [])

  const generateMatches = (prefs) => {
    const mockUsers = [
      {
        id: 1,
        name: 'Sarah',
        country: 'USA',
        personality: 'extrovert',
        interests: ['Nature', 'Photography', 'Adventure'],
        destinations: ['Xuan Huong Lake', 'Cu Lan Hill', 'Datanla Falls'],
        timeSlots: ['morning', 'afternoon'],
        matchScore: 95
      },
      {
        id: 2,
        name: 'Takeshi',
        country: 'Japan',
        personality: 'introvert',
        interests: ['Photography', 'Culture', 'Food'],
        destinations: ['Crazy House', 'Bao Dai Palace', 'Da Lat Market'],
        timeSlots: ['afternoon', 'evening'],
        matchScore: 88
      },
      {
        id: 3,
        name: 'Emma',
        country: 'UK',
        personality: 'extrovert',
        interests: ['Adventure', 'Nature', 'Food'],
        destinations: ['Datanla Falls', 'Langbiang Mountain', 'Cu Lan Hill'],
        timeSlots: ['morning'],
        matchScore: 92
      },
      {
        id: 4,
        name: 'Marco',
        country: 'Italy',
        personality: 'extrovert',
        interests: ['Culture', 'Food', 'Photography'],
        destinations: ['Da Lat Market', 'Linh Phuoc Pagoda', 'Crazy House'],
        timeSlots: ['afternoon', 'evening'],
        matchScore: 85
      }
    ]

    // Filter matches based on shared interests
    const filteredMatches = mockUsers.filter(user => {
      const sharedInterests = user.interests.filter(interest => 
        prefs.interests?.includes(interest)
      )
      return sharedInterests.length > 0
    })

    setMatches(filteredMatches.sort((a, b) => b.matchScore - a.matchScore))
  }

  if (!userPreferences || !userPreferences.findBuddies) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Users className="w-24 h-24 mx-auto text-dalat-pink mb-4" />
            <h2 className="text-3xl font-bold mb-4">Find Travel Buddies</h2>
            <p className="text-gray-600 mb-6">
              Complete the survey and enable "Find Travel Buddies" to connect with other travelers!
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
            🤝 Your Travel Buddies
          </h1>
          <p className="text-gray-600 text-lg">
            Found {matches.length} travelers with similar interests!
          </p>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{userPreferences.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold">{userPreferences.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Personality</p>
              <p className="font-semibold capitalize">{userPreferences.personality}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Your Interests</p>
            <div className="flex flex-wrap gap-2">
              {userPreferences.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 rounded-full text-sm font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map(match => (
            <div
              key={match.id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Match Score */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{match.name}</h3>
                  <p className="text-gray-600">{match.country}</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white px-4 py-2 rounded-full font-bold">
                    {match.matchScore}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Match</p>
                </div>
              </div>

              {/* Personality */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Personality</p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold capitalize">
                  {match.personality}
                </span>
              </div>

              {/* Shared Interests */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Shared Interests</p>
                <div className="flex flex-wrap gap-2">
                  {match.interests.filter(interest => 
                    userPreferences.interests?.includes(interest)
                  ).map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-dalat-pink/20 to-dalat-blue/20 rounded-full text-sm font-semibold flex items-center"
                    >
                      <Heart className="w-3 h-3 mr-1 text-dalat-pink" />
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Destinations */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Wants to visit
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  {match.destinations.slice(0, 3).map((dest, index) => (
                    <div key={index}>• {dest}</div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Available
                </p>
                <div className="flex gap-2">
                  {match.timeSlots.map((slot, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect Button */}
              <button className="w-full bg-gradient-to-r from-dalat-pink to-dalat-blue text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Connect with {match.name}
              </button>
            </div>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No matches found yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuddiesPage
