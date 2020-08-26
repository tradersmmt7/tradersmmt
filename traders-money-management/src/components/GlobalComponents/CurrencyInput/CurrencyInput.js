import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
const CurrencyInput = ({
  name,
  placeholder,
  onChange,
  onBlur = false,
  value,
  type = "$",
}) => {
  return (
    <InputGroup className="mb-3">
      {type !== "" && (
        <InputGroup.Prepend>
          <InputGroup.Text>{type}</InputGroup.Text>
        </InputGroup.Prepend>
      )}
      <FormControl
        aria-label="Amount (to the nearest dollar)"
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onBlur={(e) => (onBlur ? onBlur(e) : null)}
        value={value}
        required={true}
      />
    </InputGroup>
  );
};

export default CurrencyInput;
