import React from "react";
import "../../css/dashboard/editProfile.css";

function EditProfile() {
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
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Last Name</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">User Name</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Phone Number</div>
							<input
								className="text"
								type="number"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Designation</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Bio</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
					</div>
					<div>
						<div className="editProfileBoldText text">
							Social Profiles
						</div>
						<div className="text">
							Add your social profile links in below soocial
							accounts.
						</div>
					</div>
					<div className="editProfileSocials">
						<div className="gridCell" >
							<div className="text">Website</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Github</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Facebook</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Twitter</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
						<div className="gridCell" >
							<div className="text">Linkedin</div>
							<input
								className="text"
								type="text"
								placeholder="placeholder"
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditProfile;
