import React, { useState } from "react";
import "../../css/dashboard/userCourses.css";
import Courses from "./courses";
import { useOutletContext } from "react-router-dom";

function UserCourses() {
	const [change, setChange, userData] = useOutletContext();
	const [option, setOption] = useState(userData.isTutor ? "Created Courses": "Enrolled Courses");
	return (
		<>
			<div id="userCourses">
				<div className="courseTypeSelection">
					<button
						className="enrolledCourses text"
						onClick={() => {
							setOption(userData.isTutor ? "Created Courses": "Enrolled Courses");
						}}
					>
						{userData.isTutor ? "Created Courses": "Enrolled Courses"}
					</button>
					<button
						className="activeCourses text"
						onClick={() => {
							setOption(userData.isTutor ? "Published Courses":"Active Courses");
						}}
					>
						{userData.isTutor ? "Published Courses":"Active Courses"}
					</button>
					<button
						className="completedCourses text"
						onClick={() => {
							setOption(userData.isTutor ? "Unpublished Courses":"Completed Courses");
						}}
					>
						{userData.isTutor ? "Unpublished Courses":"Completed Courses"}
					</button>
				</div>

				<Courses courseType={option} userSpecific={true} />
			</div>
		</>
	);
}

export default UserCourses;
