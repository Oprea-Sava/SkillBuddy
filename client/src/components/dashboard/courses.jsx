import React, { useState, useEffect } from "react";
import CourseCard from "./courseCard";
import "../../css/dashboard/courses.css";

function Courses( {courseType} ) {
	const [courseIds, setCourseIds] = useState([]);
	useEffect(() => {
		const fetchCourseIds = async () => {
		  try {
			const response = await fetch('http://localhost:5000/api/courses/getall')
			if(response.ok){
				const data = await response.json();
				setCourseIds(data);
			}else throw new Error(`HTTP error! Status: ${response.status}`)
		  } catch (error) {
			console.error('Error fetching courses:', error);
		  }
		};
	
		fetchCourseIds();
		
	  }, []);


	return (
		<>
			<div className="courses text">
				<div className="coursesContainer">
					{
						courseIds.map((id, index)=>(
							<CourseCard id={id} key={index}/>
						))
					}
				</div>
			</div>
		</>
	);
}

export default Courses;
