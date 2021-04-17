import { combineReducers } from "redux";

import { ADD_PRODUCT } from "../actions/types";

const productsReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  products: productsReducer,
});
