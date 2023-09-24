import { useSearchParams } from "react-router-dom"
import FeatureCard from "./featureCard"
import { useState } from "react"

function Features () {
    const [click, handleClick] = useState(false);

    return (
        <div id="featuresContainer">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
        </div>
    )
}

export default Features