import { combineReducers } from "redux";
import { setDeletedObj } from "../actions";

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_DELETED_OBJ,
} from "../actions/types";

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
      return [...newState];

    case DELETE_PRODUCT:
      return state.filter((product) => product.productId != action.payload);

    default:
      return state;
  }
};

const deletedObjReducer = (state = null, action) => {
  switch (action.type) {
    case SET_DELETED_OBJ:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  products: productsReducer,
  deletedObj: deletedObjReducer,
});
