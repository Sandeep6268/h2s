import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { COURSE_NAMES } from "../../Context";
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, enrolledCourses } = useContext(Context); // ⬅️ Store user data here
  // const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleYourCoursesClick = () => {
    if (!user) {
      navigate("/login"); // User logged out है तो login पर भेजो
    } else {
      setShowModal(true); // Modal दिखाओ
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        // console.log(decoded); // Log the decoded token to inspect its structure
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
              <Link to="/course" className="nav-link">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleYourCoursesClick}
                className="nav-link text-decoration-none"
              >
                User Dashboard
              </button>
            </li>

            {/* Modal Popup */}
            {showModal && (
              <div className="your-courses-modal">
                <div className="modal-content" >
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
                          {/* Dynamic Name Display */}
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
              <Link to="/contactus" className="nav-link">
                ContactUs
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link"></span>
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
