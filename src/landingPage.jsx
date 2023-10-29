import React from 'react'
import HeroContainer from './landingPageComponents/hero'
import Hook from './landingPageComponents/hook'
import CallToAction from './landingPageComponents/callToAction'
import Navbar from './navbar'
import Footer from './footer'
import Features from './landingPageComponents/features'

function LandingPage() {
    return (
        <>
            <Navbar/>
            <div className='separator nav'></div>
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