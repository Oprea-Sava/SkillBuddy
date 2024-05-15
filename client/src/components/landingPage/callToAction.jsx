import "../../css/landingPage/callToAction.css"
import { useNavigate } from "react-router-dom"

function CallToAction() {
    const navigate = useNavigate()
    function handleNavigate(){
        navigate("/dashboard")
    }
    return (
        <div id="callToAction">
            <div>
                <div className="text bigText">Join Our Community Today</div>
                <div className="text smallText">Start your jurney to lifelong learning and self-improvement</div>
            </div>
            <button className="text ctaButton" onClick={handleNavigate}>Get Started</button>
        </div>
    )
}

export default CallToAction
