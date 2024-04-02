import React, { useEffect, useState, useContext } from "react";
import "../../css/dashboard/overview.css";
import Courses from "./courses";
import { useOutletContext } from "react-router-dom";

function Overview() {
	const [change, setChange, userData] = useOutletContext();
	return (
		<>
			{!userData.isTutor ? 
			<div id="overview">
				<div className="courseType text">
					<div>
						<div>Enrolled Courses</div>
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
			</div> :
			<div id="overview">
			<Courses courseType={"Created Courses"} userSpecific={true}/>
		</div>
			}	
		</>
	);
}

export default Overview;
