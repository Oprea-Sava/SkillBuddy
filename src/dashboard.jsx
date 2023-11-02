import React from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import Courses from "./components/dashboard/courses";
import MyProfile from "./components/dashboard/myProfile";

function Dashboard() {
	const name = 1;

	return (
		<>
			<Navbar />
			<div id="dashboardBody">
				<Sidebar />
				{/* <Courses /> */}
				<MyProfile />
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;
