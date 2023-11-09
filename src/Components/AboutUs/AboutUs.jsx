import React from "react";
import "./AboutUs.css";

export default function AboutUsBox({ boxTitle, BoxText, icon }) {
  return (
    <div className="col-sm-12 col-lg-6">
      <div className="about-us__box">
        <div className="about-us__box-right mx-3">
          <i className={`${icon} `}></i>
        </div>
        <div className="about-us__box-left">
          <span className="about-us__box-title">{boxTitle}</span>
          <span className="about-us__box-text">{BoxText}</span>
        </div>
      </div>
    </div>
  );
}