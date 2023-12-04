import React from 'react'
import HeroContainer from './components/landingPage/hero'
import Hook from './components/landingPage/hook'
import CallToAction from './components/landingPage/callToAction'
import Navbar from './navbar'
import Footer from './footer'
import Features from './components/landingPage/features'

function LandingPage() {
    return (
        <>
            <Navbar/>
            <HeroContainer />
            <Features/>
            <Hook />
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage