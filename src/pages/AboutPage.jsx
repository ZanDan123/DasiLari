import React from 'react'
import { Link } from 'react-router-dom'
import { Thermometer, Mountain, Building2, Coffee, Palette, Heart, MapPin, Plane, Backpack, Clock, DollarSign, Lightbulb, HelpCircle } from 'lucide-react'
import Joyride from 'react-joyride'
import { useTour } from '../hooks/useTour'
import { useLanguage } from '../contexts/LanguageContext'

const AboutPage = () => {
  const { t } = useLanguage()
  
  // Tour guide
  const { run, startTour, handleJoyrideCallback } = useTour('about')
  
  const tourSteps = [
    {
      target: 'body',
      content: t('aboutPage.tourWelcome'),
      placement: 'center',
    },
  ]
  
  const features = [
    {
      icon: <Thermometer className="w-12 h-12" />,
      title: t('aboutPage.features.climate.title'),
      description: t('aboutPage.features.climate.description'),
    },
    {
      icon: <Mountain className="w-12 h-12" />,
      title: t('aboutPage.features.nature.title'),
      description: t('aboutPage.features.nature.description'),
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: t('aboutPage.features.heritage.title'),
      description: t('aboutPage.features.heritage.description'),
    },
    {
      icon: <Coffee className="w-12 h-12" />,
      title: t('aboutPage.features.coffee.title'),
      description: t('aboutPage.features.coffee.description'),
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: t('aboutPage.features.arts.title'),
      description: t('aboutPage.features.arts.description'),
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: t('aboutPage.features.produce.title'),
      description: t('aboutPage.features.produce.description'),
    },
  ]

  const infoBoxes = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t('aboutPage.info.location.title'),
      content: t('aboutPage.info.location.content'),
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: t('aboutPage.info.howToGet.title'),
      items: t('aboutPage.info.howToGet.items'),
    },
    {
      icon: <Backpack className="w-8 h-8" />,
      title: t('aboutPage.info.whatToBring.title'),
      items: t('aboutPage.info.whatToBring.items'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('aboutPage.info.bestTime.title'),
      items: t('aboutPage.info.bestTime.items'),
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('aboutPage.info.tips.title'),
      items: t('aboutPage.info.tips.items'),
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t('aboutPage.info.currency.title'),
      items: t('aboutPage.info.currency.items'),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-6 md:space-y-8 relative">
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
        title={t('common.showGuide')}
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      
      {/* Hero Section */}
      <div className="glass-card p-6 md:p-12 text-center relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-5 animate-float">
          <div className="text-[200px] md:text-[300px]">�</div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-dalat-green/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-dalat-yellow/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-dalat-green to-dalat-yellow bg-clip-text text-transparent mb-4 relative z-10 animate-slide-up">
          {t('aboutPage.welcomeTitle')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-semibold relative z-10 animate-slide-up delay-200">
          {t('aboutPage.welcomeSubtitle')}
        </p>
      </div>

      {/* Features Grid */}
      <div className="glass-card p-6 md:p-10 animate-fade-in delay-300">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-green to-dalat-yellow bg-clip-text text-transparent mb-6 md:mb-10 animate-slide-up">
          {t('aboutPage.highlightsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-transparent hover:border-dalat-green/30 transition-all duration-300 hover:shadow-dalat-hover hover:-translate-y-2 group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-dalat-green mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-dalat-green-dark mb-3 group-hover:text-dalat-green transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Information Boxes */}
      <div className="glass-card p-6 md:p-10 animate-fade-in delay-500">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-green to-dalat-yellow bg-clip-text text-transparent mb-6 md:mb-10 animate-slide-up">
          {t('aboutPage.essentialInfo')}
        </h2>
        <div className="space-y-4 md:space-y-6">
          {infoBoxes.map((box, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white/80 to-gray-50/80 p-4 md:p-6 rounded-2xl border-l-4 md:border-l-6 border-dalat-green hover:translate-x-2 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg cursor-pointer group animate-slide-in-left"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="text-dalat-green flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {box.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-dalat-green-dark mb-3 group-hover:text-dalat-green transition-colors duration-300">
                    {box.title}
                  </h3>
                  {box.content && (
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {box.content}
                    </p>
                  )}
                  {box.items && (
                    <ul className="space-y-2 text-sm md:text-base text-gray-700">
                      {box.items.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <span className="text-dalat-green mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-dalat-pink/10 to-dalat-blue/10 relative overflow-hidden animate-fade-in delay-700">
        <div className="absolute top-0 left-0 w-40 h-40 bg-dalat-green/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-dalat-yellow/10 rounded-full blur-3xl animate-blob delay-1000"></div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-green to-dalat-yellow bg-clip-text text-transparent mb-4 relative z-10 animate-bounce-subtle">
          {t('aboutPage.readyToExplore')}
        </h2>
        <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-medium relative z-10">
          {t('aboutPage.startPlanning')}
        </p>
        <Link
          to="/"
          className="inline-block dalat-button text-base md:text-lg relative z-10 group"
        >
          <span className="relative z-10">{t('common.exploreMap')}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {t('common.exploreMap')}
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
