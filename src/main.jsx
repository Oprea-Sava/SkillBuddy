import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/reset.css'
import './css/main.css'
import LandingPage from './landingPage'
import Dashboard from './dashboard';
import Courses from './components/dashboard/courses';
import MyProfile from './components/dashboard/myProfile';
import SignIn from './signIn';
import SignUp from './signUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Courses /> },
      { path: "courses", element: <Courses /> },
      { path: "myprofile", element: <MyProfile /> },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
