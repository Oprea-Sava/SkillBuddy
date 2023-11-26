import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/reset.css";
import "./css/main.css";
import LandingPage from "./landingPage";
import Dashboard from "./dashboard";
import Overview from "./components/dashboard/overview";
import MyProfile from "./components/dashboard/myProfile";
import SignIn from "./signIn";
import SignUp from "./signUp";
import UserCourses from "./components/dashboard/userCourses";
import Wishlist from "./components/dashboard/wishlist";
import ErrorPage from "./errorPage";
import OrderHisory from "./components/dashboard/orderHistory";
import EditProfile from "./components/dashboard/editProfile";
import CoursesPage from "./coursesPage";
import AuthRoute from "./authRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		errorElement: < ErrorPage/>,
	},
	{
		path: "dashboard",
		element: <AuthRoute><Dashboard /></AuthRoute>,
		children: [
			{ index: true, element: <Overview /> },
			{ path: "courses", element: <Overview /> },
			{ path: "myprofile", element: <MyProfile /> },
			{ path: "usercourses", element: <UserCourses /> },
			{ path: "wishlist", element: <Wishlist /> },
			{ path: "orderhistory", element: <OrderHisory /> },
			{ path: "editprofile", element: <EditProfile /> },
			{ path: "changepassword", element: <></> },
			
		],
	},
	{
		path: "courses",
		element: <CoursesPage />,
		
	},
	{
		path: "signin",
		element: <SignIn />,
	},
	{
		path: "signup",
		element: <SignUp />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
