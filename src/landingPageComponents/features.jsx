import FeatureCard from "./featureCard"

function Features() {

    return (
        <div id="featuresContainer">
            <h1>Features</h1>
            <div className="features">
                <FeatureCard src={"#"} />
                <FeatureCard src={"#"} />
                <FeatureCard src={"#"} />
            </div>
        </div>
    )
}

export default Features