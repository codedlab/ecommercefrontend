import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div
      className=" carousel slide p-5 mb-4 bg-light rounded-3"
      data-bs-ride="carousel"
    >
      <div className="container-fluid py-5">
        <div className="carousel-inner">
          <div className=" carousel-item active"></div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Layout;
