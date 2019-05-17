import * as actionTypes from '../actions/types/actionTypes';
import updatedState from '../utility-functions';

const initialState = {
    orders: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADED:
            return updatedState(state, { loading: true });
        case actionTypes.GET_ORDERS:
            return updatedState(state, {
                orders: action.ingredients,
                loading: false
            });
        default:
            return state;
    }
};

export default reducer;
