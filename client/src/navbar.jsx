import "./css/navbar.css";
import "./css/text.css";
import darkModeImage from "./assets/moon.png";
import lightModeImage from "./assets/sun.png";
import logo from "./assets/logo.svg";
import logoText from "./assets/logotextL.png";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { isAuthenticated } from "./auth";
import { useNavigate } from "react-router-dom";
import placeholder from "./assets/paceholder2.png";
import { useTheme } from "./themeContext";

function Navbar({ dataChange }) {
	const { toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [userImg, setUserImg] = useState();
	const [userData, setUserData] = useState({isTutor: false});
	const navigate = useNavigate();
	const { theme } = useTheme();
	const [y, setY] = useState(0);

	let iconTheme = "dark";
	if (theme == "light") {
		iconTheme = "black";
	} else {
		iconTheme = "#bbcbff";
	}

	const handleNavigation = (e) => {
		const window = e.currentTarget;
		if (y != window.scrollY) {
			setIsOpen(false);
		}
		setY(window.scrollY);
	};

	useEffect(() => {
		setY(window.scrollY);

		window.addEventListener("scroll", (e) => handleNavigation(e));
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://localhost:5000/api/users/${token}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		const fetchUserImg = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://localhost:5000/api/users/retrieve/${token}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const blob = await response.blob();
				const imageUrl = URL.createObjectURL(blob);
				setUserImg(imageUrl);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		if (isAuthenticated()) {
			fetchUserData();
			fetchUserImg();
		}
	}, [dataChange]);
	function goToDashboard() {
		navigate("/dashboard/myprofile");
	}

	function goToSignUp() {
		navigate("/signup");
	}

	function handleNav() {
		setIsOpen(!isOpen);
	}
	const menuStyle = {
		left: isOpen ? 0 : "-120%",
	};

	return (
		<div id="navSection">
			<div className="logoContainer">
				<img className="logo" src={logo} alt="logo" />
				<img className="logoText" src={logoText} alt="SkillBuddy" />
			</div>
			<nav className="navContainer">
				<a className="navbarButton text" href="/">
					Home
				</a>
				<a className="navbarButton text" href={isAuthenticated()? (userData.isTutor ? "/create" : "/courses") : "/courses"}>
					{userData.isTutor ? "Create a Course" : "Courses"}
				</a>
				<a className="navbarButton text" href="/aboutus">
					About Us
				</a>
				<a className="navbarButton text" href="/underconstruction">
					Contact
				</a>
				<DarkModeButton toggleTheme={toggleTheme} />
				{isAuthenticated() ? (
					userImg ? (
						<img
							className="profileImg"
							src={userImg}
							alt=""
							onClick={goToDashboard}
						/>
					) : (
						<img
							className="profileImg"
							src={placeholder}
							alt=""
							onClick={goToDashboard}
						/>
					)
				) : (
					<button
						className="secondary signUp text"
						onClick={goToSignUp}
					>
						Sign up
					</button>
				)}
			</nav>
			<div className="menu" onClick={handleNav}>
				{isOpen ? (
					<AiOutlineClose size={20} color={iconTheme} />
				) : (
					<AiOutlineMenu size={20} color={iconTheme} />
				)}
			</div>
			<nav className="navContainerMenu" style={menuStyle}>

				<a className="navbarButtonMenu text" href="/dashboard">
					Home
				</a>
				<a className="navbarButtonMenu text" href="/courses">
					Courses
				</a>
				<a className="navbarButtonMenu text" href="/">
					About Us
				</a>
				<a className="navbarButtonMenu text" href="/">
					Contact
				</a>
				{isAuthenticated() ? (
					<a className="navbarButtonMenu text" href="/dashboard">
					Dashboard
				</a>
				) : (
					<button
						className="secondary signUp text"
						onClick={goToSignUp}
					>
						Sign up
					</button>
				)}
			</nav>
		</div>
	);
}

function DarkModeButton({ toggleTheme }) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");

		if (localTheme === "dark") {
			setIsDark(true);
		} else {
			setIsDark(false);
		}
	}, []);

	function handleClick() {
		toggleTheme();
		setIsDark((prevIsDark) => !prevIsDark);
	}

	return (
		<div className="darkmodeButton" onClick={handleClick}>
			<img
				src={isDark ? darkModeImage : lightModeImage}
				alt={isDark ? "Dark Mode" : "Light Mode"}
			/>
		</div>
	);
}

export default Navbar;
