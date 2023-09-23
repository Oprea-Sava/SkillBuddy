import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { HeroContainer , CourseHighlights , SkillSpotlight , CallToAction} from './landingPage'
import Navbar from './navbar'
import Footer from './footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Navbar />
    <HeroContainer />
    <CourseHighlights />
    <SkillSpotlight />
    <CallToAction />
    <Footer />

  </React.StrictMode>
)
