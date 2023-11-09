import React, { useState } from "react";
import "../../css/dashboard/userCourses.css";
import Courses from "./courses";

function UserCourses() {
	const [option, setOption] = useState("Enrolled Courses");

	return (
		<>
			<div id="userCourses">
				<div className="courseTypeSelection">
					<button
						className="enrolledCourses"
						onClick={() => {
							setOption("Enrolled Courses");
						}}
					>
						Enrolled Courses
					</button>
					<button
						className="activeCourses"
						onClick={() => {
							setOption("Active Courses");
						}}
					>
						Active Courses
					</button>
					<button
						className="completedCourses"
						onClick={() => {
							setOption("Completed Courses");
						}}
					>
						Completed Courses
					</button>
				</div>

				<Courses courseType={option} />
			</div>
		</>
	);
}

export default UserCourses;
