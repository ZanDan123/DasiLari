import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Info, ClipboardList, Menu, X, Users, Calendar, Camera } from 'lucide-react'
import Joyride from 'react-joyride'

const Navigation = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [runTour, setRunTour] = useState(false)

  useEffect(() => {
    // Chỉ chạy tour lần đầu tiên vào website
    const hasSeenTour = localStorage.getItem('hasSeenDalatTour')
    if (!hasSeenTour) {
      setTimeout(() => setRunTour(true), 1000)
    }
  }, [])

  const steps = [
    {
      target: '.nav-map',
      content: '🗺️ This is the Map page - where you explore amazing attractions in Da Lat with AI support!',
      disableBeacon: true,
    },
    {
      target: '.nav-about',
      content: '🌸 The About page tells you everything about Da Lat - climate, culture, and interesting facts!',
    },
    {
      target: '.nav-survey',
      content: '📋 Take the survey so AI can recommend attractions that match your preferences!',
    },
    {
      target: '.ai-section',
      content: '🤖 AI analyzes your preferences and recommends the best attractions for you!',
    },
    {
      target: '.attraction-card',
      content: '📍 Click on attractions to view details, get directions, and book rides!',
    },
  ]

  const handleJoyrideCallback = (data) => {
    const { status } = data
    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem('hasSeenDalatTour', 'true')
      setRunTour(false)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip',
        }}
        styles={{
          options: {
            primaryColor: '#ff6b9d',
            zIndex: 10000,
          },
          tooltip: {
            fontSize: 16,
            borderRadius: 16,
          },
          buttonNext: {
            borderRadius: 8,
            padding: '10px 20px',
          },
          buttonBack: {
            marginRight: 10,
          }
        }}
      />

      <nav className="bg-white/98 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-4 border-gradient-to-r from-dalat-pink to-dalat-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
                🌸 DasiLari
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                to="/"
                className={`nav-map flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Map</span>
              </Link>

              <Link
                to="/about"
                className={`nav-about flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/about')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>

              <Link
                to="/survey"
                className={`nav-survey flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/survey')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Survey</span>
              </Link>

              <Link
                to="/buddies"
                className={`flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/buddies')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Buddies</span>
              </Link>

              <Link
                to="/itinerary"
                className={`flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/itinerary')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Itinerary</span>
              </Link>

              <Link
                to="/photos"
                className={`flex items-center space-x-1 px-3 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  isActive('/photos')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white shadow-lg'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photos</span>
              </Link>

              <button
                onClick={() => setRunTour(true)}
                className="px-3 py-2 rounded-full font-semibold border-2 border-dalat-pink text-dalat-pink hover:bg-dalat-pink hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                Guide 💡
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`nav-map flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>Map</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`nav-about flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/about')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Info className="w-5 h-5" />
                <span>About</span>
              </Link>

              <Link
                to="/survey"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`nav-survey flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/survey')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span>Survey</span>
              </Link>

              <Link
                to="/buddies"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/buddies')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Travel Buddies</span>
              </Link>

              <Link
                to="/itinerary"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/itinerary')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>My Itinerary</span>
              </Link>

              <Link
                to="/photos"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/photos')
                    ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                    : 'hover:bg-dalat-pink/10 text-gray-700'
                }`}
              >
                <Camera className="w-5 h-5" />
                <span>Photo Spots</span>
              </Link>

              <button
                onClick={() => {
                  setRunTour(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-semibold border-2 border-dalat-pink text-dalat-pink hover:bg-dalat-pink hover:text-white transition-all"
              >
                Guide 💡
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
