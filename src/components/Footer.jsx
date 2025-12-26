import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Info, ClipboardList, Users, Calendar, Camera, Send, Mail } from 'lucide-react'

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending email (you would integrate with actual email service)
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 1000)
  }

  const footerLinks = [
    { to: '/', icon: MapPin, label: 'Map' },
    { to: '/about', icon: Info, label: 'About' },
    { to: '/survey', icon: ClipboardList, label: 'Survey' },
    { to: '/buddies', icon: Users, label: 'Buddies' },
    { to: '/itinerary', icon: Calendar, label: 'Itinerary' },
    { to: '/photos', icon: Camera, label: 'Photos' },
  ]

  return (
    <footer className="bg-gradient-to-br from-dalat-purple/95 to-dalat-blue/95 text-white backdrop-blur-lg border-t-4 border-dalat-pink/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Info & Links */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-2">
                🌸 DasiLari
              </h3>
              <p className="text-sm md:text-base text-white/80">
                Your Smart Travel Companion in Da Lat
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-bold text-lg mb-3">Quick Links</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* About Info */}
            <div>
              <h4 className="font-bold text-lg mb-3">About</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                DasiLari uses AI to help you discover the best of Da Lat. Get personalized recommendations, 
                find travel buddies, and create unforgettable memories in Vietnam's beautiful highland city.
              </p>
            </div>

            {/* Copyright */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs md:text-sm text-white/60">
                © 2025 DasiLari. All rights reserved. Made with ❤️ for travelers.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-6 h-6 text-pink-300" />
              <h4 className="font-bold text-lg md:text-xl">Contact Us</h4>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Have questions or feedback? Send us a message!
            </p>

            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-lg text-sm">
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300/50 transition-all text-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300/50 transition-all text-sm"
                />
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message..."
                  required
                  rows={formData.message.length > 100 ? 6 : 4}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300/50 transition-all resize-none text-sm"
                  style={{
                    minHeight: '80px',
                    maxHeight: '200px',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
