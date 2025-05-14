import React from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";

const InternshipPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "HTML & CSS",
      emoji: "🧱",
      subtitle: "Start from scratch!",
      description:
        "Learn how to build clean and responsive websites using the foundation of web development — HTML & CSS. Perfect for absolute beginners.",
    },
    {
      id: 2,
      title: "HTML, CSS & JavaScript",
      emoji: "🌐",
      subtitle: "Bring your websites to life!",
      description:
        "This course teaches you how to make websites interactive with JavaScript, along with solid HTML & CSS fundamentals.",
    },
    {
      id: 3,
      title: "React JS",
      emoji: "⚛",
      subtitle: "Build powerful frontend apps!",
      description:
        "Master component-based architecture, routing, and state management using React — the most in-demand frontend framework today.",
    },
    {
      id: 4,
      title: "Python",
      emoji: "🐍",
      subtitle: "Code smart, not hard!",
      description:
        "Learn Python from basics to core concepts — perfect for automation, scripting, and kickstarting your coding journey.",
    },
    {
      id: 5,
      title: "Django + Python",
      emoji: "🚀",
      subtitle: "Backend development made easy!",
      description:
        "Combine the power of Python with Django to build scalable, secure, and fast web applications with real-world project exposure.",
    },
    {
      id: 6,
      title: "React JS + JavaScript",
      emoji: "💡",
      subtitle: "Frontend mastery package!",
      description:
        "Go from JS fundamentals to full React development — build dynamic, responsive apps and boost your frontend career path.",
    },
  ];

  return (
    <>
      <Header />
      <div data-bs-theme="dark" style={{ marginTop: "115px" }}>
        <Container className="py-5">
          <h1 className="text-center mb-5 fw-bold">Internship Programs</h1>

          <Row xs={1} md={2} lg={3} className="g-4">
            {programs.map((program) => (
              <Col key={program.id}>
                <Card className="h-100 border-primary bg-dark text-white shadow-lg internship-card">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <span className="display-4 me-3">{program.emoji}</span>
                      <div>
                        <Card.Title className="fw-bold mb-0">
                          {program.title}
                        </Card.Title>
                        <Card.Subtitle className="text-muted">
                          {program.subtitle}
                        </Card.Subtitle>
                      </div>
                    </div>
                    <Card.Text className="flex-grow-1">
                      {program.description}
                    </Card.Text>
                    <div className="mt-auto pt-3">
                      <Button
                        variant="outline-primary"
                        className="w-100 internship-btn"
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />

      <style jsx>{`
        .internship-card {
          transition: all 0.3s ease;
          transform: translateY(0);
          border-width: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .internship-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(13, 110, 253, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .internship-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(13, 110, 253, 0.3) !important;
          border-color: rgba(13, 110, 253, 0.5) !important;
        }

        .internship-card:hover::before {
          left: 100%;
        }

        .internship-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .internship-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: rgba(13, 110, 253, 0.2);
          transition: all 0.3s ease;
          z-index: -1;
        }

        .internship-btn:hover::before {
          width: 100%;
        }

        .internship-card:hover .internship-btn {
          background-color: rgba(13, 110, 253, 0.1);
          border-color: rgba(13, 110, 253, 0.8);
          color: white;
        }
      `}</style>
    </>
  );
};

export default InternshipPrograms;
