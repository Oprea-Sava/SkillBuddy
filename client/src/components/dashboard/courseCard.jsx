import React, { useState, useEffect } from "react";
import placeholder from "../../assets/placeholder.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

function CourseCard({ Id, onWishlistChange, courseType }) {
	const [isActive, setIsActive] = useState(false);
	const [courseData, setCourseData] = useState({});

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/${Id}`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json();
					setCourseData(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};

		const checkWishlist = async (Id) => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://localhost:5000/api/users/${token}/checkwishlist`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ course: Id }),
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const isWishlisted = await response.json();
				setIsActive(isWishlisted);
			} catch (error) {
				console.error("Error checking course:", error);
			}
		};
		checkWishlist(Id);
		fetchCourseData();
	}, []);

	const handleBuy = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				`http://localhost:5000/api/users/${token}/addcourse`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ course: Id }),
				}
			);
			if (!response.ok) {
				if (response.status === 403) {
					console.error("User is already enrolled in the course");
					toast.info("User is already enrolled in the course");
				} else {
					toast.error(`HTTP error! Status: ${response.status}`);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
			}
			else{
				toast.success("Course enrolled successfully!");
			}
		} catch (error) {
			console.error("Error adding course:", error);
		}
	};

	const handleWish = async () => {
		const token = localStorage.getItem("token");
		try{
			const response = await fetch(
				`http://localhost:5000/api/users/${token}/wishlistcourse`,
				{
					method: "PUT",
					headers:{
						"Content-Type": "application/json",
					},
					body: JSON.stringify({course: Id}),
				}
			)
			if (!response.ok) {
				toast.error(`HTTP error! Status: ${response.status}`);
				throw new Error(`HTTP error! Status: ${response.status}`);
			} else if(courseType=="Wishlisted Courses"){
                onWishlistChange();
            }
			if(isActive) {
				toast.success("Course removed from wishlist!");
			}
			else {
				toast.success("Course added to wishlist!");
			}
		}
		catch{
			console.error("Error adding course:", error);
		}
	}

	return (
		<>
			<div className="courseCard">
				<div className="courseCardImageHolder">
					<div className="coursePrice">{courseData.price}</div>
				</div>
				<div className="courseCardDetails">
					<div>
						<div className="authorName">{courseData.author}</div>
						<div
							className="bookmark"
							onClick={() => {
								setIsActive(!isActive);
								handleWish();
							}}
						>
							{isActive ? (
								<FaHeart size={15} />
							) : (
								<FaRegHeart size={15} />
							)}
						</div>
					</div>
					<div>{courseData.title}</div>
					{/* if the name is too long the button gets out of the card */}
					<div>
						<button
							onClick={() => {
								handleBuy();
							}}
						>
							Buy Now
						</button>
					</div>
				</div>

				
			</div>
		</>
	);
}

export default CourseCard;
