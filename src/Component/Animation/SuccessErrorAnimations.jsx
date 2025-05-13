import React from 'react';
import './SuccessErrorAnimations.css'; // You'll need to create this CSS file or use inline styles

const SuccessErrorAnimations = () => {
  return (
    <div>
      {/* Success Animation */}
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

      {/* Error Animation */}
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
    </div>
  );
};

export default SuccessErrorAnimations;