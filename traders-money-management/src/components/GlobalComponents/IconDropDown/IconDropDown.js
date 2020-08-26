import React from "react";
import { Dropdown, Button } from "react-bootstrap";
const IconDropDown = (props) => {
  return (
    <Dropdown>
      {/* <Button variant="info">||</Button> */}

      <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

      <Dropdown.Menu>{props.render()}</Dropdown.Menu>
    </Dropdown>
  );
};

export default IconDropDown;
