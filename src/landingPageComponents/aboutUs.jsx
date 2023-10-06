import placeholder from "../assets/aboutUs.svg"

function AboutUs() {

    return (
        <div id="aboutUs">
            <img src={placeholder} alt="" />
                <div className="aboutUsText text">
                About Us < br/>
At [Your Website Name], we are driven by a simple yet powerful mission: to empower individuals like you to thrive in today's fast-paced world by equipping you with essential life skills and fostering a vibrant community of learners. 
<br/>
Our Vision: 
<br/>
Our vision is to create a global hub where individuals from all walks of life can access high-quality, interactive courses on a wide range of essential life skills. Whether you're looking to enhance your financial literacy, master time management, or explore the art of cooking, we've got you covered. 
                </div>
        </div>
    )
}

export default AboutUs;
