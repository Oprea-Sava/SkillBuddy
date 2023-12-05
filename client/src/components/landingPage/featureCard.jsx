import React, { useState } from "react";

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
				<div className="featureTitle text subtitleText">{Feature}</div>
				<div className="featureContent text">{Description}</div>
			</div>
		</div>
	);
}
