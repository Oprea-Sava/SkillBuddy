import React, { useState, useEffect } from 'react';
import "./css/coursesPage.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Courses from "./components/dashboard/courses";

function CoursesPage() {
	const [publishedCount, setPublishedCount] = useState(0);

  useEffect(() => {
    const fetchPublishedCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses/published/count');
        const data = await response.json();
        setPublishedCount(data.publishedCoursesCount);
      } catch (error) {
        console.error('Error fetching published chapters count:', error);
      }
    };

    fetchPublishedCount();
  }, []);
	return (
		<>
			<Navbar />

			<div id="coursesPageContent">
				<div className="coursesPageTitle text">Courses</div>
				<div className="coursesSection">
					<div className="coursesContent">
						<div className="coursesContentHead">
							<div className="showFilteredCourses">
								<button className="showInGrid"></button>
								<button className="showInList"></button>
								<div className="text">
									{`Showing 1-9 of ${publishedCount} courses`}
								</div>
							</div>
							<div className="filterCourses">
								<select name="filterCourses">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</div>
						</div>
						<Courses />
					</div>

					<div className="coursesSidebar">
						
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default CoursesPage;
