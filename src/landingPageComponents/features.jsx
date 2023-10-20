import FeatureCard from "./featureCard"
import "../css/landingPageCss/features.css"
import { FaRegLightbulb } from "react-icons/fa6"
import { FaEarthAmericas } from "react-icons/fa6"
import { SlWallet } from "react-icons/sl"

function Features() {

    return (
        <div id="featuresContainer">
            <h1>Features</h1>
            <div className="features">
                <FeatureCard Component={<FaRegLightbulb/>} Feature={""} Description={""}/>
                <FeatureCard Component={<FaEarthAmericas/>}  Feature={""} Description={""}/>
                <FeatureCard Component={<SlWallet/>}  Feature={""} Description={""}/>
            </div>
        </div>
    )
}

export default Features