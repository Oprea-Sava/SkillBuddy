import React, { useState, useEffect } from "react";
import "../../css/dashboard/editProfile.css";
import { ToastContainer, toast } from 'react-toastify';

function EditProfile() {
	const [formData, setFormData] = useState({
		firstname:"",
		lastname:"",
		username:"",
		bio:"",
		phone:""
	})
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
			setFormData(data);
		  } catch (error) {
			console.error('Error fetching user data:', error);
		  }
		};
	
		fetchUserData();
	  }, []);

	const handleInputChange = (e) => {
		setFormData({
		  ...formData,
		  [e.target.name]: e.target.value,
		});
	  };

	const handleSubmit = async (e) =>{
		e.preventDefault();
		try{
			const token = localStorage.getItem('token');
			const response = await fetch(`http://localhost:5000/api/users/${token}`,{
				method: "PUT",
				headers: {
					"Content-type":"application/json",
				},
				body: JSON.stringify(formData),
			});
			if(!response.ok){
				const errorData = await response.json();
				console.error("Error updating user:", errorData.error);
				toast.error(`Error updating user data: ${errorData.error}`);
			}
			else{
				toast.success("User data updated successfully!");
			}
		}catch(error){
			console.error("Error updating user:", error);
		}
	}


	return (
		<>
			<div id="editProfile">
				<div className="editProfileTitle">
					<div className="editProfileBoldText text">
						Profile Details
					</div>
					<div className="text">
						You have full control over your own account settings.
					</div>
				</div>
				<div className="editProfileAvatar">
					<div className="profileAvatarText">
						<div className="editProfileBoldText text">
							Your Avatar
						</div>
						<div className="text">
							PNG or JPG no bigger than 800px width and height.
						</div>
					</div>
					<div className="profileAvatarButtons">
						<button className="text">Upload</button>
						<button className="text">Delete</button>
					</div>
				</div>
				<form className="editProfileForm" action="">
					<div>
						<div className="editProfileBoldText text">
							Personal Details
						</div>
						<div className="text">
							Edit your personal information.
						</div>
					</div>
					<div className="editProfileDetails">
						<div className="gridCell" >
							<div className="text">First Name</div>
							<input
								className="text"
								type="text"
								name="firstname"
								value={formData.firstname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Last Name</div>
							<input
								className="text"
								type="text"
								name="lastname"
								value={formData.lastname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell" >
							<div className="text">User Name</div>
							<input
								className="text"
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Phone Number</div>
							<input
								className="text"
								type="number"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell" >
							<div className="text ">Bio</div>
							<textarea
								className="text bioInput"
								name="bio"
								value={formData.bio}
								onChange={handleInputChange}
							/>
						</div>

						<div className="gridCell">
							<div className="editProfileSubmit">
								<button type="submit" className="text" onClick={handleSubmit}>Update Profile</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditProfile;
