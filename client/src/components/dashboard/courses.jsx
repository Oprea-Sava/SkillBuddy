import React, { useState, useEffect } from "react";
import CourseCard from "./courseCard";
import "../../css/dashboard/courses.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courses({ courseType, userSpecific }) {
	const [courseIds, setCourseIds] = useState([]);
	const [wishlistChanged, setWishlistChanged] = useState(false);
	useEffect(() => {
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
					setWishlistChanged(false);
					const token = localStorage.getItem("token");
					const response = await fetch(
						`http://localhost:5000/api/users/${token}/courses?type=${encodeURIComponent(
							courseType
						)}`
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
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};
		fetchCourseIds();
	}, [wishlistChanged]);

	return (
		<>
			<div className="courses text">
				<div>{courseType}</div>
				<div className="coursesContainer">
					{courseIds.map((id, index) => (
						<CourseCard
							Id={id}
							key={index}
							onWishlistChange={() => setWishlistChanged(true)}
							courseType={courseType}
						/>
					))}
				</div>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</div>
		</>
	);
}

export default Courses;
