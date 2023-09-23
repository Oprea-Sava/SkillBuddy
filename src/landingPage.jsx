import React from 'react'
import './css/landingPage.css'
import HeroContainer from './landingPageComponents/hero'
import CourseHighlights from './landingPageComponents/highlights'
import SkillSpotlight from './landingPageComponents/spotlight'
import CallToAction from './landingPageComponents/callToAction'
import Navbar from './navbar'
import Footer from './footer'

function LandingPage() {
    return (
        <>
            <Navbar/>
            <HeroContainer />
            <CourseHighlights />
            <SkillSpotlight />
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage