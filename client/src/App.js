import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/layout/Layout";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import "./App.css";

// Persist user to stay logged in
// check for token in localStorage
if (localStorage.jwtToken) {
  // set Authorization Header
  setAuthToken(localStorage.jwtToken);

  // decode token
  const decodedToken = jwt_decode(localStorage.jwtToken);

  // set current user details and isAuthenticated in redux store
  store.dispatch(setCurrentUser(decodedToken));
}

class App extends Component {
  /*  componentDidMount() {
    // Persist user to stay logged in
    // check for token in localStorage
    if (localStorage.jwtToken) {
      // set Authorization Header
      setAuthToken(localStorage.jwtToken);

      // decode token
      const decodedToken = jwt_decode(localStorage.jwtToken);

      // set current user details and isAuthenticated in redux store
      store.dispatch(setCurrentUser(decodedToken));
    }
  } */

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Layout} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
