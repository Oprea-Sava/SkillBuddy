import React, { useState, useEffect, useContext } from "react";
import CourseCard from "./courseCard";
import "../../css/dashboard/courses.css";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function Courses({ results, courseType, userSpecific }) {
	const [courseIds, setCourseIds] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [wishlistChanged, setWishlistChanged] = useState(false);
	const [userData, setUserData] = useState({});
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
				const url = userSpecific
					? `http://localhost:5000/api/users/${localStorage.getItem("token")}`
					: `http://localhost:5000/api/courses/getall?published=true`;

				const response = await fetch(url);
				if (response.ok) {
					let data = await response.json();
					if (!userSpecific) {
						if(!!results.length){
							const commonCourses = data.filter(course => {
								return results.includes(course);
							});
						  data = commonCourses;
						}
						setCourseIds(data);
					} else {
						if (courseType === "Published Courses") {
							const filteredCourses = data.createdCourses.filter(course => course.isPublished);
							const courses= filteredCourses.map(course => course._id);
							setCourseIds(courses);
						  } else if (courseType === "Unpublished Courses") {
							const filteredCourses = data.createdCourses.filter(course => !course.isPublished);
							const courses= filteredCourses.map(course => course._id);
							setCourseIds(courses);
						  }else {
						const camelCaseType = toCamelCase(courseType);
						const courses= data[camelCaseType].map(course => course._id);
						setCourseIds(courses || []);
						}
					}
				} else {
					toast.error(`HTTP error! Status: ${response.status}`);
					throw new Error(
						`HTTP error! Status: ${response.status}`
					);
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			} finally {
				setIsLoading(false);
			}
		};
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://localhost:5000/api/users/${token}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
		fetchCourseIds();
	}, [wishlistChanged, userSpecific, courseType, results]);
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
							user={userData}
						/>
					))}
					</div>)}
			</div>
		</>
	);
}

export default Courses;
