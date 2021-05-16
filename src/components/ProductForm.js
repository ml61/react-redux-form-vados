import React, { useState } from "react";
import { productTypes, dualsim } from "../database";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Formik } from "formik";
import * as Yup from "yup";

import { createProduct, editProduct } from "../actions";
import { useDispatch } from "react-redux";

const ProductForm = ({ initialValues, productId }) => {
  const dispatch = useDispatch();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  let currentURL = window.location.href;

  // addProductToStore=(prodObj = {name:'max', price:'23.23'})

  const generateProductTypeOptions = () => {
    const newProdTypes = [{ name: "Choose a type", id: 1000 }, ...productTypes];
    const options = newProdTypes.map((productType) => (
      <option key={productType.id} value={productType.id}>
        {productType.name}
      </option>
    ));
    return options;
  };

  const generateDualsimOptions = () => {
    const options = dualsim.map((dualsimOption) => (
      <option key={dualsimOption.name} value={dualsimOption.id}>
        {dualsimOption.name}
      </option>
    ));
    return options;
  };

  const checkFormValues = ({
    productName,
    productType,
    productWeight,
    productColor,
    productPrice,
    dualsim,
    videocard,
  }) => {
    if (!productId) productId = Date.now();
    switch (productType) {
      case "Laptop":
        return {
          productName,
          productType,
          productWeight,
          productColor,
          productPrice,
          videocard,
          productId,
        };
      case "Smartphone":
        return {
          productName,
          productType,
          productWeight,
          productColor,
          productPrice,
          dualsim,
          productId,
        };
      default:
        return {
          productName,
          productType,
          productWeight,
          productColor,
          productPrice,
          productId,
        };
    }
  };

  // RegEx for phone number validation
  const weightRegExp = /^\d+$/;
  const priceRegExp = /[0-9]+\.[0-9]/;
  const colorRegExp = /[a-zA-Z]+/;

  // Schema for yup
  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, "*Names must have at least 2 characters")
      .max(20, "*Names can't be longer than 20 characters")
      .required("*Name is required"),
    productType: Yup.string().required("*Product Type is required"),
    productWeight: Yup.string()
      .matches(weightRegExp, "*Weight have to be integer")
      .required("*Weight required"),
    productColor: Yup.string()
      .matches(colorRegExp, "*Must be a name of color, string")
      .required("*color is required"),
    productPrice: Yup.string()
      .matches(priceRegExp, "*Must be a float value like 450.00")
      .required("*price is required"),
    dualsim: Yup.string().required("*dualsim is required"),
    videocard: Yup.string().required("*videocard is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);
          const checkedValues = checkFormValues(values);
          // Simulate submitting to database, shows us values submitted, resets form
          if (currentURL.includes("new")) {
            dispatch(createProduct(checkedValues));
            resetForm();
          }
          if (currentURL.includes("edit")) {
            dispatch(editProduct(checkedValues));
          }
          setSubmitting(false);
          setShowSuccessMsg(true);
          setTimeout(() => {
            setShowSuccessMsg(false);
          }, 2000);
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="mb-2">
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name :</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Product Name" /* Set onChange to handleChange */
                onChange={handleChange}
                /* Set onBlur to handleBlur */
                onBlur={handleBlur}
                value={values.productName}
                className={
                  touched.productName && errors.productName ? "error" : null
                }
              />
              {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
              {touched.productName && errors.productName ? (
                <div className="error-message">{errors.productName}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formProductType">
              <Form.Label>Product Type :</Form.Label>
              <Form.Control
                as="select"
                name="productType"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productType}
                className={
                  touched.productType && errors.productType ? "error" : null
                }
              >
                {generateProductTypeOptions()}
              </Form.Control>
              {touched.productType && errors.productType ? (
                <div className="error-message">{errors.productType}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formWeight">
              <Form.Label>Weight(g) :</Form.Label>
              <Form.Control
                type="text"
                name="productWeight"
                placeholder="250"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productWeight}
                className={
                  touched.productWeight && errors.productWeight ? "error" : null
                }
              />
              {touched.productWeight && errors.productWeight ? (
                <div className="error-message">{errors.productWeight}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color (name of color) :</Form.Label>
              <Form.Control
                type="text"
                name="productColor"
                placeholder="black"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productColor}
                className={
                  touched.productColor && errors.productColor ? "error" : null
                }
              />
              {touched.productColor && errors.productColor ? (
                <div className="error-message">{errors.productColor}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price, USD :</Form.Label>
              <Form.Control
                type="text"
                name="productPrice"
                placeholder="450.00"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productPrice}
                className={
                  touched.productPrice && errors.productPrice ? "error" : null
                }
              />
              {touched.productPrice && errors.productPrice ? (
                <div className="error-message">{errors.productPrice}</div>
              ) : null}
            </Form.Group>

            {values.productType === "Laptop" ? (
              <Form.Group controlId="formVideocard">
                <Form.Label>Videocard :</Form.Label>
                <Form.Control
                  type="text"
                  name="videocard"
                  placeholder="NVidia nx750"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.videocard}
                  className={
                    touched.videocard && errors.videocard ? "error" : null
                  }
                />
                {touched.videocard && errors.videocard ? (
                  <div className="error-message">{errors.videocard}</div>
                ) : null}
              </Form.Group>
            ) : null}
            {values.productType === "Smartphone" ? (
              <Form.Group controlId="formSmartphone">
                <Form.Label>Dualsim :</Form.Label>
                <Form.Control
                  as="select"
                  name="dualsim"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dualsim}
                  className={touched.dualsim && errors.dualsim ? "error" : null}
                >
                  {generateDualsimOptions()}
                </Form.Control>
                {touched.dualsim && errors.dualsim ? (
                  <div className="error-message">{errors.dualsim}</div>
                ) : null}
              </Form.Group>
            ) : null}
            {showSuccessMsg ? (
              <Alert variant="success">
                {currentURL.includes("new")
                  ? "Your product was successfully added to the list!"
                  : "Your product was successfully upgraded"}
              </Alert>
            ) : null}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
