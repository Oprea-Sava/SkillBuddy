import React, { useState, useEffect, useContext } from "react";
import CourseCard from "./courseCard";
import "../../css/dashboard/courses.css";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function Courses({ courseType, userSpecific }) {
	const [courseIds, setCourseIds] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [wishlistChanged, setWishlistChanged] = useState(false);
	
	function toCamelCase(inputString) {
		const words = inputString.split(" ");
		const firstWord = words[0].toLowerCase();
		const camelCasedWords = words
		  .slice(1)
		  .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
		const camelCasedString = [firstWord, ...camelCasedWords].join("");
	  
		return camelCasedString;
	  }
	useEffect(() => {
		setIsLoading(true);
		setCourseIds([]);
		const fetchCourseIds = async () => {
			try {
				if (!userSpecific) {
					const response = await fetch(
						"http://localhost:5000/api/courses/getall"
					);
					if (response.ok) {
						const data = await response.json();
						setCourseIds(data);
					} else {
						toast.error(`HTTP error! Status: ${response.status}`);
						throw new Error(
							`HTTP error! Status: ${response.status}`
						);
					}
				} else {
					
					const token = localStorage.getItem("token");
					const response = await fetch(
						`http://localhost:5000/api/users/${token}
						)}`
					);
					if (response.ok) {
						const data = await response.json();
						const camelCaseType = toCamelCase(courseType)
						setCourseIds(data[camelCaseType]|| []);
					} else {
						toast.error(`HTTP error! Status: ${response.status}`);
						throw new Error(
							`HTTP error! Status: ${response.status}`
						);
					}
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			} finally {
				// setTimeout(()=>{
				    setIsLoading(false)
			    // },200)
			}
		};
		fetchCourseIds();
	}, [wishlistChanged]);

	return (
		<>
			<div className="courses text">
				<div>{courseType}</div>
			
					{ isLoading ? (<div className="loaderContainer"><ClipLoader color="#683bd8"/></div>):
					(<div className="coursesContainer">
					{courseIds.map((id, index) => (
						<CourseCard
							Id={id}
							key={index}
							onWishlistChange={() => setWishlistChanged(true)}
							courseType={courseType}
						/>
					))}
					</div>)}
			</div>
		</>
	);
}

export default Courses;
