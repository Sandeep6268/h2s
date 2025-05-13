import React, { useState } from "react";
import "./Footer.css";
import logo from "../../images/logo-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Footer = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showLoginAlertModal, setShowLoginAlertModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClose = () => setShowSupportModal(false);
  const handleShow = () => setShowSupportModal(true);
  const handleCloseLoginAlert = () => setShowLoginAlertModal(false);

  const handleRegisterClick = () => {
    if (isAuthenticated) {
      setShowLoginAlertModal(true);
    } else {
      navigate("/register");
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-brand-section">
          <div className="footer-logo-container">
            <img src={logo} alt="H2S Skills Academy" className="footer-logo" />
          </div>
          <p className="footer-description">
            At <span className="text-primary">H2S Skills Academy</span>, you can gain practical knowledge and learn real-world skills that will help you transform your life at work, school and home.
          </p>
          <div className="footer-address">
            <p className="address-heading"><span className="text-primary">Head Quarter At :-</span></p>
            <p>91Springboard, 4th Floor, Salarpuria Tower-I,</p>
            <p>No. 22, Hosur Road, Koramangala,</p>
            <p>Bengaluru, Karnataka – 560095</p>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-links-group">
            <h3 className="links-heading text-primary">Quick Links</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/about" className="footer-link">About</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/course" className="footer-link">Courses</Link>
              </li>
              <li className="footer-link-item">
                <button onClick={handleRegisterClick} className="footer-link support-btn">Register</button>
              </li>
            </ul>
          </div>

          <div className="footer-links-group">
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/contactus" className="footer-link">Contact Us</Link>
              </li>
              <li className="footer-link-item">
                <a href="#testimonials" className="footer-link">Testimonials</a>
              </li>
              <li className="footer-link-item">
                <button onClick={handleShow} className="footer-link support-btn">Support</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>CODE | CREATE | CONQUER © H2S TECH SOLUTIONS PVT. LIMITED</p>
      </div>

      {/* Support Modal */}
      <Modal show={showSupportModal} onHide={handleClose} className="support-modal" centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">
            <i className="fas fa-headset me-2"></i> 24/7 Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="support-content">
            <div className="support-header">
              <i className="fas fa-life-ring support-icon"></i>
              <h3>We're Here to Help!</h3>
              <p className="support-subheader">Contact our support team anytime</p>
            </div>

            <div className="support-channels">
              <div className="channel-item">
                <i className="fab fa-instagram channel-icon"></i>
                <a
                  href="https://www.instagram.com/h2stechsolutions?igsh=d3BkOTMxYWxpNjN5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  @h2stechsolutions
                </a>
              </div>
              <div className="channel-item">
                <i className="fas fa-envelope channel-icon"></i>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=h2stechsolutions@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  support@h2sacademy.com
                </a>
              </div>
            </div>

            <div className="support-hours">
              <h5 className="hours-heading">Support Hours:</h5>
              <p className="hours-item">
                <i className="far fa-clock me-2"></i> 24/7 Availability
              </p>
              <p className="hours-item">
                <i className="fas fa-bolt me-2"></i> Average Response Time: Under 1 hour
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="outline-primary" onClick={handleClose} className="modal-close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Already Logged In Alert Modal */}
      <Modal show={showLoginAlertModal} onHide={handleCloseLoginAlert} className="login-alert-modal" centered>
        <Modal.Header closeButton className="login-alert-header">
          <Modal.Title className="login-alert-title">
            <i className="fas fa-info-circle me-2"></i> Already Registered
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-alert-body">
          <div className="login-alert-content">
            <i className="fas fa-check-circle login-alert-icon"></i>
            <h4>You're already logged in!</h4>
            <p>There's no need to register again. You can access all features with your current account.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="login-alert-footer">
          <Button variant="primary" onClick={handleCloseLoginAlert} className="login-alert-close-btn">
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;