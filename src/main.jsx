import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navbar, HeroContainer , CourseHighlights , SkillSpotlight , CallToAction, Footer} from './landingPage'

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
