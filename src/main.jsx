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
import SavedCourses from "./components/dashboard/savedCourses"

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "dashboard",
		element: <Dashboard />,
		children: [
			{ index: true, element: <Overview /> },
			{ path: "courses", element: <Overview /> },
			{ path: "myprofile", element: <MyProfile /> },
			{ path: "usercourses", element: <UserCourses /> },
			{ path: "savedcourses", element: <SavedCourses /> },
		],
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
