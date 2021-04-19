import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductList() {
  let products = useSelector((state) => state.products);

  const generateListItem = ({
    productName,
    productType,
    productPrice,
    productId,
  }) => {
    return (
      <ListGroup.Item>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="mx-4">{productName}</div>
            <div className="mx-4">{productType}</div>
            <div className="mx-4">{productPrice} $</div>
          </div>
          <div className="d-flex justify-content-between">
            <Link to={`/edit/${productId}`}>
              <Button className="mx-2 px-4">Edit</Button>
            </Link>
            <Link to={`/delete/${productId}`}>
              <Button className="mx-2 px-3">
                <i className="fas fa-trash-alt"></i>
              </Button>
            </Link>
          </div>
        </div>
      </ListGroup.Item>
    );
  };

  return (
    <>
      <h4>Your product list is below:</h4>
      <ListGroup className="mt-2">
        {products.map((product) => generateListItem(product))}
      </ListGroup>
    </>
  );
}
