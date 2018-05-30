import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="">
              <i className="fa fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a className="nav-link" href="">
              Contact
            </a>
          </li>
        </ul>

        {/* <!-- SEARCH FORM --> */}
        <form className="form-inline ml-3">
          <div className="input-group input-group-sm ">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </form>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{ "padding-right": "25px" }}>
            <a className="nav-link" href="">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
