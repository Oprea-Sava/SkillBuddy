import hero from '../assets/hero.png'
function HeroContainer() {

    return (
        <div id="heroContainer">
            <div className="textSide">
                <div className="text heroBig">Unlock a World of Skills at SkillBuddy</div>
                <div className="text heroSmall">Where Learning Meets Community</div>
                <button className="primary text heroButton">Sign Up</button>
            </div>
            <div className="imageSide">
                <img src={hero} alt="heroPhoto" />
            </div>
        </div>
    )
}

export default HeroContainer