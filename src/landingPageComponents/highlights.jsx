import HighlightCard from "./highlightCard"

function CourseHighlights() {
    
    return (
        <div id="highlightsContainer">
            <h1 className="text">Course Highlights</h1>
                <div className="highlights">
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                </div>
                <button className="text secondary">See More Courses</button>
        </div>
    )
}

export default CourseHighlights
