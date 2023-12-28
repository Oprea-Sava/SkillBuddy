import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterForm.css"
import { HiPencil } from "react-icons/hi2";

export default function ChapterForm({label, value, name, chapterId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    useEffect(() => {
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
      }, [value, name]);
    useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    }, [isVisible]);

    function handleClick(e) {
        e.preventDefault();
        setIsEditing(!isEditing);
        setIsVisible(!isVisible);
    }

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
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
        <form className="form__chf">
                <div className="formGroup__chf">
                    <label htmlFor={name} className="text formLabel__chf">{label}</label>
                    {isEditing ? 
                    (<button onClick={handleClick} className="text cancelButton__chf">Cancel</button>) :
                    (<button onClick={handleClick} className="text editButton__chf"><HiPencil /> Edit</button>)}
                </div>
                {isEditing ? (
                <div className="edit__chf">
                    {name === "description" ?(<textarea className="formInput__chf" ref={textareaRef} id={name} name={name} value={formData[name]} onChange={handleInputChange}/>) : (<input className="formInput__chf" id={name} name={name} value={formData[name]} onChange={handleInputChange}/>) }
                    <button className="text submitButton__chf" onClick={handleSubmit}>Submit</button> 
                </div>) : 
                (<div className="preview__chf text">{!value ? (`No ${name}`):(formData[name])}</div>) }
            </form>
        </>
    )
}