import './css/navbar.css'
import './css/text.css'
import darkModeImage from './assets/moon.png'
import lightModeImage from './assets/sun.png'
import logoAndText from './assets/logoAndText.png'
import { useState } from 'react'

function Navbar() {
    return (
        <div id="navSection">
            <div className="logo">
                <img src={logoAndText} alt="logo" />
            </div>
            <nav className="navContainer">
                <button className="navbarButton home text">Home</button>
                <button className="navbarButton courses text">Courses</button>
                <button className="navbarButton skillExchange text">Skill Exchange</button>
                <button className="navbarButton aboutUs text">About Us</button>
                <button className="navbarButton contact text">Contact</button>
                <DarkModeButton />
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
            <img src={isDark} alt="color skema" />
        </div>
    )
}

export default Navbar