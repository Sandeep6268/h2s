import React, { useState } from "react";
import "./Contact.css";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCsrfToken = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return cookieValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://h2s-backend-urrt.onrender.com/api/contact/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          credentials: "include",
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(
        "There was a network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setShowSuccessModal(false);

  return (
    <>
      <Header />

      <div className="landing_page" style={{ marginTop: "115px" }}>
        <div className="responsive-container-block big-container">
          <img
            className="bg-img"
            id="iq5bf"
            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/clothes-bg.png"
            alt="background"
          />
          <div className="responsive-container-block container">
            <div
              className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one"
              data-aos="fade-down"
            >
              <div className="content-box">
                <p className="text-blk section-head">H2S Tech Support</p>
                <p className="text-light section-subhead">
                  We're here to help! Whether you have a question, feedback, or
                  need support, feel free to reach out to us using any of the
                  methods below. We aim to respond within 24 hours.
                </p>
                <div className="icons-container">
                  <a
                    href="https://x.com/h2s_tech_77?t=0ZEToDRrgK7j8YJZA3CCfw&s=08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon"
                  >
                    <img
                      className="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                      alt="Twitter"
                    />
                  </a>

                  <a
                    className="share-icon"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=h2stechsolutions@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                      alt="Gmail"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/h2stechsolutions?igsh=d3BkOTMxYWxpNjN5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon"
                  >
                    <img
                      className="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                      alt="Instagram"
                    />
                  </a>
                </div>
                < className="mt-4 text-light">
                  <span className="fw-bolder fs-4 text-white">
                    Head Quarter At :-
                  </span>
                  <br />
                  Shayam Plaza, Patwardhan marg, Just,<br />
                  behind Grace Church, Dewas, Madhya Pradesh 455001
                </p>
              </div>
            </div>
            <div
              className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
              id="i1zj"
              data-aos="fade-up"
            >
              <form className="form-box" onSubmit={handleSubmit}>
                <div className="container-block form-wrapper">
                  <p className="text-blk contactus-head">
                    <a className="link" href=""></a>
                    Get In Touch
                  </p>
                  <p className="text-blk contactus-subhead">
                    We will get back to you in 24 hours
                  </p>
                  <div className="responsive-container-block">
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i10mt-7"
                    >
                      <input
                        className="input"
                        id="ijowk-7"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i1ro7"
                    >
                      <input
                        className="input"
                        id="indfi-5"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial"
                      id="ityct"
                    >
                      <input
                        className="input"
                        id="ipmgh-7"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <input
                        className="input"
                        id="imgis-6"
                        name="phone"
                        placeholder="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i634i-7"
                    >
                      <textarea
                        className="textinput"
                        id="i5vyy-7"
                        name="message"
                        placeholder="Type message here"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="contact-spinner">
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-2">Processing...</span>
                      </div>
                    ) : (
                      "Get quote"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={handleClose}
        className="contact-success-modal"
        centered
      >
        <Modal.Header closeButton className="bg-success text-white border-0">
          <Modal.Title className="text-center w-100">
            <i className="fas fa-check-circle me-2"></i> Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="success-icon mb-3">
            <i className="fas fa-envelope-open-text display-4 text-success"></i>
          </div>
          <h4 className="mb-3">Thank You!</h4>
          <p>Your message has been submitted successfully.</p>
          <p>We'll get back to you within 24 hours.</p>

          <div className="contact-alternatives mt-4">
            <p className="mb-2">For immediate assistance, you can:</p>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://www.instagram.com/h2stechsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                <i className="fab fa-instagram me-2"></i> DM on Instagram
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=h2stechsolutions@gmail.com"
                target="_blank"
                className="btn btn-outline-success"
              >
                <i className="fas fa-envelope me-2"></i> Email Us
              </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="success" onClick={handleClose} className="px-4">
            Continue Browsing
          </Button>
          <Button variant="outline-success" as={Link} to="/" className="px-4">
            <i className="fas fa-home me-2"></i> Go to Home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
