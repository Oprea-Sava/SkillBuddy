import React from "react";
import "../../css/dashboard/sidebar.css";
import placeholder from "../../assets/placeholder.png";

function Sidebar() {
	return (
		<>
			<div id="sidebar">
				<div className="profile">
					<img src={placeholder} alt="" />
					<div className="username text">Username</div>
				</div>
				<div className="navigator">
					<div>
						<div className="clusterName text">Dashboard</div>
						<div className="buttonCluster">
							<button className="text">Dashboard</button>
							<button className="text">My Profile</button>
							<button className="text">Enrolled ourses</button>
							<button className="text">Saved Courses</button>
						</div>
					</div>
					<div>
						<div className="clusterName text">Account settings</div>
						<div className="buttonCluster">
							<button className="text">Edit Profile</button>
							<button className="text">Change Password</button>
							<button className="text">Log Out</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
