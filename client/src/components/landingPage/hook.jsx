import placeholder2 from "../../assets/share.png";
import ImageCarousel from "./imageCarousel";
import "../../css/landingPage/hook.css";
import { gsap, ScrollTrigger } from "gsap/all";
import { useEffect } from 'react';


function Hook() {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".hookContainer > img", {
            x: "60vw",
            duration: 0.5,
            scrollTrigger: {
                trigger: ".hookContainer > img",
                start: "center 90%",
            }
        });
        gsap.to(".details", {
            x: "15vw",
            duration: 0.5,
            scrollTrigger: {
                trigger: ".hookContainer > img",
                start: "center 90%",
            }
        });
       
    }, []);

    return (
        <div id="hook">
            <div className="hookContainer">
                <img src={placeholder2} alt="image" />
                <div className="details">
                    <div className="text hookStatement">
                    Want to share your knowledge?
                    <br/>
                     Join us a
                        <span className="specialText"> Mentor</span>
                    </div>
                    <div className="text hookReason">
                    Are you passionate about your field of expertise? Do you want to make a positive impact on others' lives? Join our community of mentors and help shape the next generation of talent. 
                    </div>
                </div>
            </div>
            <div>
                <ImageCarousel />
            </div>
        </div>
    );
}

export default Hook;
