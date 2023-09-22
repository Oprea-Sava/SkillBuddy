function Navbar() {

    return (
        <>
            <div className="logo">
                <img src="#" alt="logo" />
            </div>
            <nav>
                <ul>
                    <button className="home">Home</button>
                    <button className="courses">Courses</button>
                    <button className="skillExchange">Skill Exchange</button>
                    <button className="aboutUs">About Us</button>
                    <button className="contact">Contact</button>
                </ul>
            </nav>
            <div className="loginContainer">
                <button className="login">Login</button>
                <button className="signUp">Sign up</button>
            </div>
        </>
    )
}

function HeroContainer() {

    return (
        <>
            <div className="heroContainer">
                <div className="textSide">
                    <h1>Learm more things <br /> Do more things</h1>
                    <h4>Sign Up Now!</h4>
                    <button className="heroButton">Sign Up</button>
                </div>
                <div className="imageSide">
                    <img src="#" alt="heroPhoto" />
                </div>
            </div>
        </>
    )
}


export {Navbar , HeroContainer}