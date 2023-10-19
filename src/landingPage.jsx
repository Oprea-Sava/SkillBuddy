import React from 'react'
import HeroContainer from './landingPageComponents/hero'
import CourseHighlights from './landingPageComponents/highlights'
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
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage