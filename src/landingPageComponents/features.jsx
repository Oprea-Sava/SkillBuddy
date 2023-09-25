import FeatureCard from "./featureCard"
import { useState } from "react"

function Features () {
    const [active, setActive] = useState(3);

    return (
        <div id="featuresContainer">
            <FeatureCard isActive = {active == 0} onShow = {()=>setActive(0)}/>
            <FeatureCard isActive = {active == 1} onShow = {()=>setActive(1)}/>
            <FeatureCard isActive = {active == 2} onShow = {()=>setActive(2)}/>
            <FeatureCard isActive = {active == 3} onShow = {()=>setActive(3)}/>
        </div>
    )
}

export default Features