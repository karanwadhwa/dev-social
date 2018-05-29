import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply Authorization Header to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Authorization Header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
