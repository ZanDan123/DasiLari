import React from 'react'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen dalat-gradient-bg">
      <Navigation />
      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>
      <footer className="text-center py-6 text-white font-medium text-shadow">
        <p>© 2025 DasiLari - Your Smart Travel Companion in Da Lat</p>
      </footer>
    </div>
  )
}

export default Layout
