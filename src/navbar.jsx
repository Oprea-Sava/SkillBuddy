import './css/navbar.css'
import './css/text.css'

function Navbar() {

    return (
        <div id="navSection">
            <div className="logo">
                <img src="#" alt="logo" />
            </div>
            <nav className="navContainer">
                <button className="home text">Home</button>
                <button className="courses text">Courses</button>
                <button className="skillExchange text">Skill Exchange</button>
                <button className="aboutUs text">About Us</button>
                <button className="contact text">Contact</button>
                <button className="darkMode">
                    <img src="./assets/sun.png" alt="" />
                </button>
                <button className="signUp text">Sign up</button>
            </nav>
        </div>
    )
}

export default Navbar