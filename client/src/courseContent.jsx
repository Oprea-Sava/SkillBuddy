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
    const [completedChapters, setCompletedChapters] = useState({});
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

                    const newCompletedChapters = {};
                    for (const chapter of data) {
                        newCompletedChapters[chapter._id] = await checkChapterCompletion(chapter._id);
                    }
                    setCompletedChapters(newCompletedChapters);
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
                    console.log(data["enrolledCourses"]);
                    for (let course of data["enrolledCourses"]) {
                        if (course._id === courseId ) {
                            setIsEnrolled(true);
                            break;
                        }
                    }
                    for (let course of data["createdCourses"]) {
                        if (course._id === courseId ) {
                            setIsEnrolled(true);
                            break;
                        }
                    }
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
    const handleChapterClick = async (chapter) => {
        await checkChapterCompletion(chapter._id);
        setSelectedChapter(chapter);
    };

    const toggleChapterCompletion = async (chapterId, isCompleted) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:5000/api/courses/progression/${chapterId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ isCompleted }),
                }
            );
            if (response.ok) {
                const message = isCompleted ? 'Chapter marked as completed' : 'Chapter marked as unfinished';
                toast.success(message);
                setCompletedChapters(prevState => ({
                    ...prevState,
                    [chapterId]: isCompleted
                }));
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            const errorMessage = isCompleted ? 'Error marking chapter as completed' : 'Error marking chapter as unfinished';
            console.error(errorMessage, error);
            toast.error(errorMessage);
        }
    };
    const checkChapterCompletion = async (chapterId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:5000/api/courses/progression/${chapterId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                return data.isCompleted;
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error checking chapter completion:', error);
        }
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
                                {completedChapters[chapter._id] ? <CiCircleCheck /> : (selectedChapter === chapter ? <CiPause1 /> : <CiPlay1 />)}
                                {chapter.title}
                            </div>
                        ))}
                    </div>
                <div className="content__cc">
                {isEnrolled ? (
                        <>
                            <iframe src={selectedChapter?.videoUrl || "https://www.youtube.com/embed/tgbNymZ7vqY"} />
                            <div className="chapterInfo__cc">
                                <div className="chapterTitleWrapper__cc">
                                    <div className="chapterTitle__cc text">{selectedChapter?.title}</div>
                                    <button className={`markButton__cc ${completedChapters[selectedChapter?._id] ? 'markUnfinishedButton__cc' : 'markCompletedButton__cc'}`} onClick={() => toggleChapterCompletion(selectedChapter._id, !completedChapters[selectedChapter?._id])}>
                                    {completedChapters[selectedChapter?._id] ? 'Mark as Unfinished' : 'Mark as Completed'}
                                    </button>
                                </div>
                                <div className="chapterDescription__cc text">{selectedChapter?.description}</div>
                                
                            </div>
                        </>
                    ) : (
                        <div className="notEnrolled text">You are not enrolled in this course.</div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}