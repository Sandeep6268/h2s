import React from "react";
import "./Hero.css";
import heroimg from "../../images/banner left img.png";
import video from "../../images/video.mp4";
const Hero = () => {
  return (
    <>
      <section
        className="container d-sm-block d-md-none"
        style={{ marginTop: "115px" }}
      >
        <video src={video} className="w-100" autoPlay loop muted></video>
      </section>
      <section
        className="banner container-fluid d-sm-none d-md-block"
        style={{ marginTop: "115px" }}
      >
        <h1 className="text-center py-3" data-aos="zoom-in">
          CODE | <span className="text-primary">CREATE</span> | CONQUER
        </h1>
        <div className="hero-container row w-100 p-2 py-md-5">
          <div className=" col-md-3 offset-md-1" data-aos="fade-up">
            <img src={heroimg} className="w-100" alt="" />
          </div>
          <div className=" col-md-5  offset-md-1" data-aos="fade-down">
            <h2 className="font-change">
              We’re not just coders – we’re creators. H2S Tech delivers smart,
              scalable, and future-ready tech solutions.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
