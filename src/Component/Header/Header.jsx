import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { COURSE_NAMES, userCoursesName } from "../../Context";
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";
import API, { FindUser } from "../../api";

const Header = () => {
  const location = useLocation();
  const [navActive, setNavActive] = useState(false);
  const { user, setUser, enrolledCourses } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // Derived authentication state from user context
  const isAuthenticated = !!user;

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        try {
          // Verify token
          await API.post("jwt/verify/", { token });

          // If we have a token but no user data, fetch it
          if (!user) {
            const decoded = jwtDecode(token);
            const response = await FindUser.get(`user/${decoded.user_id}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
          }
        } catch (err) {
          console.log("Token invalid", err);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, [user, setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
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
  const toggleNav = () => {
    setNavActive(!navActive);
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
  // console.log(user?.username);
  // hogya
  const [userCourses, setUserCourses] = useState([]);
  // console.log(userCourses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await FindUser.get("/my-courses/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        const courseData = response.data;

        if (Array.isArray(courseData)) {
          setUserCourses(courseData); // Check that data is set properly
          // console.log("Fetched user courses:", courseData); // Verify this in console
        } else {
          console.error("Unexpected data format:", courseData);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // console.log("User Courses before render:", userCourses);

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
            {/* <li className="nav-item">
              <button
                onClick={handleYourCoursesClick}
                className={`nav-link text-decoration-none ${isActive(
                  "/dashboard"
                )}`}
              >
                User Dashboard
              </button>
            </li> */}
            {showModal && (
              <div className={`your-courses-modal ${showModal ? 'active' : ''}`}>
                <div
                  className=""
                  onClick={() => setShowModal(false)}
                ></div>
                <div className="modal-content-1">
                  <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <h3 className="modal-title">Your Purchased Courses</h3>
                  <ul className="courses-list">
                    {userCourses.length > 0 ? (
                      userCourses.map((course) => (
                        <li key={course.course_url}>
                          <Link to={course.course_url} className="course-link">
                            {COURSE_NAMES[course.course_url] ||
                              course.course_url}
                            <span className="link-arrow">→</span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="no-courses">No courses found</li>
                    )}
                  </ul>
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
                    <span className="avatar-circle">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </button>

                  {showProfileDropdown && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <span className="dropdown-avatar">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </span>
                        <div className="user-info">
                          <span className="username">
                            {user?.username || "User"}
                          </span>
                          <span className="email">{user?.email || ""}</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button
                        onClick={handleYourCoursesClick}
                        className={`dropdown-item text-black ${isActive("/dashboard")}`}
                      >
                        Your purchased courses
                      </button>
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
