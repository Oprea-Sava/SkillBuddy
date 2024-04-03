import React, { useEffect, useState } from "react";
import "./css/chapterDetails.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { HiArrowLongLeft, HiOutlineExclamationTriangle, HiOutlineTrash } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ChapterForm from "./components/chapterForm";
import ChapterVideo from "./components/chapterVideo";


export default function ChapterDetails() {
    const {chapterId} = useParams()
    const navigate = useNavigate()
    const [chapterData, setChapterData] = useState({});
    const [fetchData, setFetchData] = useState(false)
    function handleFetch() {
        setFetchData(!fetchData);
    }
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
				} else throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course chapters:", error);
                toast.error("Error fetching chapters");
			}
		}; 
        fetchChapterData()
    }, [fetchData])
    function handleBack() {
        navigate(`/edit/${chapterData.courseId}`)
    }
    const handleDelete = async() => {
        const token = localStorage.getItem("token");
            if(!token) return
        try {
            const response = await fetch(
                `http://localhost:5000/api/courses/chapters/${chapterId}`,
					{
						method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
					}
            );
            if(response.ok) {
                toast.success("Chapter deleted successfully");
                handleBack();
            }else{
                toast.error(response.error);
            }
        } catch(error) {
            toast.error("Error deleting chapter");
            console.error("Error deleting chapter: ", error);
        }
    }
    const handlePublish = async(value) => {
        if(value){
            if (totalFields != completedFields) {
                toast.error("Chapter is not completed")
                return
            }
        }
        const token = localStorage.getItem("token");
        if(!token) return
        try {
            const response = await fetch(
                `http://localhost:5000/api/courses/chapters/${chapterId}`,
					{
						method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            isPublished: value,
                        }),
					}
            );
            if(response.ok) {
                value ? toast.success("Chapter published successfully") : toast.success("Chapter unpublished successfully");
                handleBack();
            }else{
                toast.error(response.error);
            }
        } catch(error) {
            toast.error("Error updating chapter");
            console.error("Error updating chapter: ", error);
        }
    }
    const requiredFields = [
        chapterData.title,
        chapterData.description,
        chapterData.videoUrl,
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completitionText = `(${completedFields}/${totalFields})`;
    return(
        <>
        <Navbar/>
        <div className="container__chd">
            {!chapterData.isPublished && <div className="alert__chd text"> <HiOutlineExclamationTriangle size={20} />This chapter is unpublished. It will not be visible in the course</div>}
            <div className="backButton__chd text" onClick={handleBack}> 
            <HiArrowLongLeft size={20}/>
            Back to the course setup
            </div>
            <div className="header__chd">
                <div className="title__chd">
                    <h1 className="text"> Chapter Setup</h1>
                    <div className="text">
                        Complete all fields {completitionText}
                    </div>
                </div>
                <div className="publish__chd">
                    {chapterData.isPublished ? <button className="unPublishButton__chd text" onClick={() => {handlePublish(false)}}>Unpublish</button> : <button className="publishButton__chd text" onClick={() => {handlePublish(true)}}>Publish</button>} 
                    <button className="deleteButton__chd" onClick={handleDelete}><HiOutlineTrash size={20} /></button>
                </div>
            </div>
            <div className="gridContainer__chd">
                <div className="column__chd">
                    <ChapterForm label="Chapter title" name="title" value={chapterData.title} chapterId={chapterId} change={()=>handleFetch()}/>
                    <ChapterForm label="Chapter description" name="description" value={chapterData.description} chapterId={chapterId} change={()=>handleFetch()}/>
                </div>
                <div className="column__chd">
                    <ChapterVideo value={chapterData.videoUrl} chapterId={chapterId} fetchData={fetchData} 
    setFetchData={setFetchData}/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}