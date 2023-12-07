import { useEffect, useRef } from 'react';
import hero from '../../assets/hero.svg'
import "../../css/landingPage/hero.css"
import { gsap, ScrollTrigger } from "gsap/all";

function HeroContainer() {

    const textSideRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".textSide", {
            x: 800,
            duration: 0.5,
            scrollTrigger: {
                trigger: ".textSide",
                start: "center 90%",
            }
        });
    }, []);

    return (
        <div id="heroContainer">
            <div ref={textSideRef} className="textSide">
                <div className="text heroBig">Unlock a World of Skills at SkillBuddy</div>
                <div className="text heroSmall">Where Learning Meets Community</div>
                <button className="secondary text heroButton">Sign Up</button>
            </div>
            <div className="imageSide">
                <img src={hero} alt="heroPhoto" />
            </div>
        </div>
    )
}

export default HeroContainer