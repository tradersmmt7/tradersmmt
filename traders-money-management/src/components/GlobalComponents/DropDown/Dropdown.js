import React from "react";
import { Form } from "react-bootstrap";
const Dropdown = ({ options = [], onSelect, name, value = "" }) => {
  return (
    <Form.Group controlId="exampleForm.SelectCustom">
      <Form.Control
        name={name}
        as="select"
        custom
        onChange={(e) => onSelect(e)}
        value={value}
        required={true}
      >
        <option value="">- Select -</option>
        {options.length > 0 &&
          options.map((data, index) => {
            return <option value={data.key}>{data.render}</option>;
          })}
      </Form.Control>
    </Form.Group>
  );
};
export default Dropdown;
