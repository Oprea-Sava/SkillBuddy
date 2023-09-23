import React from 'react'
import './css/landingPage.css'
import HeroContainer from './landingPageComponents/hero'
import CourseHighlights from './landingPageComponents/highlights'
import SkillSpotlight from './landingPageComponents/spotlight'
import CallToAction from './landingPageComponents/callToAction'

function LandingPage() {
    return (
        <>
            <HeroContainer />
            <CourseHighlights />
            <SkillSpotlight />
            <CallToAction />
        </>
    )
}

export default LandingPage