import React, { useEffect, useState } from "react";
import "../../css/dashboard/sidebar.css";
import placeholder from "../../assets/placeholder.png";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
	const dashboardButtons = [
		{ text: "Dasboard", path: "/dashboard/courses"},
		{ text: "My Profile", path: "/dashboard/myprofile"},
		{ text: "Your Courses", path: "/dashboard/usercourses"},
		{ text: "Wishlist", path: "/dashboard/wishlist"},
		{ text: "Purchase History", path: "/dashboard/purchasehistory"},
	];
	
	const accountButtons = [
		{ text: "Edit Profile", path: "/dashboard/editprofile"},
		{ text: "Change Password", path: "/dashboard/changepassword"},
		{ text: "Log Out", path: "/signin"},
	];

	const navigate = useNavigate();
	const { pathname } = useLocation();
	let posIndex = 0;

	const [isActive, setIsActive] = useState(posIndex);

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
					<img src={placeholder} alt="" />
					<div className="username text">Username</div>
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
										resetColor(index);
									}}
									style={{
										color:
											isActive === index
												? "var(--accent)"
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
												? "var(--accent)"
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
