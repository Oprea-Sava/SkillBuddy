import React, { useState } from "react";
import "./css/createCourse.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { useEffect } from "react";

function CreateCourse () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
        console.log(formData)
	};

    const handleSubmit= async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) return
        try {
			const response = await fetch(
				"http://localhost:5000/api/courses/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const data = await response.json();
				toast.success(data.message);
				navigate(`/courses/${data.courseId}`);
			} else {
				const data = await response.json();
                toast.error(data.error);
				console.error("Error creating course in:", data.error);
			}
		} catch (error) {
			console.error("Error creating course in:", error);
		}
        console.log(formData)
    }
    function handleCancel(){
        navigate("/")
    }
    useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/signIn");
		}
	}, []);

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
                        <input className="formInput__cc" type="text" name="title" required placeholder="e.g. 'Advanced web development'" onChange={handleChange}/>
                        <div className="description__cc text">What will you teach in this course?</div>
                    </div>
                    <div className="formBottom__cc">
                        <button onClick={handleCancel} type="button">Cancel</button>
                        <button type="submit" onClick={handleSubmit}>Continue</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default CreateCourse;