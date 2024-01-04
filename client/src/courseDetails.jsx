import React, { useEffect, useState } from "react";
import "./css/courseDetails.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseForm from "./components/courseForm";
import { isAuthenticated } from "./auth";
import ChaptersForm from "./components/chapterList";

export default function CourseDetails(){
    const {courseId} = useParams()
    const [courseData, setCourseData] = useState({});
    const [courseImg, setCourseImg] = useState()
    const [fetchData, setFetchData] = useState(false)
    const navigate = useNavigate();
    function handleFetch() {
        setFetchData(!fetchData);
        console.log(1);
    }
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
        const fetchCourseImg = async () => {
            try {
              const response = await fetch(`http://localhost:5000/api/courses/image/${courseId}`,
                {
                    method: "GET",
                }
              );
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setCourseImg(imageUrl);
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
          fetchCourseData()
          fetchCourseImg();
    },[fetchData]);
    const requiredFields = [
        courseData.title,
        courseData.description,
        courseData.price,
        courseData.img,
    ];
    const hasPublishedChapter = courseData.chapters && courseData.chapters.some(chapter => chapter.isPublished);
    const totalFields = requiredFields.length + 1;
    const completedFields = requiredFields.filter(Boolean).length + (hasPublishedChapter ? 1 : 0);
    const completitionText = `(${completedFields}/${totalFields})`;
    return(
        <>
            <Navbar/>
            
            <div className="container__cd">
                <div className="title__cd">
                    <h1 className="text"> Course Setup</h1>
                    <div className="text">
                        Complete all fields {completitionText}
                    </div>
                </div>
                <div className="columnGrid__cd">
                    <div className="column__cd">
                        
                       <div className="section__cd">
                            <div className="sectionTitle__cd text">
                                Customize your course
                            </div>
                            <div className="sectionContent__cd">
                                <CourseForm label={"Course Title"} value={courseData.title} name="title" courseId={courseId} change={()=>handleFetch()}/>
                                <CourseForm label={"Course Description"} value={courseData.description} name="description" courseId={courseId} change={()=>handleFetch()}/>
                                <CourseForm label={"Course Image"} value={courseImg} name="image" courseId={courseId} change={()=>handleFetch()}/>
                            </div>
                       </div>
                    </div>
                    <div className="column__cd">
                        <div className="sectionTitle__cd text">
                            Course Chapters
                        </div>
                        <div className="sectionContent__cd">
                            <ChaptersForm courseId={courseId} change={()=>handleFetch()}/>
                        </div>
                        <div className="sectionTitle__cd text">
                            Sell your course
                        </div>
                        <div className="sectionContent__cd">
                            <CourseForm label={"Course Price"} value={courseData.price} name="price" courseId={courseId} change={()=>handleFetch()}/>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}