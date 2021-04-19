import { productTypes } from "../database";
import { ADD_PRODUCT, EDIT_PRODUCT } from "./types";

export const createProduct = (productObj) => {
  return { type: ADD_PRODUCT, payload: productObj };
};

export const editProduct = (productObj) => {
  return { type: EDIT_PRODUCT, payload: productObj };
};
