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
				toast.sucress(data.message);
				navigate(`/edit/${data.courseId}`);
			} else {
				const data = await response.json();
                toast.error(data.error);
				console.error("Error creating course in:", data.error);
			}
		} catch (error) {
			console.error("Error creating course in:", error);
		}
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
            <div className="container__cr">
                <div className="title__cr">
                    <h1 className="text">Name your course</h1>
                    <p className="text">What would you like to name your course? Don't worry, you can change this later.</p>
                </div>
                <form className="courseBox__cr">
                    <div className="formGroup__cr">
                        <label htmlFor="title" className="formLabel__cr text">Course title</label>
                        <input className="formInput__cr" type="text" name="title" required placeholder="e.g. 'Advanced web development'" onChange={handleChange}/>
                        <div className="description__cr text">What will you teach in this course?</div>
                    </div>
                    <div className="formBottom__cr">
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