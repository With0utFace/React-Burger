import * as actionTypes from "../actions/types/actionTypes";
import updatedState from "../utility-functions";

const initialState = {
  token: null,
  error: false,
  errorMessage: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return updatedState(state, {
        error: false
      });
    case actionTypes.ON_SIGN_METHOD_CHANGE:
      return updatedState(state, {
        error: false
      });
    case actionTypes.SIGNUP_SUCCESS:
      return updatedState(state, {
        token: action.token
      });
    case actionTypes.SIGNIN_ERROR:
      return updatedState(state, {
        error: true,
        errorMessage: action.error.response.data.error.message
      });
    case actionTypes.LOGOUT:
      window.localStorage.clear();
      return updatedState(state, {
        token: null
      });
    case actionTypes.GET_LOCAL_TOKEN:
      return updatedState(state, {
        token: window.localStorage.getItem("token")
      });
    default:
      return state;
  }
};

export default reducer;
