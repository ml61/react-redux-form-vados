import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";
import { setDeletedObj } from "../actions";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductList() {
  let products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const handleClick = (productObj) => {
    setModalShow(true);
    dispatch(setDeletedObj(productObj));
  };

  const generateListItem = ({
    productName,
    productType,
    productPrice,
    productId,
  }) => {
    return (
      <ListGroup.Item key={productId}>
        <div className="container">
          <div className="row">
            <div className="col align-middle">{productName}</div>
            <div className="col align-middle">{productType}</div>
            <div className="col align-middle">{productPrice} $</div>
            <div className="col align-middle">
              <div className="d-flex justify-content-end">
                <Link to={`/edit/${productId}`}>
                  <Button className="mx-2 px-4">Edit</Button>
                </Link>
                <Button
                  className="mx-2 px-3"
                  onClick={() =>
                    handleClick({
                      productId,
                      productName,
                      productType,
                      productPrice,
                    })
                  }
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </div>
            </div>
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
      <DeleteModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
