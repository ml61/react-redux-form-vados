import { combineReducers } from "redux";

import { ADD_PRODUCT, EDIT_PRODUCT } from "../actions/types";

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case EDIT_PRODUCT:
      // console.log(state);
      let newState = state.map((product) => {
        return product.productId == action.payload.productId
          ? action.payload
          : product;
      });
      console.log(newState);
      return [...newState];

    default:
      return state;
  }
};

export default combineReducers({
  products: productsReducer,
});
