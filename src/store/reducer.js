import * as actionType from './actions';

const initialState = {
    ingredients: [],
    totalPrice: 0
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
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient.type]
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    ingredient => ingredient.id !== action.ingredient.id
                ),
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient.type]
            };
        case actionType.CLEAR_STATE:
            return {
                ...state,
                ingredients: []
            };
        default:
            return state;
    }
};

export default reducer;
