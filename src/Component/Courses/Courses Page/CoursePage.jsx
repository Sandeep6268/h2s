import React, { useContext } from "react";
import "./CoursePage.css";
import { Context } from "../../../Context";
import htmlcss from "../../../images/htmlcss.jpg";
import htmlcssjs from "../../../images/htmlcssjs.jpg";
import python from "../../../images/python.jpg";
import django from "../../../images/django.jpg";
import reactimg from "../../../images/react.jpg";
import reactandjs from "../../../images/reactandjs.jpg";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const { user, handlePayment } = useContext(Context);
  const navigate = useNavigate();

  const courses = [
    {
      title: "HTML & CSS Internship",
      img: htmlcss,
      description: (
        <>
          🎓 Certified Internship from H2S Tech Solutions <br />
          🛠️ Hands-on Projects to build real-world websites <br />
          📚 Beginner Friendly – no prior coding required <br />
          ⏱️ Flexible Duration – learn at your own pace <br />
          💼 Portfolio Ready designs to showcase your skills
        </>
      ),
      price: 49,
      path: "/htmlcss89",
      reverse: false,
    },
    {
      title: "HTML, CSS & JavaScript Internship",
      img: htmlcssjs,
      description: (
        <>
          🎓 Verified Certificate from a registered IT firm <br />
          💡 Interactive Projects using real-time JavaScript <br />
          🧠 Logic Building focus with core JS concepts <br />
          📈 Career Boost with frontend dev skills <br />
          💻 GitHub Integration to showcase your code
        </>
      ),
      price: 99,
      path: "/htmlcssjs62",
      reverse: true,
    },
    {
      title: "Python Internship",
      img: python,
      description: (
        <>
          🎓 Industry-recognized Certificate by H2S Tech Solutions <br />
          ⚙️ Core to Advanced Concepts – variables to OOP <br />
          🧪 Mini Projects for real-world coding experience <br />
          📊 Data Handling & Logic Building focused <br />
          🔄 Version Control (Git) usage in projects
        </>
      ),
      price: 129,
      path: "/python24",
      reverse: false,
    },
    {
      title: "Django + Python Internship",
      img: django,
      description: (
        <>
          🎓 Backend Developer Certificate by H2S Tech Solutions <br />
          🛠️ Real Web Apps using Django Framework <br />
          🧠 Python Logic + Django MVC architecture <br />
          🗂️ Database Integration with SQLite & PostgreSQL <br />
          🌐 Live Project Deployment & GitHub showcase
        </>
      ),
      price: 179,
      path: "/pythondjango90",
      reverse: true,
    },
    {
      title: "React JS Internship",
      img: reactimg,
      description: (
        <>
          🎓 Company-verified Certificate from H2S Tech Solutions <br />
          ⚛️ Component-based Projects using real React code <br />
          🔄 API Integration with real-time data <br />
          🧠 State Management using Hooks & Context <br />
          🌐 Deployable Web Apps hosted on GitHub/Netlify
        </>
      ),
      price: 149,
      path: "/react79",
      reverse: false,
    },
    {
      title: "React JS + JavaScript Internship",
      img: reactandjs,
      description: (
        <>
          🎓 Dual-Skill Certification by H2S Tech Solutions <br />
          💡 JavaScript Logic + React UI – complete frontend stack <br />
          🔗 Real APIs & Live Projects with deployment <br />
          ⚙️ Modern Tools – ES6, Hooks, JSX & more <br />
          📁 Professional GitHub Portfolio for job readiness
        </>
      ),
      price: 199,
      path: "/reactandjs43",
      reverse: true,
    },
  ];

  return (
    <div className="course-section">
      <div className="heading">
        <h5 className="text-center w-100">COURSES</h5>
        <h1 className="text-center w-100">BECOME SKILLED AT WHAT MATTERS</h1>
      </div>

      <div className="course-component text-dark d-flex align-items-center flex-column">
        {courses.map((course, index) => (
          <div
            key={index}
            style={{ width: "98%" }}
            className={`comp button-85 row my-3 p-md-5 d-flex justify-content-around ${
              course.reverse ? "reverse-column" : ""
            }`}
          >
            {!course.reverse && (
              <div
                className="comp-img p-0 col-md-5"
                style={{ marginBlock: "30px" }}
              >
                <img
                  src={course.img}
                  className="w-100 com-img-height"
                  style={{ height: "370px" }}
                  alt={course.title}
                />
              </div>
            )}
            <div className="comp-heading col-md-7 ps-md-5">
              <h1>{course.title}</h1>
              <p className="p-3">{course.description}</p>
              <div className="paybtn m-3 center-below-md d-flex">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(course.price, course.path);
                    }
                  }}
                >
                  Pay ₹{course.price}
                </button>
              </div>
            </div>
            {course.reverse && (
              <div
                className="comp-img p-0 col-md-5"
                style={{ marginBlock: "30px" }}
              >
                <img
                  src={course.img}
                  className="w-100 com-img-height"
                  style={{ height: "370px" }}
                  alt={course.title}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
