import React, { useEffect, useState, useContext } from "react";
import "../../css/dashboard/sidebar.css";
import placeholder from "../../assets/paceholder2.png";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';



const logout = () =>{
    localStorage.removeItem('token');
	toast.info("Logged out")
}

function Sidebar({dataChange}) {
	let posIndex = 0;
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isActive, setIsActive] = useState(posIndex);
	const [userData, setUserData] = useState({})
	const [userImg, setUserImg] = useState()
	useEffect(()=>{
	const fetchUserData = async () => {
		try {
		  const token = localStorage.getItem('token');
		  const response = await fetch(`http://localhost:5000/api/users/${token}`);
		  if (!response.ok) {
			  throw new Error(`HTTP error! Status: ${response.status}`);
			}
		  const data = await response.json();
		  setUserData(data);
		} catch (error) {
		  console.error('Error fetching user data:', error);
		}
	  };
	  const fetchUserImg = async () => {
		try {
		  const token = localStorage.getItem('token');
		  const response = await fetch(`http://localhost:5000/api/users/retrieve/${token}`);
		  if (!response.ok) {
			  throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const blob = await response.blob();
			const imageUrl = URL.createObjectURL(blob);
			setUserImg(imageUrl);
		} catch (error) {
		  console.error('Error fetching user data:', error);
		}
	  };
	  fetchUserData()
	  fetchUserImg();
	},[dataChange])

	const dashboardButtons = [
		{ text: "Dasboard", path: "/dashboard/courses"},
		{ text: "My Profile", path: "/dashboard/myprofile"},
		{ text: "Your Courses", path: "/dashboard/usercourses"},
		{ text: "Wishlist", path: "/dashboard/wishlist"},
		{ text: "Order History", path: "/dashboard/orderhistory"},
	];
	
	const accountButtons = [
		{ text: "Edit Profile", path: "/dashboard/editprofile"},
		{ text: "Change Password", path: "/dashboard/changepassword"},
		{ text: "Log Out", path: "/signin"},
	];

	
	
	useEffect(() => {
		dashboardButtons.map((button, index) => {
			if (button.path == pathname.slice(0, button.path.length)) {
				posIndex = index;
			}
		});
		accountButtons.map((button, index) => {
			if (button.path == pathname.slice(0, button.path.length)) {
				posIndex = index + dashboardButtons.length;
			}
		});
		setIsActive(posIndex);
	}, [pathname]);

	function handleClick(whereTo) {
		if(whereTo === "/signin") {
			logout();
		}
		navigate(whereTo);
	}

	function resetColor(index) {
		if (isActive != index) {
			setIsActive(index);
		}
	}

	return (
		<div id="sidebarWrapper">
			<div id="sidebar">
				<div className="profile">
					{userImg? (<img src={userImg} alt=""/>):(<img src={placeholder} alt="" />)}
					<div className="username text">{userData.username}</div>
				</div>
				<div className="navigator">
					<div>
						<div className="clusterName text">Dashboard</div>
						<div className="buttonCluster">
							{dashboardButtons.map((button, index) => (
								<button
									className="text"
									key={index}
									onClick={() => {
										  handleClick(button.path);
										  resetColor(index + dashboardButtons.length);
									  }}
									style={{
										color:
											isActive === index
												? "var(--accent3)"
												: "",
										fontWeight:
											isActive === index
												? "600"
												: "",
										fontSize:
											isActive === index
												? "18px"
												: "",
									}}
								>
									{button.text}
								</button>
							))}
						</div>
					</div>
					<div>
						<div className="clusterName text">Account settings</div>
						<div className="buttonCluster">
							{accountButtons.map((button, index) => (
								<button
									className="text"
									key={index + dashboardButtons.length}
									onClick={() => {
										handleClick(button.path);
										resetColor(index + dashboardButtons.length);
									}}
									style={{
										color:
											isActive === (index + dashboardButtons.length)
												? "var(--accent3)"
												: "",
										fontWeight:
											isActive === (index + dashboardButtons.length)
												? "600"
												: "",
										fontSize:
											isActive === (index + dashboardButtons.length)
												? "18px"
												: "",
									}}
								>
									{button.text}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
