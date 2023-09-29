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
            <div className="highlights">
                <ImageSlider images={images}/>
            </div>
        </div>
    )
}

export default CourseHighlights
