import React from "react";
import './Footer.css'
import logo from "../../images/logo-removebg-preview.png";
const Footer = () => {
  return (
    <>
      <section className="footer bg-black p-5 d-flex">
        <div className="footer-logo p-2 d-flex flex-column">
          <div className="footer-img">
            <img src={logo} alt="" className="w-100" />
          </div>
          <h5 className="pe-5">
            At <small className="text-primary">H2S Skills Hub</small>, you can gain practical knowledge and learn
            real-world skills that will help you transform your life at work,
            school and home.
          </h5>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul type='none' className="p-0">
            <li className="my-3">
              <h5>About</h5>
            </li>
            <li className="my-3">
              <h5>Courses</h5>
            </li>
            <li className="my-3">
              <h5>Register</h5>
            </li>
          </ul>
        </div>
        <div className="more-links my-4 py-2">
          <ul type='none' className="p-0">
            <li className="my-3">
              <h5>Contact Us</h5>
            </li>
            <li className="my-3">
              <h5>Testimonials</h5>
            </li>
            <li className="my-3">
              <h5>Support</h5>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Footer;
