import HighlightCard from "./highlightCard"

function CourseHighlights() {
    
    return (
        <div id="highlightsContainer">
            <h1>Course Highlights</h1>
                <div className="highlights">
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                </div>
                <button>See More Courses</button>
        </div>
    )
}

export default CourseHighlights
