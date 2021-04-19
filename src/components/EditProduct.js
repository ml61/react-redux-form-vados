import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductForm from "./ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  let products = useSelector((state) => state.products);
  let singleProduct = products.find((product) => product.productId == id);

  if (singleProduct.productType === "Laptop")
    singleProduct = { ...singleProduct, dualsim: "none" };
  if (singleProduct.productType === "Smartphone")
    singleProduct = {
      ...singleProduct,
      videocard: "Replace this with a model of videocard",
    };
  if (singleProduct.productType === "Tablet")
    singleProduct = {
      ...singleProduct,
      videocard: "Replace this with a model of videocard",
      dualsim: "none",
    };

  return <ProductForm initialValues={singleProduct} productId={id} />;
}
