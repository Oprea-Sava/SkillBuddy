import React from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
	return (
		<>
			<Navbar />
			<div id="dashboardBody">
				<Sidebar />
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;
