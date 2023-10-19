import placeholder from "../assets/placeholder.png"
import placeholder2 from "../assets/paceholder2.png"
import ImageCarousel from "./imageCarousel"


function CourseHighlights() {


    return (
        <div id="highlightsContainer">
            <div className="featuredCourse">
                <img src={placeholder2} alt="image" />
                <div className="featuredCourseDetails text">
                    <div className="featuredCourseTitle">
                        <div className="featureCircle"></div>
                        <div>Featured Course</div>
                    </div>
                    <div className="featuredCourseDescription">
                        <div>Example course for beginers</div>
                        <div>
                            ajshdjkabdjaba sgd ajsg dajsgdagsgdjas asjgdahgdasdh
                            ashsgdjahfahjkdh gsksjerhkjshdkjf dlkjfdfjhlkdmd
                            ajshdjkabdjaba sgd ajsg dajsgdagsgdjas asjgdahgdasdh
                            ashsgdjahfahjkdh gsksjerhkjshdkjf dlkjfdfjhlkdmd 
                        </div>
                    </div>
                    <div className="featuredCoursePoints">
                        <div>
                            <div className="featureCircle"></div>
                            <div className="point">feature</div>
                        </div>
                        <div>
                            <div className="featureCircle"></div>
                            <div className="point">feature</div>
                        </div>
                        <div>
                            <div className="featureCircle"></div>
                            <div className="point">feature</div>
                        </div>
                        <div>
                            <div className="featureCircle"></div>
                            <div className="point">feature</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <ImageCarousel/>
            </div>
        </div>
    )
}

export default CourseHighlights
