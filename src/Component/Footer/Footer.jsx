import React, { useContext, useState, useEffect } from "react";
import "./Footer.css";
import logo from "../../images/logo-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../../Context";

const Footer = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] =
    useState(false);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleClose = () => setShowSupportModal(false);
  const handleShow = () => setShowSupportModal(true);

  // Auto-hide the already registered modal after 3 seconds
  useEffect(() => {
    let timer;
    if (showAlreadyRegisteredModal) {
      timer = setTimeout(() => {
        setShowAlreadyRegisteredModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlreadyRegisteredModal]);

  const handleRegisterClick = () => {
    if (user) {
      setShowAlreadyRegisteredModal(true);
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
            At <span className="text-primary">H2S Skills Academy</span>, you can
            gain practical knowledge and learn real-world skills that will help
            you transform your life at work, school and home.
          </p>
          <div className="footer-address">
            <p className="address-heading">
              <span className="text-primary">Head Quarter At :-</span>
            </p>
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
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/course" className="footer-link">
                  Courses
                </Link>
              </li>
              <li className="footer-link-item">
                <button
                  onClick={handleRegisterClick}
                  className="footer-link register-btn text-decoration-none"
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
          {/* Already Registered Modal */}
          <Modal
            show={showAlreadyRegisteredModal}
            onHide={() => setShowAlreadyRegisteredModal(false)}
            className="already-registered-modal"
            centered
            size="sm"
          >
            <Modal.Body className="already-registered-modal-body">
              <div className="registered-content">
                <i className="fas fa-check-circle registered-icon"></i>
                <h5 className="registered-title">Already Registered!</h5>
                <p className="registered-message">You're already logged in.</p>
              </div>
            </Modal.Body>
          </Modal>
          <div className="footer-links-group">
            <ul className="footer-links-list mt-5">
              <li></li>
              <li className="footer-link-item">
                <Link to="/contactus" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li className="footer-link-item">
                <a href="#testimonials" className="footer-link">
                  Testimonials
                </a>
              </li>
              <li className="footer-link-item">
                <button
                  onClick={handleShow}
                  className="footer-link text-decoration-none support-btn"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>CODE | CREATE | CONQUER © H2S TECH SOLUTIONS PVT. LIMITED</p>
      </div>

      {/* Support Modal */}
      <Modal
        show={showSupportModal}
        onHide={handleClose}
        className="support-modal"
        centered
      >
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
              <p className="support-subheader">
                Contact our support team anytime
              </p>
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
                <i className="fas fa-bolt me-2"></i> Average Response Time:
                Under 1 hour
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button
            variant="outline-primary"
            onClick={handleClose}
            className="modal-close-btn"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;
