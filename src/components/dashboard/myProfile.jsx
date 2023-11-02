import React from "react";
import "../../css/dashboard/myProfile.css";

function MyProfile() {
	return (
		<>
			<div id="myProfile">
				<div className="profileInfoHeader">
					<div className="text">My Profile</div>
				</div>
				<div className="profileInfoContainer text">
					<div className="firstName">
						<div>First Name</div>
						<div>asd</div>
					</div>
					<div className="lastName">
						<div>Last Name</div>
						<div>asd</div>
					</div>
					<div className="regDate">
						<div>Registration Date</div>
						<div>asd</div>
					</div>
					<div className="username">
						<div>Username</div>
						<div>asd</div>
					</div>
					<div className="email">
						<div>Email</div>
						<div>asd</div>
					</div>
					<div className="phoneNmbr">
						<div>Phone Numebr</div>
						<div>as</div>
					</div>
					<div className="bio">
						<div>Bio</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyProfile;
