import React from 'react';
import './SuccessErrorAnimations.css'; // Create this CSS file

const EmotionAnimation = ({ type }) => {
  return (
    <>
      {type === "success" ? (
        <div id="success-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth happy"></div>
          </div>
          <div className="shadow scale"></div>
        </div>
      ) : (
        <div id="error-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="shadow move"></div>
        </div>
      )}
    </>
  );
};

export default EmotionAnimation;