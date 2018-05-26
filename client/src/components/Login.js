import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>Dev</b>Social
          </Link>
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Log in to your Account</p>

            <form action="#" method="post">
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

              <div className="row">
                <div className="col-8" />
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <Link to="/login">Forgot Password</Link>
            </p>

            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
