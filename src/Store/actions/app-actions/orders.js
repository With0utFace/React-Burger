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

export const removeOrder = id => {
    return dispatch => {
        axios.delete(`/orders/${id}.json`).then(res => {
            dispatch(fetchOrdersToState());
        });
    };
};

export const fetchOrdersToState = () => {
    return dispatch => {
        axios
            .get('/orders.json')
            .then(response => {
                dispatch(getOrders(response.data));
            })
            .then(res => {
                dispatch(loaded());
            });
    };
};
