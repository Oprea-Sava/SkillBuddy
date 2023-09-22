import './landingPage.css'

function Navbar() {

    return (
        <div id="navSection">
            <div className="logo">
                <img src="#" alt="logo" />
            </div>
            <nav className="navContainer">
                <button className="home">Home</button>
                <button className="courses">Courses</button>
                <button className="skillExchange">Skill Exchange</button>
                <button className="aboutUs">About Us</button>
                <button className="contact">Contact</button>
                <button className="signUp">Sign up</button>
            </nav>
        </div>
    )
}

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
            <div className="highlights">
                <div className="highlightCard"></div>
            </div>
            <button>See More Courses</button>
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

function Footer() {

    return (
        <div id="footer">

        </div>
    )
}

export { Navbar, HeroContainer, CourseHighlights, SkillSpotlight, CallToAction, Footer }