import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(errors =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data.err
      })
    );
};

// Login User - Get Auth Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set Authorization Header
      setAuthToken(token);
      // decode token
      const decodedToken = jwt_decode(token);
      // Set current user in auth state
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(errors =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data.err
      })
    );
};

// set decoded token data and isAuthenticated flag
// in redux store
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// logout user
export const logoutUser = () => dispatch => {
  // delete jwtToken from localStorage
  localStorage.removeItem("jwtToken");
  // remove Authorization header
  setAuthToken(false);
  // update redux store, remove currently set user and isAuthenticated
  dispatch(setCurrentUser({}));
};
