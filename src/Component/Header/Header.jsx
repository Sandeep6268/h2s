import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setUser(decoded);
        fetchPurchasedCourses(decoded.user_id);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const fetchPurchasedCourses = async (userId) => {
    try {
      const response = await axios.get(`/api/purchased-courses/${userId}/`);
      setPurchasedCourses(response.data);
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
    }
  };

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUser(null);
    setPurchasedCourses([]);
    navigate("/");
  };

  // Map course URLs to their display names
  const courseNames = {
    "/htmlcss89": "HTML & CSS Internship",
    "/htmlcssjs62": "HTML, CSS & JS Internship",
    "/python24": "Python Internship",
    "/pythondjango90": "Django + Python Internship",
    "/react79": "React JS Internship",
    "/reactandjs43": "React JS + JavaScript Internship"
  };

  return (
    <header className="header">
      <nav className={`navbar ${navActive ? "nav-active" : ""}`}>
        <div className="nav-brand">
          <Link to={"/"} className="col-md-3 col-2">
            <div className="logo-div ">
              <img src={logo} className="w-100" alt="Logo" />
            </div>
          </Link>
        </div>

        <div className="nav-toggle" onClick={toggleNav}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-menu ${navActive ? "nav-active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle">
                Your Courses
              </a>
              {isAuthenticated && purchasedCourses.length > 0 && (
                <ul className="dropdown-menu">
                  {purchasedCourses.map((course) => (
                    <li key={course.id}>
                      <Link 
                        to={course.course_url} 
                        className="dropdown-item"
                        onClick={() => setNavActive(false)}
                      >
                        {courseNames[course.course_url] || course.course_url}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            <li className="nav-item">
              <Link to="/contactus" className="nav-link">
                ContactUs
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">{user?.email}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-success">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;