import React from "react";
import "../../css/dashboard/wishlist.css";
import Courses from "./courses";

function Wishlist() {
	return (
		<>
			<div id="wishlist">
				<Courses courseType={"Wishlisted Courses"} userSpecific={true} />
			</div>
		</>
	);
}

export default Wishlist;
