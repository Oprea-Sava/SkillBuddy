import React from "react";
import "../../css/dashboard/wishlist.css";
import Courses from "./courses";

function Wishlist() {
	return (
		<>
			<div id="wishlist">
				<div className="wishlist text">Wishlist</div>

				<Courses />
			</div>
		</>
	);
}

export default Wishlist;
