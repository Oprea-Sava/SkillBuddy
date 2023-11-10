import React, { useEffect } from "react";
import { useState } from "react";
import "./css/errorPage.css";
import placeholder from "./assets/placeholder.png";

function ErrorPage() {
	const [clickNumber, getClickNumber] = useState(0);

	function handleClick() {
		getClickNumber(clickNumber + 1);
	}

	const easterEggStyle = {
		display: clickNumber > 5 ? "flex" : "none",
	};

	return (
		<>
			<div id="errorPage">
				<div className="errorMessage text">
					<div className="bigPrompt">Oops!</div>
					<div className="midPrompt">
						Sorry, an unexpected error has occured.
					</div>
					<div onClick={() => handleClick()} className="smallPrompt">
						Not Found
					</div>
				</div>

				<div className="easterEgg" style={easterEggStyle}>
					<img
						className="easterEgg"
						src={placeholder}
						alt="this is an easter egg and should not be taken seriously into consideration"
					/>
					<div className="text">Congratulations! You found me!</div>
				</div>
			</div>
		</>
	);
}

export default ErrorPage;
