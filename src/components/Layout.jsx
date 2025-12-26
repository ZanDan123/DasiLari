import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen dalat-gradient-bg">
      <Navigation />
      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
