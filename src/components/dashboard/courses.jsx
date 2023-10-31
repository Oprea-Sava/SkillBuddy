import React from "react";
import "../../css/dashboard/courses.css";
import CourseCard from "./courseCard";

function Courses() {
	return (
		<>
			<div id="courses">
				<div className="courseType text">
					<div>
						Enrollerd Courses
						<div className="boldText">1</div>
					</div>
					<div>
						Active Courses
						<div className="boldText">1</div>
					</div>
					<div>
						Finished Courses
						<div className="boldText">1</div>
					</div>
				</div>

				<div className="courses text">
					<div className="boldText">Recently enrolled courses</div>
					<div className="coursesContainer">
						<CourseCard/>
						<CourseCard/>
						<CourseCard/>
						<CourseCard/>
                        <CourseCard/>
						<CourseCard/>
						<CourseCard/>
						<CourseCard/>
                        <CourseCard/>
						<CourseCard/>
						<CourseCard/>
						<CourseCard/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Courses;
