import React, { useEffect, useLayoutEffect, useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

export default function FeatureCard({ Component, Feature, Description, theme }) {
    const lightStyle = {
        backgroundColor: "#a8bcff",
        boxShadow: "5px 5px",
    };

    const darkStyle = {
        backgroundColor: "#071c61",
        boxShadow: "5px 5px inset",
    };

    const iconContainerStyle = theme === "dark" ? darkStyle : lightStyle;


	return (
		<div className="feature">
			<div className="iconContainer" style={iconContainerStyle}>{Component}</div>
			<div className="textContainer">
				<div className="featureContent text">
                <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                    })}
                    animateToNumber={Description}
                />
                </div>
				<div className="featureTitle text subtitleText">{Feature}</div>
			</div>
		</div>
	);
}
