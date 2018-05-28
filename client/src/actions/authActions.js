import axios from "axios";
import { GET_ERRORS } from "./types";

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
