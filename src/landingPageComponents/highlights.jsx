import placeholder from "../assets/placeholder.png"
import placeholder2 from "../assets/paceholder2.png"
import ImageSlider from "../imageSlider.jsx"


function CourseHighlights() {

    const images = [
        { url: placeholder, title: "image1" },
        { url: placeholder2, title: "image2" },
        { url: placeholder, title: "image3" },
        { url: placeholder2, title: "image4" },
        { url: placeholder, title: "image5" },
        { url: placeholder2, title: "image6" }
      ];

    return (
        <div id="highlightsContainer">
            <div className="featuredCourse">
                <img src={placeholder2} alt="image" />
                <div className="featuredCourseDetails">
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

            <div className="highlights">
                <ImageSlider images={images}/>
            </div>
        </div>
    )
}

export default CourseHighlights
