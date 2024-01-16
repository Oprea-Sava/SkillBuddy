import React, { useState, useEffect } from "react";
import { CiPlay1, CiPause1, CiCircleCheck  } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./css/courseContent.css"

export default function CourseContent() {
    const {courseId} = useParams()
    const [chapters, setChapters] = useState();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    useEffect(()=>{
        const fetchChapters = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/${courseId}/chapters`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json(); 
					setChapters(data);
                    const publishedChapters = data.filter(chapter => chapter.isPublished);

                    if (publishedChapters.length > 0) {
                        setSelectedChapter(publishedChapters[0]);
                    }
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course chapters:", error);
                toast.error("Error fetching chapters");
			}
		}; 
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:5000/api/users/${token}`,
                    {
                        method: "GET",
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setIsEnrolled(data["enrolledCourses"].includes(courseId));
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
                toast.error("Error fetching enrolled courses");
            }
        };
        fetchEnrolledCourses();
        fetchChapters()
    },[courseId]);
    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
    };
    return (
        <>
            <Navbar/>
            <div className="container__cc">
                    <div className="sidebar__cc">
                        {chapters && chapters.filter(chapter => chapter.isPublished).map((chapter, index) => (
                            <div
                                key={index}
                                className={`chapter__cc ${selectedChapter === chapter ? 'selected' : ''} text`}
                                onClick={() => handleChapterClick(chapter)}
                            >
                                {selectedChapter === chapter ? <CiPause1 /> : <CiPlay1 />}
                                {chapter.title}
                            </div>
                        ))}
                    </div>
                <div className="content__cc">
                {isEnrolled ? (
                        <>
                            <iframe src={selectedChapter?.videoUrl || "https://www.youtube.com/embed/tgbNymZ7vqY"} />
                            <div className="chapterInfo__cc">
                                <div className="chapterTitle__cc text">{selectedChapter?.title}</div>
                                <div className="chapterDescription__cc text">{selectedChapter?.description}</div>
                            </div>
                        </>
                    ) : (
                        <div>You are not enrolled in this course.</div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}