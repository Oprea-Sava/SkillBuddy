import FeatureCard from "./featureCard";
import "../../css/landingPage/features.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { SlWallet } from "react-icons/sl";
import { useTheme } from "../../themeContext";

function Features() {
	const { theme } = useTheme();
    let iconTheme = "dark";

    if(theme == "light"){
        iconTheme = "black";
    }
    else {
        iconTheme = "#bbcbff";
    }

	return (
		<div id="featuresContainer">
			<div className="text titleText">Features</div>
			<div className="features">
				<FeatureCard
					Component={<FaRegLightbulb size={50} color={iconTheme}/>}
					Feature={"Creativity"}
					Description={"You can do whatever you want"}
                    theme = {theme}
				/>
				<FeatureCard
					Component={<FaEarthAmericas size={50}  color={iconTheme}/>}
					Feature={"Worldwide"}
					Description={"Mr. 305 Mr. Worldwide"}
                    theme = {theme}
				/>
				<FeatureCard
					Component={<SlWallet size={50}  color={iconTheme}/>}
					Feature={"Free"}
					Description={"Almost free"}
                    theme = {theme}
				/>
			</div>
		</div>
	);
}

export default Features;
