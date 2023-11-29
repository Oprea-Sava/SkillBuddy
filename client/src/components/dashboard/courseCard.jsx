import React,{useState, useEffect} from "react";
import placeholder from "../../assets/placeholder.png";

function CourseCard({Id}) {
    const [courseData, setCourseData] = useState({});
	useEffect(() => {
		const fetchCourseData = async () => {
		  try {
			const response = await fetch(`http://localhost:5000/api/courses/${Id}`,{
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
    const handleClick = async () => {
        const token = localStorage.getItem('token');
        try{
            const response = await fetch(`http://localhost:5000/api/users/${token}/addcourse`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ course: Id }),
            });
                if (!response.ok) {
                    if (response.status === 403) {
                        console.error('User is already enrolled in the course');
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                }
        
        }catch(error){
            console.error('Error adding course:', error);
		  }
        }
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
                        <button onClick={handleClick}>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseCard;