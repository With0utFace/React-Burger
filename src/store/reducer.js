import * as actionTypes from './actions/types/actionTypes';

const initialState = {
    ingredients: [],
    totalPrice: 0,
    orders: null,
    loading: true
};

const INGREDIENT_PRICES = {
    meat: 20,
    bacon: 15,
    cheese: 10,
    salad: 5,
    bread: 3
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient.type]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    ingredient => ingredient.id !== action.ingredient.id
                ),
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient.type]
            };
        case actionTypes.CLEAR_STATE:
            return {
                ...state,
                ingredients: []
            };
        case actionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.ingredients
            };
        case actionTypes.LOADED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
