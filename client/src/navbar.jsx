import "./css/navbar.css";
import "./css/text.css";
import darkModeImage from "./assets/moon.png";
import lightModeImage from "./assets/sun.png";
import logo from "./assets/logo.svg";
import logoText from "./assets/logoText1.png";
import { useState, useEffect, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { isAuthenticated } from "./auth";
import { useNavigate } from "react-router-dom";
import placeholder from "./assets/paceholder2.png";
import { useTheme } from "./themeContext";
import UserContext from './userContext'

function Navbar({dataChange}) {
    const { toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {

		// const fetchUserImg = async() => {
		// 	try{
		// 		const token = localStorage.getItem('token');
		// 		const response = await fetch(`http://localhost:5000/api/users/retrieve/${token}`)
		// 		if(!response.ok){
		// 			throw new Error(`HTTP error! Status: ${response.status}`)
		// 		}
		// 		const imageBlob = await response.blob();
		// 		const imageUrl = URL.createObjectURL(imageBlob);
		// 		setUserImg(imageUrl)
        //         console.log(userImg)
		// 	} catch(error){
		// 		console.error('Error fetching user image:', error);
		// 	}
		// }
        // if(isAuthenticated()){
		//     fetchUserImg();
        // }
        
    }, [dataChange]);
    function goToDashboard(){
        navigate("/dashboard")
    }

	function goToSignUp() {
		navigate("/signup");
	}

	function handleNav() {
		setIsOpen(!isOpen);
	}
	const menuStyle = {
		left: isOpen ? 0 : "-100%",
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
				<a className="navbarButton text" href="/courses">
					Courses
				</a>
				<a className="navbarButton text" href="/">
					Skill Exchange
				</a>
				<a className="navbarButton text" href="/">
					About Us
				</a>
				<a className="navbarButton text" href="/">
					Contact
				</a>
				<DarkModeButton toggleTheme={toggleTheme} />
				{isAuthenticated() ? (
					userData.img ? (
						<img
							className="profileImg"
							src={userData.img}
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
					<AiOutlineClose size={20} />
				) : (
					<AiOutlineMenu size={20} />
				)}
			</div>
			<nav className="navContainerMenu" style={menuStyle}>
				<div className="logoMenu">
					<img src={logo} alt="logo" />
				</div>
				<button className="navbarButton home text">Home</button>
				<button className="navbarButton courses text">Courses</button>
				<button className="navbarButton skillExchange text">
					Skill Exchange
				</button>
				<button className="navbarButton aboutUs text">About Us</button>
				<button className="navbarButton contact text">Contact</button>
				<button className="primary signUp text">Sign up</button>
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
