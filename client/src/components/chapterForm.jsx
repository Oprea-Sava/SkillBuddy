import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterForm.css"
import { HiPencil } from "react-icons/hi2";

export default function ChapterForm({label, value, name, chapterId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
      }, [value, name]);
    function handleClick(e) {
        e.preventDefault()
        setIsEditing(!isEditing)
    }

    function handleInputChange() {

    }

    function handleSubmit() {

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
                {isEditing ? (<div className="edit__chf">
                                <input className="formInput__chf" id={name} name={name} value={formData[name]} onChange={handleInputChange}/> 
                                <button className="text submitButton__chf" onClick={handleSubmit}>Submit</button> 
                            </div>) : (<div className="text">{!value ? (`No ${name}`):(value)}</div>) }
            </form>
        </>
    )
}