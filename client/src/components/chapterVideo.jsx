import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterVideo.css"
import { HiPencil } from "react-icons/hi2";


export default function ChapterVideo({value, chapterId}) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({videoUrl: ""})
    useEffect(() => {
        setFormData((prevData) => ({
        ...prevData,
        videoUrl: value,
        }));
      }, [value]);
    function handleClick(e) {
        e.preventDefault()
        setIsEditing(!isEditing)
    }
    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };
    const  handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
            if(!token) return
        try{
            const response = await fetch(
				`http://localhost:5000/api/courses/chapters/${chapterId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				});
            if(response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setIsEditing((prev) => !prev)
                navigate(0)
            } else {
                const data = await response.json();
                toast.error(data.error);
                console.error("Error updating chapter :", data.error);
            }
        } catch (error){
            console.error("Error updating chapter :", error);
        }
    }
    return(
        <>
        <form className="form__chv">
            <div className="formGroup__chv">
                        <label htmlFor="videoUrl" className="text formLabel__chv">Chapter Video</label>
                        {isEditing ? 
                        (<button onClick={handleClick} className="text cancelButton__chv">Cancel</button>) :
                        (<button onClick={handleClick} className="text editButton__chv"><HiPencil /> Edit</button>)}
            </div>
            <iframe className="video__chv" src={formData.videoUrl} ></iframe>
            {isEditing ? (<div className="edit__chv">
                                <input className="formInput__chv" id="videoUrl" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange}/> 
                                <button className="text submitButton__chv" onClick={handleSubmit}>Submit</button> 
                            </div>) : (<div className="text">{!value ? (`No video`):(value)}</div>)
            }
        </form>
        </>
    )
}