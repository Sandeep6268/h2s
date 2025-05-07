import React, { useState } from "react";
import "./Header.css"; // Ensure to import the corresponding CSS for styles
import logo from '../../images/logo-removebg-preview.png'
import { Link } from "react-router-dom";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState({
    products: false,
    services: false,
  });

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const toggleDropdown = (menu) => {
    setDropdownActive({
      ...dropdownActive,
      [menu]: !dropdownActive[menu],
    });
  };

  return (
    <>
      <header className="header">
        <nav className={`navbar ${navActive ? "nav-active" : ""}`}>
          <div className="nav-brand">
            <Link to={"/"} className="col-md-3 col-2">
              <div className="logo-div ">
                <img src={logo} className="w-100" alt="" />
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
                <a href="#" className="nav-link active">
                  Home
                </a>
              </li>
              
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* <header className="p-3 navbar row navbar-expand-lg px-5" style={{marginRight:'1px'}}>
        <Link to={'/'} className="col-md-3 col-2">
          <div className="logo-div ">
            <img src={logo} className="w-100" alt="" />
          </div>
        </Link>

        <button
          class="navbar-toggler"
          style={{ width: "70px" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-content offset-md-1 col-md-8">
          <div class="collapse navbar-collapse mx-auto" id="navbarNav">
            <ul class="navbar-nav w-100 justify-content-around align-items-center menu align-center expanded text-center SMN_effect-63">
              <li class="nav-item">
                <Link to={'/'} class="nav-link active" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <Link to={'/contactus'} class="nav-link">
                  ContactUs
                </Link>
              </li>
              <li class="nav-item btn btn-outline-primary">Register</li>
            </ul>
          </div>
        </div>
      </header> */}
      {/* <div className="links">
            <ul className="menu align-center expanded text-center SMN_effect-63" type='none'>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Courses</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Support</a></li>
            </ul>
        </div> */}
      {/* <div className="btn-register">
          <button className="btn btn-outline-primary">Register</button>
        </div> */}

      {/* <div style={{height:'150px'}}></div> */}
    </>
  );
};

export default Header;
