import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="#">
            <b>Admin</b>LTE
          </a>
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
                />
                <span className="fa fa-envelope form-control-feedback" />
              </div>

              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
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
                    Login
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <a href="#">Forgot Password</a>
            </p>

            <p className="mb-0">
              <a href="register.html" className="text-center">
                Register Account
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
