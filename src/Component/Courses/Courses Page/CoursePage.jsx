import React, { useContext } from "react";
import "./CoursePage.css";
import { Context } from "../../../Context";
import banner2 from "../../../images/banner2.jpeg";

const CoursePage = () => {
  const { handlePayment } = useContext(Context);
  return (
    <>
      <div className="course-section">
        <div className="heading">
          <h5 className="text-center w-100">COURSES</h5>
          <h1 className="text-center w-100">BECOME SKILLED AT WHAT MATTERS</h1>
        </div>
        <div className="course-component text-dark">
          <div className="comp row w-100 d-flex">
            <div className="comp-heading col-md-7">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img p-0 col-md-5 ">
              <img
                src={banner2}
                className="w-100"
                style={{ height: "300px" }}
                alt=""
              />
              {/* <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(29,'/htmlcssjs62')}
                >
                  Pay 29
                </button>
              </div> */}
            </div>
          </div>
          <div className="comp row w-100">
            <div className="comp-img p-0 col-md-5">
              <img
                src={banner2}
                className="w-100"
                style={{ height: "300px" }}
                alt=""
              />
              {/* <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(144,'/python24')}
                >
                  Pay 144
                </button>
              </div> */}
            </div>
            <div className="comp-heading col-md-7">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
          </div>
          <div className="comp row w-100 d-flex">
            <div className="comp-heading col-md-7">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img p-0 col-md-5">
              <img
                src={banner2}
                className="w-100"
                style={{ height: "300px" }}
                alt=""
              />
              {/* <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(129, "/pythondjango90")}
                >
                  Pay 129
                </button>
              </div> */}
            </div>
          </div>
          <div className="comp row w-100 ">
            <div className="comp-img p-0 col-md-5">
              <img
                src={banner2}
                className="w-100"
                style={{ height: "300px" }}
                alt=""
              />
              {/* <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(499, "/react79")}
                >
                  Pay 499
                </button>
              </div> */}
            </div>
            <div className="comp-heading col-md-7">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
