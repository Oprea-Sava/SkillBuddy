import React from "react";
import "../../css/dashboard/courses.css";
import CourseCard from "./courseCard";

function Courses() {
	return (
		<>
			<div id="courses">
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

				<div className="courses text">
					<div>Recently enrolled courses</div>
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
			</div>
		</>
	);
}

export default Courses;
