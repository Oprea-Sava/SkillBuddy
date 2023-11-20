import React from "react";
import CourseCard from "./courseCard";
import "../../css/dashboard/courses.css";

function Courses( {courseType} ) {
	return (
		<>
			<div className="courses text">
				<div>{courseType}</div>
				<div className="coursesContainer">
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
				</div>
			</div>
		</>
	);
}

export default Courses;
