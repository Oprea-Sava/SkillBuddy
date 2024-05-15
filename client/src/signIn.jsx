import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/signIn.css";
import { isAuthenticated } from "./auth";
import logo from "./assets/logo.svg";
import logoText from "./assets/logotextL.png";
import image from "./assets/logInImage.png";

export default function SignIn() {
	const [formData, setFormData] = useState({
		usernameOrEmail: "",
		password: "",
		rememberMe: false,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate("/dashboard");
		}
	}, []);

	const handleChange = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:5000/api/users/signIn",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("token", data.token);
				toast.success("Logged in successfully");
				navigate("/dashboard");
			} else {
				const data = await response.json();
				console.error("Error logging in:", data.error);
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	return (
		<div className="container__si text">
			<div className="banner__si">
				<div className="bannerImg__si">
					<img src={image}/>
				</div>
				<div className="bannerText__si">
					<div className="bannerTitle__si">Welcome to SkillBuddy</div>
					<div className="bannerContent__si">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam.
					</div>
				</div>
			</div>
			<div className="signInBox">
				<div className="logo__si">
					<img src={logoText} alt="logo"></img>
					<div className="home__si">
						<a href="/">Back To Home</a>
					</div>
				</div>
				<h1>Login into your account</h1>
				<form id="signInForm" onSubmit={handleSubmit}>
					<div className="formGroup__si">
						<label className="formLabel__si">
							Username or Email Address
						</label>
						<input
							type="text"
							name="usernameOrEmail"
							className="formInput__si text"
							value={formData.usernameOrEmail}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="formGroup__si">
						<label className="formLabel__si">Password</label>
						<input
							type="password"
							name="password"
							className="formInput__si text"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="formGroupCheck__si">
						<div className="remember__si">
							<input
								type="checkbox"
								name="rememberMe"
								className="formCheck__si text"
								value={formData.rememberMe}
								onChange={handleChange}
							/>
							<label className="rememberLabel__si">
								Remember Me
							</label>
						</div>
						<div className="forgot__si">
							<span>
								<a href="/">Forgot Password?</a>
							</span>
						</div>
					</div>
					<div className="submit__si">
						<button type="submit" className="submitButton__si text">
							Login
						</button>
					</div>
				</form>
				<div className="formBottom__si">
					New user ?{" "}
					<a href="/signup" className="text">
						Create an Account
					</a>
				</div>
			</div>
		</div>
	);
}
