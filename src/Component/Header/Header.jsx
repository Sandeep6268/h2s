import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Modal from 'react-modal';
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";
import { Context } from "../../Context";

Modal.setAppElement('#root');

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      const response = await fetch(`/api/user/${userId}/courses/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPurchasedCourses(data);
      }
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
    navigate("/");
  };

  const openModal = () => {
    if (isAuthenticated) {
      setModalIsOpen(true);
    } else {
      navigate("/login");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const courseRedirects = {
    'htmlcss89': '/courses/html-css',
    'htmlcssjs62': '/courses/html-css-js',
    'python24': '/courses/python',
    'pythondjango90': '/courses/django',
    'react79': '/courses/react',
    'reactandjs43': '/courses/react-js'
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
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/portfolio" className="nav-link">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={openModal}>
                Your Courses
              </button>
            </li>
            <li className="nav-item">
              <Link to="/contactus" className="nav-link">
                ContactUs
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="courses-modal"
        overlayClassName="courses-modal-overlay"
      >
        <div className="modal-header">
          <h2>Your Purchased Courses</h2>
          <button onClick={closeModal} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {purchasedCourses.length > 0 ? (
            <ul className="course-list">
              {purchasedCourses.map((course) => (
                <li key={course.id} className="course-item">
                  <Link 
                    to={courseRedirects[course.course_id] || '#'} 
                    onClick={closeModal}
                    className="course-link"
                  >
                    {course.course_name}
                    <span className="purchase-date">
                      Purchased: {new Date(course.purchase_date).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-courses">
              <p>You haven't purchased any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </Modal>
    </header>
  );
};

export default Header;