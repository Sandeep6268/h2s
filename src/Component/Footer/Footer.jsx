import React from "react";
import './Footer.css'
import logo from "../../images/logo-removebg-preview.png";
const Footer = () => {
  return (
    <>
      <section className="footer bg-black p-5  row" style={{marginRight:'1px'}}>
        <div className=" col-md-6">
          <div className="footer-img">
            <img src={logo} alt="" className="w-100" />
          </div>
          <h5 className="pe-5">
            At <small className="text-primary">H2S Skills Hub</small>, you can gain practical knowledge and learn
            real-world skills that will help you transform your life at work,
            school and home.
          </h5>
        </div>
        <div className="offset-md-2 mt-sm-5 my-md-0 col-md-2">
          <h3 className="text-primary">Quick Links</h3>
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
        <div className=" col-md-2 my-md-4 my-sm-0 py-2">
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
