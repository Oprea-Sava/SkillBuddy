import React from "react";
import "./css/aboutUs.css";
import Navbar from "./navbar";
import Footer from "./footer";
import aboutUs from "./assets/aboutUs.svg";

function AboutUs() {
	return (
		<>
			<Navbar />
			<div className="aboutUsContent text">
				<div className="aboutUsTestSide">
					<div className="aboutUsSubtitle smallPrompt">ABOUT US</div>
					<div className="aboutUsTitle bigPrompt">
						Helping the learn process through the power of learning
						togther
					</div>
					<div className="aboutUsDetails mediumPrompt">
						Join us in our mission to transform lives through
						education. Whether you're embarking on a new career
						path, pursuing your academic passions, or simply eager
						to learn something new, SkillBuddy is here to help you
						reach your full potential.
					</div>
				</div>
				<div className="aboutUsPictureSide">
					<img src="./assets/aboutUs.svg" alt="placeholder" />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AboutUs;
