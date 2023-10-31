import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./components/dashboard/sidebar";
import Courses from "./components/dashboard/courses";

function Dashboard() {
    return (
        <>
            <Navbar />
            <div id="dashboardBody">
                <Sidebar />
                <Courses />
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
