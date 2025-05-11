import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { COURSE_NAMES } from "../../Context";
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";

const Header = () => {
  const location = useLocation();
  const [navActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, enrolledCourses } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Fetch user data when needed
  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
      console.log("yahi wo", user);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            handleLogout();
            return;
          }

          setIsAuthenticated(true);

          // Set basic user data from token first
          setUser({
            username: decoded.username,
            email: decoded.email,
            first_name: decoded.first_name,
            user_id: decoded.user_id, // Make sure to include user_id
          });

          // Then try to get additional user data
          try {
            const userData = await getUserById(decoded.user_id);
            setUser((prev) => ({
              ...prev,
              ...userData,
            }));
          } catch (error) {
            console.error("Failed to fetch user details:", error);
            // Continue with just the token data
          }
        } catch (err) {
          console.error("Invalid token:", err);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkAuth();
  }, [setUser]);

  // Rest of your component remains the same...
  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUser(null);
    setShowProfileDropdown(false);
    navigate("/");
  };

  const handleYourCoursesClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowModal(true);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showProfileDropdown &&
        !e.target.closest(".profile-dropdown-wrapper")
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.body.classList.add("click-outside-handler", "active");
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.classList.remove("click-outside-handler", "active");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("click-outside-handler", "active");
    };
  }, [showProfileDropdown]);

  const getAvatarLetter = () => {
    return user?.username?.charAt(0).toUpperCase() || "U";
  };
  console.log(user?.username);

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
              <li className="nav-item profile-container">
                <div className="profile-dropdown-wrapper">
                  <button
                    className="profile-avatar"
                    onClick={toggleProfileDropdown}
                  >
                    <span className="avatar-circle">{getAvatarLetter()}</span>
                  </button>

                  {showProfileDropdown && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <span className="dropdown-avatar">
                          {getAvatarLetter()}
                        </span>
                        <div className="user-info">
                          <span className="username">
                            {user?.username || "User"}
                          </span>
                          <span className="email">{user?.email || ""}</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="dropdown-item"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </li>
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
