import React, { useContext, useEffect, useState } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";
import { FindUser } from "../../../api";

const CoursePage = () => {
  const { user, handlePayment, paymentState, setPaymentState } =
    useContext(Context);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out-quad",
      once: true,
      mirror: false,
    });
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("access");
        if (token && user) {
          const response = await FindUser.get("/my-courses/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEnrolledCourses(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [user]);

  const initiatePayment = async (price, courseUrl) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if already enrolled
    if (enrolledCourses.some((course) => course.course_url === courseUrl)) {
      alert("You've already purchased this course!");
      return;
    }

    const result = await handlePayment(price, courseUrl);

    setPaymentState({
      processing: false,
      showModal: true,
      success: result.success,
      message: result.success
        ? "Payment successful! Redirecting..."
        : result.error || "Payment failed",
    });

    if (result.success) {
      // Refresh courses after successful payment
      const response = await FindUser.get("/my-courses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setEnrolledCourses(response.data);

      // Redirect after delay
      setTimeout(() => {
        window.location.href = `${result.redirectUrl}?payment_id=${result.paymentId}`;
      }, 1500);
    }
  };

  // Check if course is enrolled
  const isEnrolled = (courseUrl) => {
    return enrolledCourses.some((course) => course.course_url === courseUrl);
  };

  return (
    <>
      <div className="course-section">
        <div className="heading" data-aos="fade-down" data-aos-delay="100">
          <h5 className="text-center w-100">COURSES</h5>
          <h1 className="text-center w-100">BECOME SKILLED AT WHAT MATTERS</h1>
        </div>
        <div className="course-component text-dark d-flex align-items-center">
          {/* Course 1 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex justify-content-around"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src={htmlcss}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div
              className="comp-heading col-md-7 ps-md-5"
              data-aos="fade-up"
              data-aos-delay="250"
            >
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
                  onClick={() => initiatePayment(1, "/htmlcssjs62")}
                  disabled={
                    paymentState.processing || isEnrolled("/htmlcssjs62")
                  }
                >
                  {isEnrolled("/htmlcssjs62")
                    ? "Already Enrolled"
                    : paymentState.processing
                    ? "Processing..."
                    : "Pay ₹99"}
                </button>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column justify-content-around"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              className="comp-heading col-md-7"
              data-aos="fade-right"
              data-aos-delay="250"
            >
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
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src={htmlcssjs}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
          </div>

          {/* Course 3 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex justify-content-around"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src={python}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div
              className="comp-heading col-md-7 ps-md-5"
              data-aos="fade-up"
              data-aos-delay="350"
            >
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

          {/* Course 4 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex flex-row-reverse justify-content-around"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
              data-aos="zoom-in"
              data-aos-delay="350"
            >
              <img
                src={reactimg}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
            <div
              className="comp-heading col-md-7 ps-md-5"
              data-aos="fade-right"
              data-aos-delay="400"
            >
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
                      handlePayment(2, "/react79");
                    }
                  }}
                >
                  Pay ₹2
                </button>
              </div>
            </div>
          </div>

          {/* Course 5 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column flex-row-reverse justify-content-around"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <div
              className="comp-heading col-md-7 ps-md-5"
              data-aos="fade-up"
              data-aos-delay="400"
            >
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
              data-aos="zoom-in"
              data-aos-delay="450"
            >
              <img
                src={django}
                className="w-100 com-img-height"
                style={{ height: "370px" }}
                alt=""
              />
            </div>
          </div>

          {/* Course 6 */}
          <div
            style={{ width: "98%" }}
            className="comp button-85 row my-3 p-md-5 d-flex reverse-column justify-content-around"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div
              className="comp-heading col-md-7"
              data-aos="fade-right"
              data-aos-delay="450"
            >
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
              className="comp-img p-0 col-md-5"
              style={{ marginBlock: "30px" }}
              data-aos="zoom-in"
              data-aos-delay="500"
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
