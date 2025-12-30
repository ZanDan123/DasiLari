import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Info, ClipboardList, Users, Calendar, Camera, Send, Mail, Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t, language, setLanguage, languages } = useLanguage()
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
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
    { to: '/', icon: MapPin, labelKey: 'nav.map' },
    { to: '/about', icon: Info, labelKey: 'nav.about' },
    { to: '/survey', icon: ClipboardList, labelKey: 'nav.survey' },
    { to: '/buddies', icon: Users, labelKey: 'nav.buddies' },
    { to: '/itinerary', icon: Calendar, labelKey: 'nav.itinerary' },
    { to: '/photos', icon: Camera, labelKey: 'nav.photos' },
  ]

  const currentLang = languages.find(l => l.code === language)

  return (
    <footer className="bg-gradient-to-br from-dalat-green-dark/95 to-dalat-green/95 text-white backdrop-blur-lg border-t-4 border-dalat-yellow/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Info & Links */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <img src="/img/DasiLari_logo.png" alt="DasiLari Logo" className="h-12 md:h-14 w-auto" />
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-dalat-yellow bg-clip-text text-transparent">
                  DasiLari
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  {t('footer.tagline')}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-bold text-lg mb-3">{t('footer.quickLinks')}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{t(link.labelKey)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* About Info */}
            <div>
              <h4 className="font-bold text-lg mb-3">{t('footer.about')}</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {t('footer.aboutText')}
              </p>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t('footer.language')}
              </h4>
              <div className="relative inline-block">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg border border-white/30 transition-all duration-200"
                >
                  <span className="text-xl">{currentLang?.flag}</span>
                  <span className="text-sm font-medium">{currentLang?.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setIsLangMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-dalat-green/10 text-dalat-green' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-dalat-green">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs md:text-sm text-white/60">
                {t('footer.copyright')}
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-6 h-6 text-dalat-yellow" />
              <h4 className="font-bold text-lg md:text-xl">{t('footer.contactUs')}</h4>
            </div>
            <p className="text-sm text-white/80 mb-4">
              {t('footer.contactText')}
            </p>

            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-lg text-sm">
                {t('footer.messageSent')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('footer.yourName')}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-dalat-yellow focus:outline-none focus:ring-2 focus:ring-dalat-yellow/50 transition-all text-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('footer.yourEmail')}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-dalat-yellow focus:outline-none focus:ring-2 focus:ring-dalat-yellow/50 transition-all text-sm"
                />
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('footer.yourMessage')}
                  required
                  rows={formData.message.length > 100 ? 6 : 4}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-dalat-yellow focus:outline-none focus:ring-2 focus:ring-dalat-yellow/50 transition-all resize-none text-sm"
                  style={{
                    minHeight: '80px',
                    maxHeight: '200px',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-dalat-yellow to-dalat-yellow-dark hover:from-dalat-yellow-dark hover:to-dalat-yellow text-dalat-green-dark font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t('footer.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('footer.sendMessage')}</span>
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
