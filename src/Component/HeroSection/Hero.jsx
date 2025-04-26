import React from "react";
import "./Hero.css";
import heroimg from "../../images/banner left img.png";

const Hero = () => {
  return (
    <>
      <section className="banner">
        <h1 className="text-center">CODE | CREATE | CONQUER</h1>
        <div className="hero-container p-2">
          <div className="heroimg">
            <img src={heroimg} className="w-100" alt="" />
          </div>
          <div className="hero-content">
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
