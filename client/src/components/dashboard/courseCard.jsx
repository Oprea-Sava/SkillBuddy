import React,{useState, useEffect} from "react";
import placeholder from "../../assets/placeholder.png";

function CourseCard(Id) {
    const [courseData, setCourseData] = useState({});
	useEffect(() => {
		const fetchCourseData = async () => {
		  try {
			const response = await fetch(`http://localhost:5000/api/courses/${Id.Id}`,{
				method: "GET",})
			if(response.ok){
				const data = await response.json();
				setCourseData(data);
			}else throw new Error(`HTTP error! Status: ${response.status}`)
		  } catch (error) {
			console.error('Error fetching course details:', error);
		  }
		};
		fetchCourseData();
		
	  }, []);
    return(
        <>
            <div className="courseCard">
                <div className="courseCardImageHolder">
                    <div className="coursePrice">{courseData.price}</div>
                </div>
                <div className="courseCardDetails">
                    <div>
                        <div className="authorName">{courseData.author}</div>
                        <button className="bookmark">btn</button>
                    </div>
                    <div>{courseData.title}</div>
                    {/* if the name is too long the button gets out of the card */}
                    <div>
                        <button>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseCard;