import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Sunrise, Sun, Sunset, Moon, Coffee, UtensilsCrossed, HelpCircle } from 'lucide-react'
import Joyride from 'react-joyride'
import { useTour } from '../hooks/useTour'

const ItineraryPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [itinerary, setItinerary] = useState([])
  
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
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}')
    setUserPreferences(prefs)
    
    if (prefs.currentMood && prefs.duration) {
      generateItinerary(prefs)
    }
  }, [])

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

  if (!userPreferences || !userPreferences.currentMood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Calendar className="w-24 h-24 mx-auto text-dalat-pink mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Personalized Itinerary</h2>
            <p className="text-gray-600 mb-6">
              Complete the survey to get a mood-based itinerary tailored just for you!
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
            📅 Your {userPreferences.duration}-Day Itinerary
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <span className="text-3xl mr-2">{getMoodEmoji(userPreferences.currentMood)}</span>
            Curated for your <span className="font-semibold mx-1 capitalize">{userPreferences.currentMood}</span> mood
          </p>
        </div>

        {/* Itinerary Days */}
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
