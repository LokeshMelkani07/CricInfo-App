import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeContext from "../utils/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    }
  }, []);

  return (
    <nav className="bg-purple-600 p-3 flex justify-between items-center">
      {/* Left Section - Logo */}
      <div className="text-white text-2xl font-semibold">
        <Link className="text-decoration-none" to="/">
          <h1 className="text-2xl font-extrabold text-black">
            Vehicle
            <span className="text-red-500">
              Guardian{" "}
              <span className="text-black">
                <i class="fa-solid fa-car"></i>
              </span>
            </span>
          </h1>
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="space-x-4">
        <Link
          to="/"
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Home
        </Link>
        <Link
          to="/blogs"
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Blogs
        </Link>
        <Link
          to="/videos"
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Videos
        </Link>
        <Link
          to="/mycar"
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          My Car
        </Link>
      </div>

      {/* Right Section - Login, Signup, and Dark/Light Mode Button */}
      <div className="space-x-4">
        <button className="text-white">
          {theme == false ? (
            <i className="fas fa-sun mx-2" onClick={toggleTheme}></i>
          ) : (
            <i className="fas fa-moon mx-2" onClick={toggleTheme}></i>
          )}
        </button>
        {token ? (
          <Link
            className="text-white border rounded-full border-white py-1 px-4 hover:bg-black hover:text-black text-decoration-none"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("unique");
            }}
          >
            Logout
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white border rounded-full border-white py-1 px-4 hover:bg-black hover:text-black text-decoration-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white border rounded-full border-white py-1 px-4 hover:bg-black hover:text-black text-decoration-none"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
