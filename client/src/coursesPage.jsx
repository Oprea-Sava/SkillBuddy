import React, { useState, useEffect } from 'react';
import "./css/coursesPage.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Courses from "./components/dashboard/courses";
import ClipLoader from "react-spinners/ClipLoader";

function CoursesPage() {
	const [publishedCount, setPublishedCount] = useState(0);
	let coursesOnPage = 0;
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const handleSearch = async (searchQuery) => {
		setIsLoading(true);
		try {
		const response = await fetch(`http://localhost:5000/api/courses/search?query=${searchQuery}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		const resultIds = data.map(course => course._id);
		setResults(resultIds);
		} catch (error) {
		console.error('Error fetching search results:', error);
		} finally {
            setIsLoading(false);
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
	coursesOnPage = publishedCount;
  	const handleChange = (e) => {
	const value = e.target.value;
	setQuery(value);
	if (value.length > 0) {
		handleSearch(value);
	} else setResults([]);
};

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
						{isLoading? ( <div className='loaderContainer'><ClipLoader color="#683bd8"/></div>) : (<Courses results={results} />)}
					</div>

					<div className="coursesSidebar">
					<input className="text"
						type="text"
						value={query}
						onChange={handleChange}
						placeholder="Search..."
					/>

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
