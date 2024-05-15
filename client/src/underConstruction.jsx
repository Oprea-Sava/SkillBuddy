import React from "react";
import "./css/underConstruction.css";
import Navbar from "./navbar";
import Footer from "./footer";

function UnderConstruction() {
	return (
		<>
			<Navbar />
			<div className="underConstructionContent text"></div>
			<Footer />
		</>
	);
}

export default UnderConstruction;
