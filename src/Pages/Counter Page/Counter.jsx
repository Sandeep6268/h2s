import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaYoutube, FaUserGraduate, FaBriefcase } from "react-icons/fa";
import "./Counter.css"; // We'll create this CSS file

const Counter = () => {
  const sectionRef = useRef(null);
  const countersAnimated = useRef(false);

  useEffect(() => {
    const animateCounters = () => {
      if (countersAnimated.current) return;
      countersAnimated.current = true;

      const counters = document.querySelectorAll(".counter");
      const speed = 300; // Increased duration for slower animation

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText.replace(/,/g, "");
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString();
            setTimeout(updateCount, 15); // Slightly slower interval
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          } else {
            // Reset counters when leaving view
            const counters = document.querySelectorAll(".counter");
            counters.forEach((counter) => {
              counter.innerText = "0";
            });
            countersAnimated.current = false;
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div data-bs-theme="dark" className="mt-5 py-5">
      <section
        className="stats-section py-6 position-relative overflow-hidden "
        ref={sectionRef}
      >
        <div className="stats-bg-overlay position-absolute w-100 h-100"></div>
        <Container className="py-5">
          <div className="text-center mb-5 py-5 position-relative z-index-1">
            <h1 className="display-4 fw-bold mb-3 text-primary">
              Trusted by <span className="text-white">Learners</span>, Followed
              by <span className="text-white">Thousands</span>.
            </h1>
            <p className="fs-4 text-light opacity-75">
              Real numbers,{" "}
              <span className="text-primary fw-bold">Real results</span>.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            <Col md={4}>
              <div className="stat-box h-100 p-4 rounded-4 shadow-lg">
                <div className="stat-icon mb-3">
                  <FaYoutube className="display-4 text-danger" />
                </div>
                <div className="stat-number display-4 fw-bold mb-2 text-primary">
                  <span className="counter" data-target="100000">
                    0
                  </span>
                  +
                </div>
                <div className="stat-text fs-5 text-light">
                  YouTube Subscribers
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="stat-box h-100 p-4 rounded-4 shadow-lg">
                <div className="stat-icon mb-3">
                  <FaUserGraduate className="display-4 text-primary" />
                </div>
                <div className="stat-number display-4 fw-bold mb-2 text-primary">
                  <span className="counter" data-target="10000">
                    0
                  </span>
                  +
                </div>
                <div className="stat-text fs-5 text-light">
                  Interns Trained via H2S Skills Academy
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="stat-box h-100 p-4 rounded-4 shadow-lg">
                <div className="stat-icon mb-3">
                  <FaBriefcase className="display-4 text-primary" />
                </div>
                <div className="stat-number display-4 fw-bold mb-2 text-primary">
                  <span className="counter" data-target="8500">
                    0
                  </span>
                  +
                </div>
                <div className="stat-text fs-5 text-light">
                  Students got helped to get jobs/placed after Our Programs.
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Counter;
