import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { registerUser } from "../../actions/authActions";

import FormInput from "../common/FormInput";

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
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // pulling it straight out of props instead
  /*   componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  } */

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props;

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

            <form noValidate onSubmit={this.onFormSubmit}>
              <FormInput
                placeholder="Full Name"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
                error={errors.name}
              />

              <FormInput
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onInputChange}
                error={errors.email}
              />

              <FormInput
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
                error={errors.password}
              />

              <FormInput
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onInputChange}
                error={errors.password2}
              />

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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
