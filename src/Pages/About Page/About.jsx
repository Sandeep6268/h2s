import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLaptopCode, FaCode, FaLightbulb, FaUsers, FaAward } from 'react-icons/fa';
import './About.css'; // We'll create this CSS file
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import Counter from '../Counter Page/Counter';

const About = () => {
  return (
    <>
    <Header/>
    <div data-bs-theme="dark" style={{marginTop:'115px'}}>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-overlay position-absolute w-100 h-100"></div>
        <Container className="position-relative z-index-1 py-6 text-center mt-5">
          <h1 className="display-3 fw-bold mb-4 text-white">
            About <span className="text-primary">H2S Tech Solutions</span>
          </h1>
          <p className="lead fs-4 mb-5 text-light opacity-75">
            Crafting cutting-edge web solutions and empowering through tech education
          </p>
          <Button 
            href="#values" 
            variant="outline-light" 
            size="lg"
            className="px-4 py-2 fw-bold"
          >
            Our Values
            <i className="bi bi-arrow-down ms-2"></i>
          </Button>
        </Container>
      </section>

      {/* Intro + Features */}
      <section className="py-6 mt-5">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6} className="pe-lg-5">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Team collaborating"
                  className="img-fluid rounded-4 zoom-hover"
                />
                <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark-up"></div>
              </div>
            </Col>
            <Col lg={6} className="ps-lg-5">
              <h2 className="fw-bold mb-4 text-white">
                Who <span className="text-primary">We Are</span>
              </h2>
              <p className="fs-5 mb-4 text-light opacity-75">
                Since 2019, <strong className="text-primary">H2S Tech Solutions</strong> has been at the
                forefront of web development and technical education. What started
                as a local startup has grown into a global consultancy and
                training academy.
              </p>
              <p className="fs-5 mb-5 text-light opacity-75">
                We believe in hands-on learning and bespoke development, ensuring
                every client and student walks away with real, measurable results.
              </p>
              <Row className="g-4">
                <Col md={6}>
                  <div className="feature-card h-100 p-4 rounded-4 shadow-sm">
                    <FaLaptopCode className="display-4 mb-3 text-primary" />
                    <h5 className="fw-bold mb-3">Web Development</h5>
                    <p className="mb-0 text-light opacity-75">
                      High-performance, responsive websites & web apps.
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="feature-card h-100 p-4 rounded-4 shadow-sm">
                    <FaCode className="display-4 mb-3 text-primary" />
                    <h5 className="fw-bold mb-3">Tech Training</h5>
                    <p className="mb-0 text-light opacity-75">
                      Interactive courses: HTML, CSS, JavaScript, React & more.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <Counter/>

      {/* Portfolio Grid */}
      <section className="py-5 bg-dark-gradient mt-5">
        <Container>
          <h3 className="fw-bold mb-5 text-center text-white">
            Our <span className="text-primary">Work</span> in Action
          </h3>
          <Row className="g-4">
            {[
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ].map((img, index) => (
              <Col key={index} md={6} lg={3}>
                <div className="portfolio-item rounded-4 overflow-hidden shadow-lg position-relative">
                  <img
                    src={img}
                    alt={`Project ${index + 1}`}
                    className="img-fluid w-100 zoom-hover"
                  />
                  <div className="portfolio-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    {/* <Button variant="outline-light" size="sm">
                      View Project
                    </Button> */}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Core Values */}
      <section id="values" className="py-6 mt-5">
        <Container>
          <h2 className="fw-bold mb-5 text-center text-white">
            Our <span className="text-primary">Core</span> Values
          </h2>
          <Row className="g-4">
            {[
              {
                icon: <FaLightbulb className="display-4 mb-3 text-primary" />,
                title: "Innovation",
                desc: "Staying ahead with the latest technologies and creative ideas."
              },
              {
                icon: <FaUsers className="display-4 mb-3 text-primary" />,
                title: "Collaboration",
                desc: "Partnering closely with clients & students for shared success."
              },
              {
                icon: <FaAward className="display-4 mb-3 text-primary" />,
                title: "Excellence",
                desc: "Delivering top-tier quality in every project and course."
              }
            ].map((value, index) => (
              <Col key={index} md={4}>
                <div className="value-card h-100 p-5 rounded-4 shadow-sm text-center">
                  {value.icon}
                  <h4 className="fw-bold mb-3">{value.title}</h4>
                  <p className="mb-0 text-light opacity-75">{value.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-6 bg-dark-gradient-2 mt-5">
        <Container className="text-center">
          <h3 className="fw-bold mb-4 text-white">
            Ready to <span className="text-primary">Level Up</span>?
          </h3>
          <p className="fs-5 mb-5 text-light opacity-75 mx-auto" style={{maxWidth: "600px"}}>
            Whether you need a custom web solution or want to enhance your tech skills,
            we're here to help you succeed.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Button 
              href="https://h2stechsolutions.netlify.app/contactus" 
              variant="primary" 
              size="lg"
              className="px-4 py-2 fw-bold"
            >
              Get in Touch
            </Button>
            <Button 
              href="https://h2stechsolutions.netlify.app/course" 
              variant="outline-light" 
              size="lg"
              className="px-4 py-2 fw-bold"
            >
              Explore Courses
            </Button>
          </div>
        </Container>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;