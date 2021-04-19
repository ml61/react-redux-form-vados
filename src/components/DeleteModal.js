import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setDeletedObj } from "../actions";

const DeleteModal = ({ show, onHide }) => {
  const deletedObj = useSelector((state) => state.deletedObj);
  const dispatch = useDispatch();

  if (!deletedObj) return null;

  const onDeleteClick = (deletedId) => {
    dispatch(deleteProduct(deletedId));
    dispatch(setDeletedObj(null));
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Centered Modal for {deletedObj.productType} {deletedObj.productName}
        </h4>
        <p>
          Are you sure, that you want to delete this product:
          <strong>
            {deletedObj.productType} {deletedObj.productName},
            {deletedObj.productPrice} $
          </strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => onDeleteClick(deletedObj.productId)}
        >
          Delete
        </Button>
        <Button variant="primary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
