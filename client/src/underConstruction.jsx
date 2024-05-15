import React from "react";
import "./css/underConstruction.css";
import Navbar from "./navbar";
import Footer from "./footer";
import underConstruction from "./assets/siteUnderConstruction.png";

function UnderConstruction() {
	return (
		<>
			<Navbar />
			<div className="underConstructionContent text">
                <img src={underConstruction} alt="underConstruction" />
            </div>
			<Footer />
		</>
	);
}

export default UnderConstruction;
