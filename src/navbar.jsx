import './css/navbar.css'
import './css/text.css'
import darkModeImage from './assets/moon.png'
import lightModeImage from './assets/sun.png'
import logo from './assets/logo.svg'
import logoText from './assets/logoText1.png'
import { useState } from 'react'
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    function handleNav(){
        setIsOpen(!isOpen)
    }
    const menuStyle = {
        left : isOpen ? 0 : "-100%"
    }
    const navStyle = {
        display : isOpen ? "none" : "flex"
    }

    return (
        <div id="navSection">
            <div className="logoContainer" >
                <img className="logo" src={logo} alt="logo" />
                <img className="logoText" src={logoText} alt="SkillBuddy"/>
            </div>
            <nav className="navContainer">
                <button className="navbarButton home text">Home</button>
                <button className="navbarButton courses text">Courses</button>
                <button className="navbarButton skillExchange text">Skill Exchange</button>
                <button className="navbarButton aboutUs text">About Us</button>
                <button className="navbarButton contact text">Contact</button>
                <DarkModeButton />
                <button className="secondary signUp text">Sign up</button>
            </nav>
            <div className='menu' onClick={handleNav}>
                {isOpen ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
            </div>
            <nav className="navContainerMenu" style={menuStyle}>
                <div className="logoMenu">
                    <img src={logo} alt="logo" />
                </div>
                <button className="navbarButton home text">Home</button>
                <button className="navbarButton courses text">Courses</button>
                <button className="navbarButton skillExchange text">Skill Exchange</button>
                <button className="navbarButton aboutUs text">About Us</button>
                <button className="navbarButton contact text">Contact</button>
                <button className="primary signUp text">Sign up</button>
            </nav>
        </div>

    )
}

function DarkModeButton(){
    const [isDark, setIsDark] = useState(lightModeImage)

    function handleClick(){
        if(isDark === darkModeImage){
            setIsDark(lightModeImage);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        else{
            setIsDark(darkModeImage);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    return(
        <div className="darkmodeButton" onClick={handleClick}>
            <img src={isDark} alt="color" />
        </div>
    )
}

export default Navbar