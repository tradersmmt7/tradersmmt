import React from "react";
import { Modal, Button } from "react-bootstrap";
const CustomModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size={typeof props.data === "string" ? "sm" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.render()}
      </Modal>
    </>
  );
};

export default CustomModal;
