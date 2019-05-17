import * as actionTypes from '../types/actionTypes';
import axios from '../../../Axios/Axios';

export const getOrders = ingredients => {
    return {
        type: actionTypes.GET_ORDERS,
        ingredients: ingredients
    };
};

export const loaded = () => {
    return {
        type: actionTypes.LOADED
    };
};

export const removeOrder = (id, token) => {
    return dispatch => {
        axios.delete(`/orders/${id}.json?auth=${token}`).then(res => {
            dispatch(fetchOrdersToState(token));
        });
    };
};

export const fetchOrdersToState = token => {
    return dispatch => {
        dispatch(loaded());
        axios.get('/orders.json?auth=' + token).then(response => {
            dispatch(getOrders(response.data));
        });
    };
};
