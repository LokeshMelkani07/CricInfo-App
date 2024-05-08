import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../utils/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-purple-600 p-3 flex justify-between items-center relative z-10">
      {/* Left Section - Logo */}
      <div className="text-white text-2xl font-semibold">
        <Link className="text-decoration-none" to="/">
          <h1 className="text-2xl font-extrabold text-black">
            Vehicle
            <span className="text-red-500">
              Guardian{" "}
              <span className="text-black">
                <i className="fa-solid fa-car"></i>
              </span>
            </span>
          </h1>
        </Link>
      </div>

      {/* Hamburger Menu Icon - Visible on Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Center Section - Navigation Links - Visible on Desktop */}
      <div className="hidden md:flex space-x-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Home
        </Link>
        <Link
          to="/blogs"
          onClick={closeMenu}
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Blogs
        </Link>
        <Link
          to="/videos"
          onClick={closeMenu}
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Videos
        </Link>
        <Link
          to="/mycar"
          onClick={closeMenu}
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          My Car
        </Link>
        <Link
          to="/Feedback"
          onClick={closeMenu}
          className="text-black text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
        >
          Contact Us
        </Link>
      </div>

      {/* Right Section - Dark/Light Mode Button and Authentication Links */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="text-white" onClick={toggleTheme}>
          {theme ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
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

      {/* Mobile Menu - Hidden by Default */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-purple-600 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            onClick={closeMenu}
            className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
          >
            Blogs
          </Link>
          <Link
            to="/videos"
            onClick={closeMenu}
            className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
          >
            Videos
          </Link>
          <Link
            to="/mycar"
            onClick={closeMenu}
            className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
          >
            My Car
          </Link>
          <Link
            to="/Feedback"
            onClick={closeMenu}
            className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
          >
            Contact Us
          </Link>
          {token ? (
            <Link
              to="/"
              className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
              onClick={() => {
                closeMenu();
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
                onClick={closeMenu}
                className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="text-white text-decoration-none hover:border border-purple-900 hover:rounded-lg p-2 font-bold"
              >
                Signup
              </Link>
            </>
          )}
          <button
            className="text-white"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
          >
            {theme ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
