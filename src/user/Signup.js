import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, success, error } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };
  const signUpForm = () => (
    <form className="formformat">
      <div className="form-floating">
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
        <label for="floatingInput">Name: </label>
      </div>
      <div className="form-floating">
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
        <label for="floatingInput">Email: </label>
      </div>
      <div className="form-floating">
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
        <label for="floatingInput">Password: </label>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          onClick={clickSubmit}
          className="mt-3 m-4 w-60 btn btn-lg btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );
  return (
    <Layout
      title="Sign Up"
      description="Sign Up - React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};
export default Signup;
