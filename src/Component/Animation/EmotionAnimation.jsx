// src/components/EmotionAnimation/EmotionAnimation.js
import React from "react";
import "./EmotionAnimation.css"; 

const EmotionAnimation = ({ type }) => {
  return (
    <div id={`${type}-box`}>
      <div className={`face${type === "error" ? "2" : ""}`}>
        <div className="eye"></div>
        <div className="eye right"></div>
        <div className={`mouth ${type === "success" ? "happy" : "sad"}`}></div>
      </div>
      <div className={`shadow ${type === "success" ? "scale" : "move"}`}></div>
    </div>
  );
};

export default EmotionAnimation;