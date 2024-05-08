import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const err = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md md:max-w-lg">
        <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-4">
          {err.status}, an error occurred!
        </h1>
        <p className="text-gray-600 mb-6">{err.statusText}</p>
        <p className="text-gray-600 mb-8">
          Please try again later or contact support.
        </p>
        <Link
          to="/"
          className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-md text-sm md:text-base font-medium inline-block text-decoration-none"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
