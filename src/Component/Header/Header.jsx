import React from "react";
import "./Header.css";
import logo from "../../images/logo-removebg-preview.png";

const Header = () => {
  return (
    <>
      <header className="p-3 px-5">
        <div className="logo-div">
            <img src={logo} className="w-100" alt="" />
        </div>
        <div className="links">
            <ul className="" type='none'>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Courses</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Support</a></li>
            </ul>
        </div>
        <div className="btn-register">
            <button className="btn btn-outline-primary">Register</button>
        </div>
      </header>
      {/* <div style={{height:'150px'}}></div> */}
    </>
  );
};

export default Header;
