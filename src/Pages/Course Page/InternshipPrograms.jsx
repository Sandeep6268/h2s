import React from 'react';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';

const InternshipPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "HTML & CSS",
      emoji: "🧱",
      subtitle: "Start from scratch!",
      description: "Learn how to build clean and responsive websites using the foundation of web development — HTML & CSS. Perfect for absolute beginners."
    },
    {
      id: 2,
      title: "HTML, CSS & JavaScript",
      emoji: "🌐",
      subtitle: "Bring your websites to life!",
      description: "This course teaches you how to make websites interactive with JavaScript, along with solid HTML & CSS fundamentals."
    },
    {
      id: 3,
      title: "React JS",
      emoji: "⚛",
      subtitle: "Build powerful frontend apps!",
      description: "Master component-based architecture, routing, and state management using React — the most in-demand frontend framework today."
    },
    {
      id: 4,
      title: "Python",
      emoji: "🐍",
      subtitle: "Code smart, not hard!",
      description: "Learn Python from basics to core concepts — perfect for automation, scripting, and kickstarting your coding journey."
    },
    {
      id: 5,
      title: "Django + Python",
      emoji: "🚀",
      subtitle: "Backend development made easy!",
      description: "Combine the power of Python with Django to build scalable, secure, and fast web applications with real-world project exposure."
    },
    {
      id: 6,
      title: "React JS + JavaScript",
      emoji: "💡",
      subtitle: "Frontend mastery package!",
      description: "Go from JS fundamentals to full React development — build dynamic, responsive apps and boost your frontend career path."
    }
  ];

  return (
    <>
    <Header/>
    <div data-bs-theme='dark' style={{marginTop:'115px'}}>
      <Container className="py-5">
        <h1 className="text-center mb-5 fw-bold">Internship Programs</h1>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {programs.map((program) => (
            <Col key={program.id}>
              <Card className="h-100 border-primary bg-dark text-white shadow-lg">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <span className="display-4 me-3">{program.emoji}</span>
                    <div>
                      <Card.Title className="fw-bold mb-0">{program.title}</Card.Title>
                      <Card.Subtitle className="text-muted">{program.subtitle}</Card.Subtitle>
                    </div>
                  </div>
                  <Card.Text className="flex-grow-1">{program.description}</Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        
      </Container>
    </div>
    <Footer/>
    </>
  );
};

export default InternshipPrograms;