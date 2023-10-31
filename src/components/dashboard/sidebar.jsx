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
				<div className="navigator text">
					<div>
						<div className="clusterName text">Dashboard</div>
						<div className="buttonCluster">
							<button>Dashboard</button>
							<button>My Profile</button>
							<button>Enrolled ourses</button>
							<button>Saved Courses</button>
						</div>
					</div>
					<div>
						<div className="clusterName text">Account settings</div>
						<div className="buttonCluster">
							<button>Edit Profile</button>
							<button>Change Password</button>
							<button>Log Out</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
