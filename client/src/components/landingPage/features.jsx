import FeatureCard from "./featureCard";
import "../../css/landingPage/features.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { SlWallet } from "react-icons/sl";
import { useTheme } from "../../themeContext";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "gsap/all";

function Features() {
	const { theme } = useTheme();
	let iconTheme = "dark";

	if (theme == "light") {
		iconTheme = "black";
	} else {
		iconTheme = "#bbcbff";
	}


	const firstFeature = useRef(null);
	const secondFeature = useRef(null);
	const thirdFeature = useRef(null);
	let matchMedia = gsap.matchMedia();
	let breakpoint = 769;
	gsap.registerPlugin(ScrollTrigger);

	useLayoutEffect(() => {
	const features = [firstFeature.current, secondFeature.current, thirdFeature.current];
	matchMedia.add(
		{
			isMobile: `(max-width: ${breakpoint}px)`,
			isDesktop: `(min-width:  ${breakpoint + 1}px)`,
		},
		(context) => {
			let { isMobile } = context.conditions;
			features.forEach(feature => {
				gsap.to(feature, {
					opacity: isMobile ? 1 : 0,
					x: isMobile ? 600 : 0,
					y: isMobile ? 0 : 100,
					duration: 0.5,
					scrollTrigger: {
						trigger:feature,
						start:"top 80%",
						end: "bottom 20%",
						toggleActions: isMobile ? "play reverse play reverse" : "reverse play  play"
					}
				})
			});
		}
	);
	return () => matchMedia.revert()

	}, []);

	return (
		<div id="featuresContainer">
			<div className="text titleText">Features</div>
			<div className="features" >
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
