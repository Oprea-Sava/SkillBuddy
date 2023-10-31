import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Sidebar from './components/dashboard/sidebar'
import Courses from './components/dashboard/courses'

function Dashboard() {
    return (
        <>
            <Navbar/>
            <Sidebar />
            <Courses />
            <Footer/>
        </>
    )
}

export default Dashboard