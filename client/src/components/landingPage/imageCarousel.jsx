import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import placeholder from "../../assets/placeholder.png";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";
import "../../css/landingPage/imageCarousel.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function ImageCarousel() {

    const [courses, setCourses]= useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const arrayBufferToBase64 = buffer => {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    };
    useEffect(() => {
      const fetchCourseIds = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/carousel`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setCourses(data);
          } else {;
            toast.error(`HTTP error! Status: ${response.status}`);
            throw new Error(
              `HTTP error! Status: ${response.status}`
            );
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setIsLoading(false);
        }
      };
     fetchCourseIds();
    }, []);
    return(
      <div className="container">
      <Splide className="carousel" aria-label="My Favorite Images"
      options={{
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '56px',
        autoplay: 'true',
        interval: 2000,
        speed:1000,
        focus:'center',
        trimSpace:'false',
        breakpoints: {
          568:{
            perPage:1,
            paginationDirection:'ttb',
            snap:'true',
            autoplay: 'true',
            interval: 2000,
        speed:1000,
          },
          640: {
            perPage: 1,
          },
          1500: {
            perPage: 2,
          },
        
        }
      }
      }>
      
        {<>
					{courses.map((course, index) => (

						 <SplideSlide className="slide">
             <div className="carouselCard">
					<div className="carouselCardImageHolder">
          {course.img && course.img.data ? (
          <img src={`data:${course.img.contentType};base64,${arrayBufferToBase64(
            course.img.data.data
          )}`} alt="Course" />
        ) : (
          <img src={placeholder} alt="Placeholder" />
        )}
						
					</div>
					<div className="carouselCardDetails">
          <div>

                <img className="authorImg" src={profilePlaceholder}/>
                <div className="carouselAuthorName text">TestUser</div>
						</div>
						<div className="text">{course.title}</div>
						<div>
              <div className="carouselPrice">
							<p className="text">
								{course.price === 0
									? "free"
									: `${course.price}$`}
							</p>
						</div>
							{course.chapters && (
								<div className="text">{course.chapters.length} lessons</div>
							)}
						</div>
					</div>
				</div>
            </SplideSlide>
					))}
					</>}
      </Splide>
      </div>
    )
}



export default ImageCarousel;