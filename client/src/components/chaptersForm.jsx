import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterForm.css"
import { HiPencil } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";

export default function ChaptersForm({courseId}){
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({title: ""})
    const [chapters, setChapters] = useState([])

    useEffect(()=>{
        const fetchChapters = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/chapters/${courseId}`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json(); 
					setChapters(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course chapters:", error);
                toast.error("Error fetching chapters");
			}
		}; 
        fetchChapters()
    },[]);

    useEffect(()=>{
        console.log(chapters)
    }, [chapters])

    function handleClick() {
        setIsCreating(!isCreating)
    }
    const handleChange = (e) => {
		setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
	};

    const handleSubmit= async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
            if(!token) return
        try{
            const response = await fetch(
				`http://localhost:5000/api/courses/createChapter/${courseId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				});
            if(response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setIsCreating(!isCreating)
            } else {
                const data = await response.json();
                toast.error(data.error);
                console.error("Error updating course :", data.error);
            }
        } catch (error){
            console.error("Error updating course :", error);
        }
    }
    return(
        <>
            <div className="form__chf">
                <div className="formGroup__chf">
                    <div className="label__chf text">Course Chapters</div>
                    {isCreating ? (<button onClick={handleClick} className="cancelButton__chf text">Cancel</button>): (<button onClick={handleClick} className="editButton__chf text"><CiCirclePlus size={20}/>Add a chapter</button>)}
                </div>
                {isCreating ? 
                (<div className="addChapter__chf">
                    <input className="formInput__chf" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. 'Introduction to the course'"/>
                    <button className="submitButton__chf" onClick={handleSubmit}>Submit</button>
                </div>) : (<div>All chapters</div>) 
                }
            </div>
        </>
    )
}