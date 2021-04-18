import { ADD_PRODUCT } from "./types";

export const createProduct = (productObj) => {
  const jsonProductObj = JSON.stringify(productObj);
  return { type: ADD_PRODUCT, payload: jsonProductObj };
};
