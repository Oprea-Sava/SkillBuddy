import FeatureCard from "./featureCard";
import "../../css/landingPage/features.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { SlWallet } from "react-icons/sl";
import { useTheme } from "../../themeContext";
import { useEffect, useRef, useState } from "react";
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
	let breakpoint = 769;
	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		matchMedia.add(
			{
				isMobile: `(max-width: ${breakpoint}px)`,
				isDesktop: `(min-width:  ${breakpoint + 1}px)`,
			},
			(context) => {
				let { isDesktop, isMobile } = context.conditions;
				if (isMobile) {
					gsap.to(firstFeature.current, {
						x: 600,
						duration: 0.5,
						scrollTrigger: {
							trigger: firstFeature.current,
							start: "top 80%",
							end: "bottom 20%",
						},
						
					});
					gsap.to(secondFeature.current, {
						x: 600,
						duration: 0.5,
						scrollTrigger: {
							trigger: secondFeature.current,
							start: "top 80%",
							end: "bottom 20%",
						},
					});
					gsap.to(thirdFeature.current, {
						x: 600,
						duration: 0.5,
						scrollTrigger: {
							trigger: thirdFeature.current,
							start: "top 80%",
							end: "bottom 20%",
						},
					});
				}
				if (isDesktop) {
					gsap.to(features.current, {
						opacity: 0,
						y: 50,
						duration: 0.5,
						scrollTrigger: {
							trigger: features.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "reverse none none play",
						},
						stagger: 0.2,
					});
				}

				return () => {
					
				};
			}
		);
	}, []);

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
