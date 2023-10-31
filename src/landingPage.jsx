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
            <div className='separator top'></div>
            <Features/>
            <div className='separator bottom'></div>
            <Hook />
            <div className='separator top'></div>
            <CallToAction />
            <Footer/>
        </>
    )
}

export default LandingPage