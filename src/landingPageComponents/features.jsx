import FeatureCard from "./featureCard"
import Image1 from '../assets/illustration.png'
import Image2 from '../assets/illustration2.png'
import Image3 from '../assets/illustration3.png'
import Image4 from '../assets/illustration4.png'

function Features () {

    return (
        <div id="featuresContainer">
            <FeatureCard src={Image1}/>
            <FeatureCard src={Image2}/>
            <FeatureCard src={Image3}/>
            <FeatureCard src={Image4}/>
        </div>
    )
}

export default Features