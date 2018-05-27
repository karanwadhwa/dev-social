import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
