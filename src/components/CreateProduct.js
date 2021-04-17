import React from "react";
import { productTypes, attributes } from "../database";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";

export default function CreateProduct() {
  const generateProductTypeOptions = () => {
    const options = productTypes.map((productType) => (
      <option key={productType.id} value={productType.id}>
        {productType.name}
      </option>
    ));
    return options;
  };

  // RegEx for phone number validation
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  // Schema for yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "*Names must have at least 2 characters")
      .max(100, "*Names can't be longer than 100 characters")
      .required("*Name is required"),
    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "*Phone number is not valid")
      .required("*Phone number required"),
    blog: Yup.string()
      .url("*Must enter URL in http://www.example.com format")
      .required("*URL required"),
  });

  return (
    // <Form>
    //   <Form.Group controlId="formBasicNameProduct">
    //     <Form.Label>Product Name</Form.Label>
    //     <Form.Control type="email" placeholder="Enter name of your product" />
    //   </Form.Group>
    //   <Form.Group controlId="formBasicProductType">
    //     <Form.Label>Product Type</Form.Label>
    //     <Form.Control as="select">{generateProductTypeOptions()}</Form.Control>
    //   </Form.Group>

    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
    <Formik
      initialValues={{ name: "", email: "", phone: "", blog: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);

        // Simulate submitting to database, shows us values submitted, resets form
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name" /* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? "error" : null}
            />
            {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.name && errors.name ? "error" : null}
            />
            {touched.email && errors.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone :</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              className={touched.name && errors.name ? "error" : null}
            />
            {touched.phone && errors.phone ? (
              <div className="error-message">{errors.phone}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBlog">
            <Form.Label>Blog :</Form.Label>
            <Form.Control
              type="text"
              name="blog"
              placeholder="Blog URL"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.blog}
              className={touched.name && errors.name ? "error" : null}
            />
            {touched.blog && errors.blog ? (
              <div className="error-message">{errors.blog}</div>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
