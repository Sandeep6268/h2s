import React from "react";
import "./Hero.css";
import heroimg from "../../images/banner left img.png";

const Hero = () => {
  return (
    <>
      <section className="banner container-fluid d-sm-none d-md-block">
        <h1 className="text-center py-3">CODE | <span className="text-primary">CREATE</span> | CONQUER</h1>
        <div className="hero-container row w-100 p-2 py-md-5">
          <div className=" col-md-3 offset-md-1">
            <img src={heroimg} className="w-100" alt="" />
          </div>
          <div className=" col-md-5  offset-md-1">
            <h2>
              We deliver smart tech solutions tailored for modern businesses.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
