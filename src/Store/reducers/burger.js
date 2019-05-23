import * as actionTypes from "../actions/types/actionTypes";
import updatedState from "../utility-functions";

const initialState = {
  ingredients: [],
  totalPrice: 0,
  loading: false
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
      return updatedState(state, {
        ingredients: [...state.ingredients, action.ingredient],
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient.type]
      });
    case actionTypes.REMOVE_INGREDIENT:
      return updatedState(state, {
        ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.ingredient.id),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient.type]
      });
    case actionTypes.CLEAR_STATE:
      return updatedState(state, {
        ingredients: [],
        totalPrice: 0
      });
    default:
      return state;
  }
};

export default reducer;
