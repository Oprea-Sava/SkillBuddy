import React from "react";
import "./css/createCourse.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { useParams } from "react-router-dom";

export default function CourseDetails(){
    const {courseId} = useParams
    return(
        <>
            <Navbar/>
            <div>{courseId}</div>
            <Footer/>
        </>
    )
}