import styled from "styled-components";
import { Table } from "react-bootstrap";

export const CustomtableWrapper = styled(Table)`
  font-size: ${(props) => props.theme.fontSize.secondary};
  thead tr th {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.darkBlue};
  }
  tbody tr:nth-of-type(odd) {
    background-color: ${(props) => props.theme.colors.darkCyan};
    color: ${(props) => props.theme.colors.white};
  }
  tbody tr:nth-of-type(even) {
    color: ${(props) => props.theme.colors.darkBlue};
  }
  tbody tr td {
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;
