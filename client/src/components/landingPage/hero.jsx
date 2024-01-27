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
                <div className="text heroSmall">The Leader in Online Learning</div>
                <div className="text heroBig">Engaging & Accessible Online Courses For All</div>
                <div className="text heroTrusted">Trusted by over 15K Users <br></br>worldwide since 2022</div>
                <button className="secondary text heroButton">Sign Up</button>
            </div>
            <div className="imageSide">
                <img src={hero} alt="heroPhoto" />
            </div>
        </div>
    )
}

export default HeroContainer