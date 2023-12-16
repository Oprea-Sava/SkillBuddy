import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/courseForm.css"
import { HiPencil } from "react-icons/hi2";


export default function CourseForm({label, value, name, courseId}) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }, [name, value]);
    
    const handleClick = (e) => {
        e.preventDefault();
        setIsEditing((prev) => !prev)
    }
    const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,  
		});
	};
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing((prev) => !prev)
        const token = localStorage.getItem("token");
            if(!token) return
        try{
            const response = await fetch(
				`http://localhost:5000/api/courses/${courseId}`,
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
            <form className="form__cf">
                <div className="formGroup__cf">
                    <label htmlFor={name} className="text formLabel__cf">{label}</label>
                    {isEditing ? (<button onClick={handleClick} className="text cancelButton__cf">Cancel</button>) : (<button onClick={handleClick} className="text editButton__cf"><HiPencil /> Edit</button>)}
                </div>
                {isEditing ? (<div className="edit__cf">
                                <input className="formInput__cf" id={name} name={name} value={formData[name]} onChange={handleInputChange}/> 
                                <button className="text submitButton__cf" onClick={handleSubmit}>Submit</button> 
                            </div>) : (<div className="text">{value}</div>) }
            </form>
        </>
    )
}