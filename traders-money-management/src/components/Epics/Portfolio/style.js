import styled from "styled-components";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PortfolioWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 798px) {
    display: block;
  }
`;

export const StatsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
  flex: 1;
  padding: 15px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
`;

export const PersonalDetails = styled.div`
  flex: 3;
  padding: 15px;
`;

export const ViewDetailsHeading = styled.div`
  font-size: ${(props) => props.theme.fontSize.primary};
  margin: 5px 0px 0px 0px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.darkBlue};
  text-transform: uppercase;
`;

export const ViewDetailsInfo = styled.tr`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.darkBlue};
  td {
    font-size: ${(props) => props.theme.fontSize.secondary};
  }
  td:nth-child(2) {
    margin-left: 15px;
  }
`;

export const CustomTable = styled(Table)`
  margin: 20px 0px;
`;

export const SubscribeBtn = styled(Button)``;
