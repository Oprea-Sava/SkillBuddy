import React from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import Courses from "./components/dashboard/courses";

function Dashboard() {
	const name = 1;

	return (
		<>
			<Navbar />
			<div id="dashboardBody">
				<Sidebar />
				{name === "popeye" ? (
					<SomePage />
				) : name === "spinach" ? (
					<OtherPage />
				) : (
					<Courses />
				)}
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;
