import React, { useState, useEffect } from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import { Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Dashboard() {
	const [change, setChange] = useState(false);
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true);
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://localhost:5000/api/users/${token}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setUserData(data);
				setIsLoading(false)
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
	}, []);
	return (
		<>
			<Navbar dataChange={change} />
			<div id="dashboardBody">
				{!isLoading? (
				<>
				<Sidebar dataChange={change}/>
				<Outlet context={[change, setChange, userData] }/>
				</>): (
					<div className="loaderContainer"><ClipLoader color="#683bd8"/></div>
				)}
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;