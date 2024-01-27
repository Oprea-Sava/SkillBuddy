import React, { useState, useEffect } from "react";
import placeholder from "../../assets/placeholder.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

function CourseCard({ Id, onWishlistChange, courseType, user }) {
	const [isActive, setIsActive] = useState(false);
	const [courseData, setCourseData] = useState({});
	const [author, setAuthor] = useState("")
	const [img, setImg] = useState();
	const navigate = useNavigate()
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
					setAuthor(data.author.username)
					setCourseData(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};
		const fetchCourseImg = async () => {
            try {
              const response = await fetch(`http://localhost:5000/api/courses/image/${Id}`,
                {
                    method: "GET",
                }
              );
              if (!response.ok) {
				const errorResponse = await response.json();
				throw new Error(`Status: ${response.status} ${errorResponse.error}`);
                }
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImg(imageUrl);
            } catch (error) {
              console.error('Error fetching course image:', error);
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
		fetchCourseImg();
	}, []);
	const handleBuy = async () => {
		const token = localStorage.getItem("token");
		if(!token){
		 navigate("/signup");
		 return;
		}
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
		{!!Object.keys(courseData).length && 
				<div className="courseCard">
					<div className="courseCardImageHolder" >
						<img src= {img ? img : placeholder}/>
						<div className="coursePrice"><p>{courseData.price === 0 ? "free" : `${courseData.price}$`}</p></div>
					</div>
					<div className="courseCardDetails">
						<div>
							<div className="authorName">{author}</div>
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
						<div>
							{courseData.chapters && <div>{courseData.chapters.length} chapters</div>}
						</div>
						<div>
							{(!Object.keys(user).length || (user._id != courseData.author._id && !(user.isTutor))) &&
								<button
								className="buyButton text"
								onClick={() => {
									handleBuy();
								}}
							>
								Buy Now
							</button>
							}
							{user._id === courseData.author._id &&
								<button
								className="buyButton text"
								onClick={() => {
									navigate(`/edit/${Id}`)
								}}
							>
								Edit
							</button>
							}
						</div>
					</div>

					
				</div>
		}
		</>
	);
}

export default CourseCard;
