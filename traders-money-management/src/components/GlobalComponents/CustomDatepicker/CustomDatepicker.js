import React from "react";
import {
  StyledDatePicker,
  FlexSpaceBetweenWrapper,
  CustomInputGroupPre,
  CustomInputGroupText,
} from "../commonStyles";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../Icons";

const CustomDatepicker = ({ name, selected, onChange, placeholder }) => {
  const handleDate = (e) => {
    onChange({
      target: {
        name,
        value: e,
      },
    });
  };
  return (
    <FlexSpaceBetweenWrapper>
      <CustomInputGroupPre>
        <CustomInputGroupText><FontAwesomeIcons icon={faCalendarAlt} /></CustomInputGroupText>
      </CustomInputGroupPre>
      <StyledDatePicker
        placeholderText={placeholder}
        selected={selected}
        onChange={handleDate}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd/MM/yyyy"
        // minDate={new Date()}
        maxDate={new Date()}
        required={true}
      />
    </FlexSpaceBetweenWrapper>
  );
};

export default CustomDatepicker;
