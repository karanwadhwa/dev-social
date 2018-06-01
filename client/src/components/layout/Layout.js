import React, { Component } from "react";
import { Route } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Home from "./Home";

export class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Route component={Home} />
        <Footer />
      </div>
    );
  }
}

export default Layout;
