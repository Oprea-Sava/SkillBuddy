import React from 'react'
import './css/landingPage.css'
import HeroContainer from './landingPageComponents/hero'
import CourseHighlights from './landingPageComponents/highlights'
import SkillSpotlight from './landingPageComponents/spotlight'
import CallToAction from './landingPageComponents/callToAction'
import Navbar from './navbar'
import Footer from './footer'
import Features from './landingPageComponents/features'

function LandingPage() {
    return (
        <>
            <Navbar/>
            <HeroContainer />
            <Features/>
            <CourseHighlights />
            <SkillSpotlight />
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage