import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/reset.css'
import './css/main.css'
import LandingPage from './landingPage'
import Dashboard from './dashboard';
import Courses from './components/dashboard/courses';
import SignIn from './signIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
