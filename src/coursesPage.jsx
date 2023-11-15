import React from "react";
import "./css/coursesPage.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Courses from "./components/dashboard/courses";

function CoursesPage() {
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
									Showing 1-9 of 21 courses
								</div>
							</div>
							<div className="filterCourses">
								<select name="filterCourses">
									{/* <form action="">
										<input
											type="text"
											placeholder="search"
										/>
									</form> */}
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
