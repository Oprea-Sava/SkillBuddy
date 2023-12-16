import React, { useEffect, useState } from "react";
import "./css/courseDetails.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CourseDetails(){
    const {courseId} = useParams()
    const [courseData, setCourseData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/${courseId}`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json(); 
					setCourseData(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course details:", error);
                toast.error("Course does not exist");
                navigate("/")
			}
		};
        fetchCourseData();
    },[courseData]);
    const requiredFields = [
        courseData.title,
        courseData.description,
        courseData.price,
        courseData.image,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completitionText = `(${completedFields}/${totalFields})`;
    return(
        <>
            <Navbar/>
            <div className="container__cd">
                <div className="columnGrid__cd">
                    <div className="column__cd">
                        <h1 className="text"> Course Setup</h1>
                        <div className="text">
                            Complete all fields {completitionText}
                        </div>
                       <div className="section">
                            <div className="sectionTitle text">
                                Customize your course
                            </div>
                            <form></form>
                       </div>
                    </div>
                    <div className="column__cd">coloana 2</div>
                </div>
            </div>
            <Footer/>
        </>
    )
}