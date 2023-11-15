import FeatureCard from "./featureCard"
import "../../css/landingPage/features.css"
import { FaRegLightbulb } from "react-icons/fa6"
import { FaEarthAmericas } from "react-icons/fa6"
import { SlWallet } from "react-icons/sl"

function Features() {

    return (
        <div id="featuresContainer">
            <div className="text titleText">Features</div>
            <div className="features">
                <FeatureCard Component={<FaRegLightbulb/>} Feature={"Creativity"} Description={"You can do whatever you want"}/>
                <FeatureCard Component={<FaEarthAmericas/>}  Feature={"Worldwide"} Description={"Mr. 305 Mr. Worldwide"}/>
                <FeatureCard Component={<SlWallet/>}  Feature={"Free"} Description={"Almost free"}/>
            </div>
        </div>
    )
}

export default Features