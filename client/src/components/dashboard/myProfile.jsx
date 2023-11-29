import React, { useEffect, useState } from "react";
import "../../css/dashboard/myProfile.css";

function MyProfile() {
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			// Retrieve the JWT token from localStorage
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
	
		fetchUserData();
	  }, []);
	  const registrationDate = new Date(userData.registrationDate)
	  //dont delete for some reason it breaks
	  if (isNaN(registrationDate)) {
		return <div>Error: Invalid date format</div>;
	  }
	  //
	  const formattedDate = registrationDate.toISOString().split('T')[0];
	return (
		<>
			<div id="myProfile">
				<div className="profileInfoHeader">
					<div className="text">My Profile</div>
				</div>
				<div className="profileInfoContainer text">
					<div className="firstName">
						<div>First Name</div>
						<div>{userData.firstname}</div>
					</div>
					<div className="lastName">
						<div>Last Name</div>
						<div>{userData.lastname}</div>
					</div>
					<div className="regDate">
						<div>Registration Date</div>
						<div>{formattedDate}</div>
					</div>
					<div className="username">
						<div>Username</div>
						<div>{userData.username}</div>
					</div>
					<div className="email">
						<div>Email</div>
						<div>{userData.email}</div>
					</div>
					<div className="phoneNmbr">
						<div>Phone Numebr</div>
						<div>{userData.phone}</div>
					</div>
					<div className="bio">
						<div>Bio</div>
						<div>{userData.bio}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyProfile;
