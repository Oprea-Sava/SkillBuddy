import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/reset.css'
import './css/main.css'
import LandingPage from './landingPage'
import Navbar from './navbar'
import Footer from './footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Navbar />
    <LandingPage />
    <Footer />

  </React.StrictMode>
)
