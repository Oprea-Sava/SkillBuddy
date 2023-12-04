import React, { useState } from "react";
import "./css/dashboard/dashboard.css"
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
	const [change, setChange] = useState(false)
	return (
		<>
			<Navbar dataChange={change} />
			<div id="dashboardBody">
				<Sidebar dataChange={change}/>
				<Outlet context={[change, setChange]}/>
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;
