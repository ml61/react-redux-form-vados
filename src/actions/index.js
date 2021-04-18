import { ADD_PRODUCT } from "./types";

export const createProduct = (productObj) => {
  console.log(productObj);
  return { type: ADD_PRODUCT, payload: productObj };
};
