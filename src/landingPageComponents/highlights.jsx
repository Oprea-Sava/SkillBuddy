// import HighlightCard from "./highlightCard"
import placeholder from "../assets/placeholder.png"
import placeholder2 from "../assets/paceholder2.png"
import ImageSlider from "../imageSlider.jsx"

function CourseHighlights() {

    const slides = [
        { url: placeholder, title: "" },
        { url: placeholder2, title: "" },
        { url: placeholder, title: "" },
        { url: placeholder2, title: "" },
        { url: placeholder, title: "" },
      ];

    return (
        <div id="highlightsContainer">
            <div className="highlights">
                {/* <HighlightCard />
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
                <HighlightCard /> */}
                <ImageSlider slides={slides}/>
            </div>
        </div>
    )
}

export default CourseHighlights
