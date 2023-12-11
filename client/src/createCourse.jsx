import React from "react";
import "./css/createCourse.css";
import Navbar from "./navbar";
import Footer from "./footer";

function CreateCourse () {
    return(
        <>
            <Navbar/>
            <div className="container__cc">
                <div>
                    <h1 className="text">Name your course</h1>
                    <p className="text">What would you like to name your course? Don't worry, you can change this later.</p>
                </div>
                <form className="courseBox__cc">
                    <div className="formGroup__cc">
                        <label htmlFor="title" className="formLabel__cc text">Course title</label>
                        <input className="formInput__cc" type="text" name="title" required placeholder="e.g. 'Advanced web development'"/>
                        <div className="description__cc text">What will you teach in this course?</div>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default CreateCourse;