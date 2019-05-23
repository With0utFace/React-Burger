import axios from "axios";
import * as actionType from "../types/actionTypes";

export const signUpStart = (email, password) => {
  return {
    type: actionType.SIGNUP_START,
    userData: {
      email: email,
      password: password
    }
  };
};

export const signUpSuccess = idToken => {
  return {
    type: actionType.SIGNUP_SUCCESS,
    token: idToken
  };
};

export const signInError = error => {
  return {
    type: actionType.SIGNIN_ERROR,
    error: error
  };
};

export const logOut = () => {
  return {
    type: actionType.LOGOUT
  };
};

export const authSignUpMethodChange = () => {
  return {
    type: actionType.ON_SIGN_METHOD_CHANGE
  };
};

export const getLocalToken = () => {
  return {
    type: actionType.GET_LOCAL_TOKEN
  };
};

export const auth = (email, password, isRegister) => {
  return dispatch => {
    dispatch(signUpStart());
    const userData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const BASE_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
    const API_KEY = "AIzaSyCc5raNAqXtAAyN9cg551OOGoLV4_UZM98";

    let requestURL = `${BASE_URL}${isRegister ? "signupNewUser" : "verifyPassword"}?key=${API_KEY}`;

    axios
      .post(requestURL, userData)
      .then(response => {
        dispatch(signUpSuccess(response.data.idToken));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expires", response.data.expiresIn);
        setTimeout(() => {
          dispatch(logOut());
        }, response.data.expiresIn * 1000);
      })
      .catch(error => {
        dispatch(signInError(error));
      });
  };
};
