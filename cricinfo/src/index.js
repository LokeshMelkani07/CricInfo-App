import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Videos from "./components/Videos";
import Blogs from "./components/Blogs";
import MyCar from "./components/MyCar";
import ErrorPage from "./components/ErrorPage";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/mycar",
        element: <MyCar />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
