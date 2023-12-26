import React, { useEffect, useState } from "react";
import "./css/chapterDetails.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ChapterForm from "./components/chapterForm";


export default function ChapterDetails() {
    const {chapterId} = useParams()
    const navigate = useNavigate()
    const [chapterData, setChapterData] = useState({});
    useEffect(() => {
        const fetchChapterData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/chapters/${chapterId}`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json(); 
					setChapterData(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course chapters:", error);
                toast.error("Error fetching chapters");
			}
		}; 
        fetchChapterData()
    }, [])
    function handleBack() {
        navigate(`/edit/${chapterData.courseId}`)
    }
    const requiredFields = [
        chapterData.title,
        chapterData.description,
        chapterData.videoUrl,
        chapterData.isPublished,
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completitionText = `(${completedFields}/${totalFields})`;
    return(
        <>
        <Navbar/>
        <div className="container__chd">
            <div className="backButton__chd text" onClick={handleBack}> 
            <HiArrowLongLeft size={20}/>
            Back to the course setup
            </div>
            <div className="title__chd">
                <h1 className="text"> Chapter Setup</h1>
                <div className="text">
                    Complete all fields {completitionText}
                </div>
            </div>
            <div className="gridContainer__chd">
                <div className="column__chd">
                    <ChapterForm label="Chapter title" name="title" value={chapterData.title} chapterId={chapterId}/>
                    <ChapterForm label="Chapter description" name="discription" value={chapterData.description} chapterId={chapterId}/>
                </div>
                <div className="column__chd">
                    coloana 2
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}