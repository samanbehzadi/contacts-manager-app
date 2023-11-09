import React from "react";
import "./FooterItem.css";

export default function FooterItem({ footerTitle, children }) {
  return (
    <div className="col-md-4 col-sm-12 mt-5">
      <div className="footer-widgets__item">
        <span className="footer-widgets__title"> {footerTitle} </span>
        <p className="footer-widgets__text"> {children} </p>
      </div>
    </div>
  );
}
