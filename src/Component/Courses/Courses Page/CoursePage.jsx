import React, { useContext } from "react";
import "./CoursePage.css";
import { Context } from "../../../Context";

const CoursePage = () => {
  const { handlePayment } = useContext(Context);
  return (
    <>
      <div className="course-section m-5">
        <div className="heading">
          <h5 className="text-center">COURSES</h5>
          <h1 className="text-center">BECOME SKILLED AT WHAT MATTERS</h1>
        </div>
        <div className="course-component text-dark">
          <div className="comp d-flex">
            <div className="comp-heading">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img m-4 w-50">
              <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(29,'/htmlcssjs62')}
                >
                  Pay 29
                </button>
              </div>
            </div>
          </div>
          <div className="comp d-flex flex-row-reverse">
            <div className="comp-heading">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img m-4 w-50">
              <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(144,'/python24')}
                >
                  Pay 144
                </button>
              </div>
            </div>
          </div>
          <div className="comp d-flex">
            <div className="comp-heading">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img m-4 w-50">
              <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(129,'/pythondjango90')}
                >
                  Pay 129
                </button>
              </div>
            </div>
          </div>
          <div className="comp d-flex flex-row-reverse">
            <div className="comp-heading">
              <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
            <div className="comp-img m-4 w-50">
              <div className="paybtn d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment(499,'/react79') }
                >
                  Pay 499
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
