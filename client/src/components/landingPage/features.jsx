import FeatureCard from "./featureCard";
import "../../css/landingPage/features.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { SlWallet } from "react-icons/sl";
import { useTheme } from "../../themeContext";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "gsap/all";

function Features() {
	const { theme } = useTheme();
	let iconTheme = "dark";

	if (theme == "light") {
		iconTheme = "black";
	} else {
		iconTheme = "#bbcbff";
	}

	const features = useRef(null);
	const firstFeature = useRef(null);
	const secondFeature = useRef(null);
	const thirdFeature = useRef(null);

	let matchMedia = gsap.matchMedia();
	let breakPoint = 769;

	matchMedia.add(`(max-width: ${breakPoint - 1}px)`, () => {
			useEffect(() => {
				gsap.registerPlugin(ScrollTrigger);
				gsap.to(".firstFeature", {
					x: 600,
					duration: 0.5,
					scrollTrigger: {
						trigger: ".firstFeature",
						start: "center 90%",
					},
				});
				gsap.to(".secondFeature", {
					x: 600,
					duration: 0.5,
					scrollTrigger: {
						trigger: ".secondFeature",
						start: "center 90%",
					},
				});
				gsap.to(".thirdFeature", {
					x: 600,
					duration: 0.5,
					scrollTrigger: {
						trigger: ".thirdFeature",
						start: "center 90%",
					},
				});
			}, []);

			return () => {
				matchMedia.revert();
			};
		}
	);

	matchMedia.add(`(min-width: ${breakPoint}px)`, () => {
		useEffect(() => {
			gsap.registerPlugin(ScrollTrigger);
			gsap.to(".features", {
				duration: 0.5,
				ease: "fadeIn",
				scrollTrigger: {
					trigger: ".features",
					start: "center 90%",
				},
			});
		}, []);

		return () => {
			matchMedia.revert();
		};
	}
);

	return (
		<div id="featuresContainer">
			<div className="text titleText">Features</div>
			<div className="features" ref={features}>
				<div className="firstFeature" ref={firstFeature}>
					<FeatureCard
						Component={
							<FaRegLightbulb size={50} color={iconTheme} />
						}
						Feature={"Creativity"}
						Description={"You can do whatever you want"}
						theme={theme}
					/>
				</div>
				<div className="secondFeature" ref={secondFeature}>
					<FeatureCard
						Component={
							<FaEarthAmericas size={50} color={iconTheme} />
						}
						Feature={"Worldwide"}
						Description={"Mr. 305 Mr. Worldwide"}
						theme={theme}
					/>
				</div>
				<div className="thirdFeature" ref={thirdFeature}>
					<FeatureCard
						Component={<SlWallet size={50} color={iconTheme} />}
						Feature={"Free"}
						Description={"Almost free"}
						theme={theme}
					/>
				</div>
			</div>
		</div>
	);
}

export default Features;
