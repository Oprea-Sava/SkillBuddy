import React, { useState, useEffect } from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
	const [change, setChange] = useState(false);
	const [userData, setUserData] = useState({});
	useEffect(() => {
		const fetchUserData = async () => {
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
				<Sidebar dataChange={change}/>
				<Outlet context={[change, setChange, userData] }/>
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;