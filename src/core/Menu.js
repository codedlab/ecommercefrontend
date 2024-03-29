import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-xl">
        <a className="navbar-brand" href="#">
          Say E-Shop
        </a>
        <button
          className="navbar-toggler collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse justify-content-end"
          id="navbarCollapse"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                Cart{" "}
              </Link>
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Sign Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
