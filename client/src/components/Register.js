import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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
                  value={this.state.name}
                  onChange={this.onInputChange}
                />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onInputChange}
                />
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
