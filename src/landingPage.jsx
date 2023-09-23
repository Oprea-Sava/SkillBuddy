import './landingPage.css'

function HeroContainer() {

    return (
        <div id="heroContainer">
            <div className="textSide">
                <h1>Learm more things <br /> Do more things</h1>
                <h4>Sign Up Now!</h4>
                <button className="heroButton">Sign Up</button>
            </div>
            <div className="imageSide">
                <img src="#" alt="heroPhoto" />
            </div>
        </div>
    )
}

function CourseHighlights() {

    return (
        <div id="highlightsContainer">
            <h1>Course Highlights</h1>
            <div>
                <div className="highlights">
                    <div className="highlightCard"></div>
                </div>
                <button>See More Courses</button>
            </div>
        </div>
    )
}

function SkillSpotlight() {

    return (
        <div id="spotlightContainer">
            <div className="spotlightCard"></div>
        </div>
    )
}

function CallToAction() {

    return (
        <div id="callToAction">

        </div>
    )
}

export { HeroContainer, CourseHighlights, SkillSpotlight, CallToAction }