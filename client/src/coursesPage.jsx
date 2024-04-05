import React, { useState, useEffect } from 'react';
import "./css/coursesPage.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Courses from "./components/dashboard/courses";

function CoursesPage() {
	const [publishedCount, setPublishedCount] = useState(0);
	let coursesOnPage = 0;
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		try {
		const response = await fetch(`http://localhost:5000/api/courses/search?query=${query}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		const resultIds = data.map(course => course._id);
		setResults(resultIds);
		} catch (error) {
		console.error('Error fetching search results:', error);
		}
	};

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
	if(!results.length){
    fetchPublishedCount();
	} else {
		setPublishedCount(results.length);
	}
  }, [results]);

  if(publishedCount > 12){
	coursesOnPage = 12;
  }
  else{
	coursesOnPage = publishedCount;
  }

	return (
		<>
			<Navbar />

			<div id="coursesPageContent">
				<div className="coursesPageTitle text">Courses</div>
				<div className="coursesSection">
					<div className="coursesContent">
						<div className="coursesContentHead">
							<div className="showFilteredCourses">
								{/* <button className="showInGrid"></button>
								<button className="showInList"></button> */}
								<div className="text">
									{`Showing 1-${coursesOnPage} of ${publishedCount} courses`}
								</div>
							</div>
							{/* <div className="filterCourses">
								<select name="filterCourses">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									{}	
								</select>
							</div> */}
						</div>
						<Courses results={results} />
					</div>

					<div className="coursesSidebar">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search..."
					/>
					<button onClick={handleSearch}>Search</button>
					<ul>
						{results.map(result => (
						<li key={result._id}>{result.title}</li>
						))}
					</ul>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default CoursesPage;
