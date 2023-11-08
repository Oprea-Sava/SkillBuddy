import React, { useEffect, useState } from "react";
import "../../css/dashboard/sidebar.css";
import placeholder from "../../assets/placeholder.png";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
	const dashboardButtons = [
		{ text: "Dasboard", path: "/dashboard/courses", index: 0 },
		{ text: "My Profile", path: "/dashboard/myprofile", index: 1 },
		{ text: "Enrolled Courses", path: "/dashboard/enrolledcourses", index: 2 },
		{ text: "Saved Courses", path: "/dashboard/savedcourses", index: 3 },
	];
	
	const accountButtons = [
		{ text: "Edit Profile", path: "/dashboard/editprofile", index: 4 },
		{ text: "Change Password", path: "/dashboard/changepassword", index: 5 },
		{ text: "Log Out", path: "/signin", index: 6 },
	];

	const navigate = useNavigate();
	const { pathname } = useLocation();
	let posIndex = 0;

	const [isActive, setIsActive] = useState(posIndex);

	useEffect(() => {
		dashboardButtons.map((button) => {
			if (button.path == pathname) {
				posIndex = button.index;
			}
		});
		accountButtons.map((button) => {
			if (button.path == pathname) {
				posIndex = button.index;
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
		<div id="sidebarParent">
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
									key={index + 4}
									onClick={() => {
										handleClick(button.path);
										resetColor(index + 4);
									}}
									style={{
										color:
											isActive === (index + 4)
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
