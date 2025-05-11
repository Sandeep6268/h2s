import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { jwtDecode } from "jwt-decode";
import { COURSE_NAMES } from "../../Context";
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";

const Header = () => {
  const location = useLocation(); // Get current route location
  const [navActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, enrolledCourses } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  const handleYourCoursesClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowModal(true);
    }
  };

  return (
    <header className="header">
      <nav className={`navbar ${navActive ? "nav-active" : ""}`}>
        <div className="nav-brand">
          <Link to={"/"} className="col-md-3 col-2">
            <div className="logo-div">
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
              <Link to="/" className={`nav-link ${isActive("/")}`}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActive("/about")}`}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/course" className={`nav-link ${isActive("/course")}`}>
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleYourCoursesClick}
                className={`nav-link text-decoration-none ${isActive(
                  "/dashboard"
                )}`}
              >
                User Dashboard
              </button>
            </li>

            {/* Modal Popup */}
            {showModal && (
              <div className="your-courses-modal top-100">
                <div className="modal-content">
                  <h3>Your Enrolled Courses</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="close-btn"
                  >
                    ×
                  </button>
                  <div className="courses-list">
                    {enrolledCourses.length > 0 ? (
                      enrolledCourses.map((url, index) => (
                        <Link
                          to={url}
                          key={index}
                          onClick={() => setShowModal(false)}
                          className="course-link"
                        >
                          {COURSE_NAMES[url] || `Course ${index + 1}`}
                        </Link>
                      ))
                    ) : (
                      <p>No courses enrolled yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <li className="nav-item">
              <Link
                to="/contactus"
                className={`nav-link ${isActive("/contactus")}`}
              >
                ContactUs
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link username-display">
                    {user?.username || "User"}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`btn btn-outline-primary me-2 ${isActive(
                      "/login"
                    )}`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={`btn btn-outline-success ${isActive(
                      "/register"
                    )}`}
                  >
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
