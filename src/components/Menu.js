import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="d-flex justify-content-around">
      <Link to="/">
        <h3>List of Products</h3>
      </Link>
      <Link to="/new">
        <h3>Add Product</h3>
      </Link>
    </nav>
  );
}
