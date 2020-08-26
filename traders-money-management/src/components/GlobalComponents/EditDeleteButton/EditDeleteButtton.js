import React from "react";
import { Container, Col, ButtonGroup, Button } from "react-bootstrap";
const EditDeleteButtton = ({ onEdit, onDelete }) => {
  return (
    <ButtonGroup className="mr-2">
      <Button variant="warning" onClick={onEdit}>
        <Pencil />
      </Button>
      <Button variant="danger" onClick={onDelete}>
        <Delete />
      </Button>
    </ButtonGroup>
  );
};

const Pencil = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      class="bi bi-pencil"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
      />
      <path
        fill-rule="evenodd"
        d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
      />
    </svg>
  );
};

const Delete = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      class="bi bi-x-circle"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fill-rule="evenodd"
        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
      />
      <path
        fill-rule="evenodd"
        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
      />
    </svg>
  );
};

export default EditDeleteButtton;
