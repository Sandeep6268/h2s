import React from "react";
import "./About.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";

const About = () => {
  return (
    <>
    <Header/>
      <section class="hero">
        <div class="container text-white">
          <h1 class="display-4 fw-bold">About H2S Tech Solutions</h1>
          <p class="lead mt-3">
            Crafting cutting-edge web solutions and empowering through tech
            training.
          </p>
          <a href="#values" class="btn btn-outline-light btn-lg mt-4">
            Our Values
          </a>
        </div>
      </section>

      <section class="py-5">
        <div class="container">
          <div class="row align-items-center gy-4">
            <div class="col-lg-6">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Team collaborating"
                class="img-fluid rounded shadow"
              />
            </div>
            <div class="col-lg-6">
              <h2 class="fw-bold text-light">Who We Are</h2>
              <p>
                Since 2019, <strong>H2S Tech Solutions</strong> has been at the
                forefront of web development and technical education. What
                started as a local MP startup has grown into a global
                consultancy and training academy.
              </p>
              <p>
                We believe in hands-on learning and bespoke development,
                ensuring every client and student walks away with real,
                measurable results.
              </p>
              <div class="row mt-4 gx-3">
                <div class="col-md-6">
                  <div class="icon-box h-100 shadow-sm">
                    <i class="bi bi-laptop-fill display-4 mb-3 text-primary"></i>
                    <h5>Web Development</h5>
                    <p>High-performance, responsive websites & web apps.</p>
                  </div>
                </div>
                <div class="col-md-6 mt-4 mt-md-0">
                  <div class="icon-box h-100 shadow-sm">
                    <i class="bi bi-code-slash display-4 mb-3 text-primary"></i>
                    <h5>Tech Training</h5>
                    <p>
                      Interactive courses: HTML, CSS, JavaScript, React & more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5 bg-black">
        <div class="container">
          <h3 class="fw-bold text-light mb-4">Our Work in Action</h3>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <img
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
                alt="Project 1"
                class="grid-img shadow"
              />
            </div>
            <div class="col-md-6 col-lg-3">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                alt="Project 2"
                class="grid-img shadow"
              />
            </div>
            <div class="col-md-6 col-lg-3">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                alt="Project 3"
                class="grid-img shadow"
              />
            </div>
            <div class="col-md-6 col-lg-3">
              <img
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
                alt="Project 4"
                class="grid-img shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="values" class="py-5">
        <div class="container text-center">
          <h2 class="fw-bold mb-4 text-light">Our Core Values</h2>
          <div class="row gx-4 gy-4">
            <div class="col-md-4">
              <div class="icon-box shadow-sm h-100">
                <i class="bi bi-lightbulb-fill display-4 mb-3 text-primary"></i>
                <h5>Innovation</h5>
                <p>
                  Staying ahead with the latest technologies and creative ideas.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box shadow-sm h-100">
                <i class="bi bi-people-fill display-4 mb-3 text-primary"></i>
                <h5>Collaboration</h5>
                <p>
                  Partnering closely with clients & students for shared success.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box shadow-sm h-100">
                <i class="bi bi-award-fill display-4 mb-3 text-primary"></i>
                <h5>Excellence</h5>
                <p>Delivering top-tier quality in every project and course.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
