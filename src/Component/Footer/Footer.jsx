import React, { useState } from "react";
import "./Footer.css";
import logo from "../../images/logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Footer = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleClose = () => setShowSupportModal(false);
  const handleShow = () => setShowSupportModal(true);

  return (
    <>
      <section
        className="footer bg-black p-5 row"
        style={{ marginRight: "1px" }}
      >
        <div className="col-md-6">
          <div className="footer-img">
            <img src={logo} alt="" className="w-100" />
          </div>
          <h5 className="pe-5">
            At <small className="text-primary">H2S Skills Academy</small>, you
            can gain practical knowledge and learn real-world skills that will
            help you transform your life at work, school and home.
          </h5>
          <p>
            <span className="text-primary">Head Quarter At :-</span>
            <br />
            91Springboard, 4th Floor, Salarpuria Tower-I,
            <br /> No. 22, Hosur Road, Koramangala, <br />
            Bengaluru, Karnataka – 560095
          </p>
        </div>
        <div className="offset-md-2 mt-sm-5 my-md-0 col-md-2">
          <h3 className="text-primary">Quick Links</h3>
          <ul type="none" className="p-0">
            <li className="my-3">
            <h5 className="text-white hover-cursor"
                
                style={{ cursor: "pointer" }}>
                <Link
                  to={"/about"}
                  className="text-decoration-none text-white"
                >
                  About
                </Link>
              </h5>
            </li>
            <li className="my-3">
              <h5 className="text-white hover-cursor"
                
                style={{ cursor: "pointer" }}>
                <Link
                  to={"/course"}
                  className="text-decoration-none text-white"
                >
                  Courses
                </Link>
              </h5>
            </li>
            <li className="my-3">
              <h5 className="text-white hover-cursor"
                
                style={{ cursor: "pointer" }}>
                <Link
                  to={"/register"}
                  className="text-decoration-none text-white"
                >
                  Register
                </Link>
              </h5>
            </li>
          </ul>
        </div>
        <div className="col-md-2 my-md-4 my-sm-0 py-2">
          <ul type="none" className="p-0">
            <li className="my-3">
              <h5 className="text-white hover-cursor"
                
                style={{ cursor: "pointer" }}>
                <Link
                  to={"/contactus"}
                  className="text-decoration-none text-white"
                >
                  Contact Us
                </Link>
              </h5>
            </li>
            <li className="my-3">
              <a
                href="#testimonials"
                className="text-decoration-none text-white"
              >
                <h5 className="text-white hover-cursor"
                
                style={{ cursor: "pointer" }}>Testimonials</h5>
              </a>
            </li>
            <li className="my-3">
              <h5
                className="text-white hover-cursor"
                onClick={handleShow}
                style={{ cursor: "pointer" }}
              >
                Support
              </h5>
            </li>
          </ul>
        </div>

        {/* Support Modal */}
        <Modal
          show={showSupportModal}
          onHide={handleClose}
          className="support-modal"
          centered
        >
          <Modal.Header
            closeButton
            className="bg-dark text-white border-bottom-primary"
          >
            <Modal.Title className="text-primary">
              <i className="fas fa-headset me-2"></i> 24/7 Support
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-gradient-dark text-white">
            <div className="support-content">
              <div className="text-center mb-4">
                <i className="fas fa-life-ring display-4 text-primary mb-3"></i>
                <h3>We're Here to Help!</h3>
                <p className="lead">Contact our support team anytime</p>
              </div>

              <div className="support-channels">
                <div className="channel-item mb-3">
                  <i className="fab fa-instagram me-2 text-primary"></i>
                  <a
                    href="https://www.instagram.com/h2stechsolutions?igsh=d3BkOTMxYWxpNjN5"
                    target="_blank"
                    class="share-icon"
                    className="text-white"
                  >
                    @h2stechsolutions
                  </a>
                </div>
                <div className="channel-item mb-3">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  <a
                    class="share-icon"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=h2stechsolutions@gmail.com"
                    target="_blank"
                    className="text-white"
                  >
                    support@h2sacademy.com
                  </a>
                </div>
              </div>

              <div className="support-hours mt-4 p-3 bg-dark rounded">
                <h5 className="text-primary mb-2">Support Hours:</h5>
                <p className="mb-1">
                  <i className="far fa-clock me-2"></i> 24/7 Availability
                </p>
                <p className="mb-1">
                  <i className="fas fa-bolt me-2"></i> Average Response Time:
                  Under 1 hour
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-dark border-top-primary">
            <Button variant="outline-primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default Footer;
