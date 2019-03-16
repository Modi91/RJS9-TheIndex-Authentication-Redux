import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};
export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let user = response.data;
      setAuthToken(user.token);
      dispatch(setCurrentUser(jwt_decode(user.token)));
      history.push("/authors");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/signup/", userData);
      let user = response.data;
      let decodeUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(jwt_decode(user.token)));
      history.push("/authors");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("myToken");

    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};
