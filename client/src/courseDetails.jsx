import React, { useEffect, useState } from "react";
import "./css/courseDetails.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseForm from "./components/courseForm";
import { isAuthenticated } from "./auth";

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
        console.log("useEffect is running");
        fetchCourseData();
        if(!isAuthenticated()){
            navigate("/signin")
        }
    },[]);
    const requiredFields = [
        courseData.title,
        courseData.description,
        courseData.price,
        courseData.image,
    ];
    console.count("counter")
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
                       <div className="section__cd">
                            <div className="sectionTitle__cd text">
                                Customize your course
                            </div>
                            <div className="sectionContent__cd">
                                <CourseForm label={"Course Title"} value={courseData.title} name="title" courseId={courseId}/>
                                <CourseForm label={"Course Description"} value={courseData.description} name="description" courseId={courseId}/>
                                <CourseForm label={"Course Image"} value={courseData.image} name="image" courseId={courseId}/>
                            </div>
                       </div>
                    </div>
                    <div className="column__cd">
                        <div className="sectionTitle__cd text">
                            Course Chapters
                        </div>
                        <div className="sectionContent__cd">Chapter</div>
                        <div className="sectionTitle__cd text">
                            Sell your course
                        </div>
                        <div className="sectionContent__cd">
                            <CourseForm label={"Course Price"} value={courseData.price} name="price" courseId={courseId} data={courseData} setData={setCourseData}/>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}