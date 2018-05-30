import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        /* style="min-height: 926px;" */
      >
        {/* <!-- Brand Logo --> */}
        <a href="" className="brand-link">
          <span className="brand-text font-weight-light">DevSocial</span>
        </a>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user panel (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Avatar"
              />
            </div>
            <div className="info">
              <Link to="/scaffold">
                <a className="d-block">User Name</a>
              </Link>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <!-- Add icons to the links using the .nav-icon className
                 with font-awesome or any other icon font library --> */}
              <li className="nav-item has-treeview menu-open">
                <a className="nav-link active">
                  <i className="nav-icon fa fa-dashboard" />
                  <p>
                    Starter Pages
                    <i className="right fa fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview" /* style="display: block;" */>
                  <li className="nav-item">
                    <Link to="/scaffold/hello1">
                      <a className="nav-link active">
                        <i className="fa fa-circle-o nav-icon" />
                        <p>Active Page</p>
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/scaffold/hello2">
                      <a className="nav-link">
                        <i className="fa fa-circle-o nav-icon" />
                        <p>Inactive Page</p>
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/scaffold/hello2">
                      <a className="nav-link">
                        <i className="fa fa-circle-o nav-icon" />
                        <p>Inactive Page</p>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    );
  }
}

export default Sidebar;
