import React from 'react'
import './css/landingPage.css'
import HeroContainer from './landingPageComponents/hero'
import CourseHighlights from './landingPageComponents/highlights'
import CallToAction from './landingPageComponents/callToAction'
import Navbar from './navbar'
import Footer from './footer'
import Features from './landingPageComponents/features'
import AboutUs from './landingPageComponents/aboutUs'

function LandingPage() {
    return (
        <>
            <Navbar/>
            <HeroContainer />
            <Features/>
            <CourseHighlights />
            <AboutUs />
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage