import React, { useContext } from "react";
import "./CoursePage.css";
import { Context } from "../../../Context";
import banner2 from "../../../images/banner2.jpeg";
import htmlcss from "../../../images/htmlcss.jpg";
import htmlcssjs from "../../../images/htmlcssjs.jpg";
import python from "../../../images/python.jpg";
import django from "../../../images/django.jpg";
import reactimg from "../../../images/react.jpg";
import reactandjs from "../../../images/reactandjs.jpg";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const { user } = useContext(Context);
  const { handlePayment } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <div className="course-section">
        <div className="heading">
          <h5 className="text-center w-100">COURSES</h5>
          <h1 className="text-center w-100">BECOME SKILLED AT WHAT MATTERS</h1>
        </div>
        <div className="course-component text-dark d-flex align-items-center">
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex justify-content-around"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
            >
              <img
                src={htmlcss}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div className="comp-heading col-md-7 ps-md-5">
              <h1>HTML & CSS Internship</h1>
              <p className="p-3">
                🎓 Certified Internship from H2S Tech Solutions <br />
                🛠️ Hands-on Projects to build real-world websites <br />
                📚 Beginner Friendly – no prior coding required <br />
                ⏱️ Flexible Duration – learn at your own pace <br />
                💼 Portfolio Ready designs to showcase your skills
              </p>
              <div className="paybtn m-3 d-flex center-below-md ">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(49, "/htmlcss89");
                    }
                  }}
                >
                  Pay ₹49
                </button>
              </div>
            </div>
          </div>
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column justify-content-around"
          >
            <div className="comp-heading col-md-7">
              <h1>HTML, CSS & JavaScript Internship</h1>
              <p className="p-3">
                🎓 Verified Certificate from a registered IT firm <br />
                💡 Interactive Projects using real-time JavaScript <br /> 🧠
                Logic Building focus with core JS concepts <br /> 📈 Career
                Boost with frontend dev skills <br /> 💻 GitHub Integration to
                showcase your code
              </p>
              <div className="paybtn m-3 center-below-md d-flex">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(99, "/htmlcssjs62");
                    }
                  }}
                >
                  Pay ₹99
                </button>
              </div>
            </div>
            <div
              className="comp-img p-0 col-md-5 "
              style={{ marginBlock: "30px" }}
            >
              <img
                src={htmlcssjs}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
          </div>
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex  justify-content-around"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
            >
              <img
                src={python}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div className="comp-heading col-md-7 ps-md-5">
              <h1>Python Internship</h1>
              <p className="p-3">
                🎓 Industry-recognized Certificate by H2S Tech Solutions <br />
                ⚙️ Core to Advanced Concepts – variables to OOP <br />
                🧪 Mini Projects for real-world coding experience <br />
                📊 Data Handling & Logic Building focused <br />
                🔄 Version Control (Git) usage in projects
              </p>
              <div className="paybtn m-3 center-below-md d-flex ">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(129, "/python24");
                    }
                  }}
                >
                  Pay ₹129
                </button>
              </div>
            </div>
          </div>
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column justify-content-around"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
            >
              <img
                src={reactimg}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div className="comp-heading col-md-7 ps-md-5">
              <h1>React JS Internship</h1>
              <p className="p-3">
                🎓 Company-verified Certificate from H2S Tech Solutions <br />
                ⚛️ Component-based Projects using real React code <br />
                🔄 API Integration with real-time data <br />
                🧠 State Management using Hooks & Context <br />
                🌐 Deployable Web Apps hosted on GitHub/Netlify
              </p>
              <div className="paybtn m-3 center-below-md d-flex">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(149, "/react79");
                    }
                  }}
                >
                  Pay ₹149
                </button>
              </div>
            </div>
          </div>
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex  justify-content-around"
          >
            <div className="comp-heading col-md-7 ">
              <h1>Django + Python Internship</h1>
              <p className="p-3">
                🎓 Backend Developer Certificate by H2S Tech Solutions <br />
                🛠️ Real Web Apps using Django Framework <br />
                🧠 Python Logic + Django MVC architecture <br />
                🗂️ Database Integration with SQLite & PostgreSQL
                <br />
                🌐 Live Project Deployment & GitHub showcase
              </p>
              <div className="paybtn center-below-md m-3 d-flex">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(179, "/pythondjango90");
                    }
                  }}
                >
                  Pay ₹179
                </button>
              </div>
            </div>
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
            >
              <img
                src={django}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
          </div>

          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column justify-content-around"
          >
            <div className="comp-heading col-md-7">
              <h1>React JS + JavaScript Internship</h1>
              <p className="p-3">
                🎓 Dual-Skill Certification by H2S Tech Solutions <br />
                💡 JavaScript Logic + React UI – complete frontend stack <br />
                🔗 Real APIs & Live Projects with deployment <br />
                ⚙️ Modern Tools – ES6, Hooks, JSX & more <br />
                📁 Professional GitHub Portfolio for job readiness
              </p>
              <div className="paybtn m-3 center-below-md d-flex">
                <button
                  className="button-85"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      handlePayment(199, "/reactandjs43");
                    }
                  }}
                >
                  Pay ₹199
                </button>
              </div>
            </div>
            <div
              className="comp-img p-0 col-md-5 "
              style={{ marginBlock: "30px" }}
            >
              <img
                src={reactandjs}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
