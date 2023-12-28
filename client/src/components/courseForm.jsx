import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/courseForm.css"
import { HiPencil } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";


export default function CourseForm({label, value, name, courseId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [img, setImg] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (name !== "image") {
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          } else {
            setImageUrl(value);
          }
      }, [value, name]);
    useEffect(() => {
        const uploadImg = async () => {
            const token = localStorage.getItem("token");
            if(!token) return
            const imageFormData = new FormData();
			imageFormData.append("image", img);
            try{
                const response = await fetch(
                    `http://localhost:5000/api/courses/upload/${courseId}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: imageFormData,
                    });
            if(response.ok){
                const blob = await response.blob();
				const imageUrl = URL.createObjectURL(blob);
				setImageUrl(imageUrl);
                navigate(0);
            } else {
                const errorData = await response.json();
				console.error("Error uploading image:", errorData.error);
				toast.error(`Error uploading image: ${errorData.error}`);
            }
            } catch (error) {
                console.error("Error updating image:", error);
            }
        }
        if (img) {
            uploadImg();
        }
    }, [img]);
    const handleClick = (e) => {
        e.preventDefault();
        setIsEditing((prev) => !prev)
    }

    const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setImg(selectedFile);
	};

    const handleInputChange = (e) => {
		setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
	};
    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
                setIsEditing((prev) => !prev)
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
        <>  { name === "image" ? 
        (
        <form className="form__cf">
            <div className="formGroup__cf">
                    <div  className="text formLabel__cf">{label}</div> 
                    <label htmlFor="image" className="text editButton__cf">{!value ? <> <CiCirclePlus/> Add an image </> : <><HiPencil/> Change Image</>}</label>
                    <input className="text" type="file" id="image" name="image" accept="image/*" hidden onChange={handleFileChange}/>
            </div>
            <div className="imgContainer__cf">
            {imageUrl && (
              <img className="courseImg__cf" src={imageUrl} alt="course image" />
            )}
            </div>
        </form>
        ) : 
        (
            <form className="form__cf">
                <div className="formGroup__cf">
                    <label htmlFor={name} className="text formLabel__cf">{label}</label>
                    {isEditing ? 
                    (<button onClick={handleClick} className="text cancelButton__cf">Cancel</button>) :
                    (<button onClick={handleClick} className="text editButton__cf"><HiPencil /> Edit</button>)}
                </div>
                {isEditing ? (<div className="edit__cf">
                                <input className="formInput__cf" id={name} name={name} value={formData[name]} onChange={handleInputChange}/> 
                                <button className="text submitButton__cf" onClick={handleSubmit}>Submit</button> 
                            </div>) : (<div className="text">{!value ? (name=="price"? "Free" :`No ${name}`):(name=="price" ? `${formData[name]}$`: formData[name])}</div>) }
            </form>
        )
            }       
        </>
    )
}