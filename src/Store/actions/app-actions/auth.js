import axios from 'axios';
import * as actionType from '../types/actionTypes';

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

export const signInError = () => {
    return {
        type: actionType.SIGNIN_ERROR
    };
};

export const logOut = () => {
    return {
        type: actionType.LOGOUT
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

        let url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCc5raNAqXtAAyN9cg551OOGoLV4_UZM98';

        if (!isRegister) {
            url =
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCc5raNAqXtAAyN9cg551OOGoLV4_UZM98';
        }
        axios
            .post(url, userData)
            .then(response => {
                dispatch(signUpSuccess(response.data.idToken));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expires', response.data.expiresIn);
                setTimeout(() => {
                    dispatch(logOut());
                }, response.data.expiresIn * 1000);
                console.log(response);
            })
            .catch(error => {
                dispatch(signInError());
            });
    };
};
