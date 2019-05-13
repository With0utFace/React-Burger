import * as actionTypes from '../actions/types/actionTypes';
import updatedState from '../utility-functions';

const initialState = {
    orders: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS:
            return updatedState(state, { orders: action.ingredients });
        default:
            return state;
    }
};

export default reducer;
