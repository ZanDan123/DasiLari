import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import MapPage from './pages/MapPage'
import AboutPage from './pages/AboutPage'
import SurveyPage from './pages/SurveyPage'
import BuddiesPage from './pages/BuddiesPage'
import ItineraryPage from './pages/ItineraryPage'
import PhotosPage from './pages/PhotosPage'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/buddies" element={<BuddiesPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/photos" element={<PhotosPage />} />
        </Routes>
      </Layout>
    </Router>
    </LanguageProvider>
  )
}

export default App
