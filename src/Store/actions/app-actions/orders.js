import * as actionTypes from "../types/actionTypes";
import axios from "../../../Axios/Axios";

export const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START
  };
};

export const getOrders = ingredients => {
  return {
    type: actionTypes.GET_ORDERS,
    ingredients: ingredients
  };
};

export const removeOrder = (id, token) => {
  return dispatch => {
    axios.delete(`/orders/${id}.json?auth=${token}`).then(res => {
      dispatch(fetchOrdersToState(token));
    });
  };
};

export const fetchOrdersToState = () => {
  return dispatch => {
    dispatch(getOrdersStart());
    const currentToken = window.localStorage.getItem("token");

    axios.get(`/orders.json?auth=${currentToken}`).then(response => {
      dispatch(getOrders(response.data));
    });
  };
};
