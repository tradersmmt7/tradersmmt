import styled from "styled-components";
import { Row, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

export const HeadingWrapper = styled.div`
  margin-top: 20px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  // background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.darkBlue};
  padding: 10px 15px;
  border: solid 1px ${(props) => props.theme.colors.darkBlue};
  border-radius: 5px;
  display: inline-block;
`;

export const Divider = styled.div`
  width: 100%;
  border: solid 0.1px #b2b2b2;
  margin: 20px 0px;
`;

export const FlexSpaceBetweenWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.darkBlue};
  text-transform: uppercase;
  padding: 5px 15px;
  font-size: ${(props) => props.theme.fontSize.secondary};
  margin-top: ${(props) => (props.mt ? props.mt + "px" : null)};
`;

export const PrimaryButtonBlueBackground = styled(Button)`
  background-color: transparent;
  text-transform: uppercase;
  padding: 5px 15px;
  color: ${(props) => props.theme.colors.white};
  border-color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  :hover {
    background: ${(props) => props.theme.colors.blackBlue};
    border-color: ${(props) => props.theme.colors.white};
  }
  :active {
    background: ${(props) => props.theme.colors.darkBlue};
    border-color: ${(props) => props.theme.colors.white};
  }
`;

export const LabelHeading = styled.div`
  font-size: ${(props) => (props.color ? "16px" : "14px")};
  color: ${(props) =>
    props.color ? props.theme.colors.darkBlue : props.theme.colors.white};
  // font-weight: 500;
  margin-bottom: 5px;
`;

export const BlockHeading = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkBlue};
  font-weight: 400;
  div.trade-title {
    font-weight: 500;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  
`;

export const CustomRow = styled(Row)`
  background: ${(props) => props.theme.colors.darkCyan};
  padding: 10px 0;
  border-radius: 5px;
`;


export const CustomInputGroupPre = styled(InputGroup.Prepend)`
`;


export const CustomInputGroupText = styled(InputGroup.Text)`
  border-radius: 0px;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`;
