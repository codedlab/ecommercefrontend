import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "jean@gmail.com",
    password: "jean12345",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };
  const signUpForm = () => (
    <form className="formformat">
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
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Layout
      title="Signin"
      description="Signin into Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};
export default Signin;
