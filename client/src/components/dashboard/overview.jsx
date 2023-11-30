import React from "react";
import "../../css/dashboard/overview.css";
import Courses from "./courses";

function Overview() {
	return (
		<>
			<div id="overview">
				<div className="courseType text">
					<div>
						<div>Enrollerd Courses</div>
						<div className="coursesNumber">1</div>
					</div>
					<div>
						<div>Active Courses</div>
						<div className="coursesNumber">1</div>
					</div>
					<div>
						<div>Finished Courses</div>
						<div className="coursesNumber">1</div>
					</div>
				</div>

				<Courses courseType={"Enrolled Courses"} userSpecific={true}/>
			</div>
		</>
	);
}

export default Overview;
