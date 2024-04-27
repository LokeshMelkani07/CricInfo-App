import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Feedback from "../src/components/Feedback";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyCar from "./components/MyCar";
import ErrorPage from "./components/ErrorPage";
import Body from "./components/Body";

import { lazy } from "react";
import ShimmerCard from "./components/Shimmer";

const Blogs = lazy(() => import("../src/components/Blogs"));
const Videos = lazy(() => import("../src/components/Videos"));
const Register = lazy(() => import("../src/components/Register"));
const Login = lazy(() => import("../src/components/Login"));

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
        element: (
          <Suspense fallback={<ShimmerCard />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "/videos",
        element: (
          <Suspense fallback={<ShimmerCard />}>
            <Videos />
          </Suspense>
        ),
      },
      {
        path: "/mycar",
        element: <MyCar />,
      },
      {
        path: "/Feedback",
        element: <Feedback />,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<ShimmerCard />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<ShimmerCard />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
