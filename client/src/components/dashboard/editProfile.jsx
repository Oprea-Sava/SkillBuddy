import React, { useState, useEffect} from "react";
import "../../css/dashboard/editProfile.css";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function EditProfile() {
	const [formData, setFormData] = useState({
		firstname:"",
		lastname:"",
		username:"",
		bio:"",
		phone:""
	})
	const [image, setImage] = useState(null);
	const [change, setChange] = useOutletContext();
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

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setImage(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const {img, ...textFormData}  = formData;

			const token = localStorage.getItem("token");
			const responseData = await fetch(
				`http://localhost:5000/api/users/${token}`,
				{
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(textFormData),
				}
			);
			if (!responseData.ok) {
				const errorData = await userDataResponse.json();
				console.error("Error updating user:", errorData.error);
				toast.error("Error updating user data");
			} else {
				toast.success("User data updated successfully!");
			  }
			  if (image) {
				const imageFormData = new FormData();
				imageFormData.append("image", image, image.name);

				const imageResponse = await fetch(
					`http://localhost:5000/api/users/upload/${token}`,
					{
						method: "POST",
						body: imageFormData,
					}
				);

				if (!imageResponse.ok) {
					const errorData = await imageResponse.json();
					console.error("Error uploading image:", errorData.error);
					toast.error(`Error uploading image: ${errorData.error}`);
				} else {
				  toast.success("Image uploaded successfully!");
				  setChange(!change);
				}
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

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
						<form className="text submitImage" action="">
							<label className="text" htmlFor="image">
								Upload
							</label>
							<input
								className="text"
								type="file"
								id="image"
								name="image"
								accept="image/*"
								hidden
								onChange={handleFileChange}
							/>
						</form>

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
						<div className="gridCell">
							<div className="text">First Name</div>
							<input
								className="text editProfileInput"
								type="text"
								name="firstname"
								value={formData.firstname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell">
							<div className="text">Last Name</div>
							<input
								className="text editProfileInput"
								type="text"
								name="lastname"
								value={formData.lastname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell">
							<div className="text">User Name</div>
							<input
								className="text editProfileInput"
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell">
							<div className="text">Phone Number</div>
							<input
								className="text editProfileInput"
								type="number"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="gridCell">
							<div className="text ">Bio</div>
							<textarea
								className="text bioInput editProfileInput"
								name="bio"
								value={formData.bio}
								onChange={handleInputChange}
							/>
						</div>

						<div className="gridCell">
							<div className="editProfileSubmit">
								<button
									type="submit"
									className="text"
									onClick={handleSubmit}
								>
									Update Profile
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditProfile;
