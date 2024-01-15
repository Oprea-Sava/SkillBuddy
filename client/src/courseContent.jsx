import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./css/courseContent.css"

export default function CourseContent() {
    const {courseId} = useParams()
    return (
        <>
            <Navbar/>
            <div className="container__cc">
                <div className="sidebarWrapper__cc"> 
                    <div className="sidebar__cc">Sidebar</div>
                </div>
                <div className="content__cc">
                    <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"/>
                    <div className="chapterTitle__cc text">Course Title</div>
                    <div className="chapterDescription__cc text">Description</div>
                </div>
            </div>
            <Footer/>
        </>
    )
}