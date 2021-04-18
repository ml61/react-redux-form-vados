// Article about validation with Formik, Yup and React Bootstrap Forms
//  https://hackernoon.com/building-react-forms-with-formik-yup-and-react-bootstrap-with-a-minimal-amount-of-pain-and-suffering-1sfk3xv8
import React, { useState } from "react";
import ProductForm from "./ProductForm";

const CreateProduct = () => {
  const initialValues = {
    productName: "",
    productType: "",
    productWeight: "",
    productColor: "",
    productPrice: "",
    dualsim: "none",
    videocard: "Replace this with a model of videocard",
  };

  const productId = Date.now();

  return <ProductForm initialValues={initialValues} />;
};

export default CreateProduct;
