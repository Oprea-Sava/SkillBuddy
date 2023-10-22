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
            <div className='separator top'></div>
            <Features/>
            <div className='separator bottom'></div>
            <CourseHighlights />
            <div className='separator top'></div>
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage