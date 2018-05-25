import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <Link to="/">
            <b>Dev</b>Social
          </Link>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="register-box-msg">Create Account</p>

            <form action="#" method="post">
              <div className="form-group has-feedback">
                <input
                  className="form-control"
                  placeholder="Name"
                  name="name"
                />
                <span className="fa fa-envelope form-control-feedback" />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
                <span className="fa fa-envelope form-control-feedback" />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                />
                <span className="fa fa-lock form-control-feedback" />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="password"
                />
                <span className="fa fa-lock form-control-feedback" />
              </div>

              <div className="row">
                <div className="col-8" />
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-0">
              <Link to="/login" className="text-center">
                Have an Account? Login.
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
