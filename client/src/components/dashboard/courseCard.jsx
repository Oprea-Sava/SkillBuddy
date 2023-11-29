import React from "react";
import placeholder from "../../assets/placeholder.png";

function CourseCard(id) {
    return(
        <>
            <div className="courseCard">
                <div className="courseCardImageHolder">
                    <div className="coursePrice">free</div>
                </div>
                <div className="courseCardDetails">
                    <div>
                        <div className="authorName">Author Name</div>
                        <button className="bookmark">btn</button>
                    </div>
                    <div>Course Name</div>
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