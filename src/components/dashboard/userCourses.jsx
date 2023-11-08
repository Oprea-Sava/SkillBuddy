import React from "react";
import "../../css/dashboard/userCourses.css";
import { Outlet } from "react-router-dom";

function UserCourses() {
	return (
		<>
			<div id="userCourses">
				<div className="courseTypeSelection">
					<button>Enrolled Courses</button>
					<button>Active Courses</button>
					<button>Completed Courses</button>
				</div>
				
				<Outlet />
			</div>
		</>
	);
}

export default UserCourses;
