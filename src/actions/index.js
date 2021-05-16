import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_DELETED_OBJ,
} from "./types";

export const createProduct = (productObj) => {
  return { type: ADD_PRODUCT, payload: productObj };
};

export const editProduct = (productObj) => {
  return { type: EDIT_PRODUCT, payload: productObj };
};

export const setDeletedObj = (productObj) => {
  return { type: SET_DELETED_OBJ, payload: productObj };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, payload: productId };
};
