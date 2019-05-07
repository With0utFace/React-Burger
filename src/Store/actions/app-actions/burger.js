import * as actionTypes from '../types/actionTypes';

export const addIngredients = payload => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredient: payload
    };
};

export const removeIngredient = payload => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: payload
    };
};

export const clearState = () => {
    return {
        type: actionTypes.CLEAR_STATE
    };
};
