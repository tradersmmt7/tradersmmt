import styled from "styled-components";
import { Alert } from "react-bootstrap";

export const PortfolioStatsWrapper = styled.div`
  margin-top: 10px;
`;

export const BannerTextSmall = styled.div`
  font-wight: bold;
  color: ${(props) => props.theme.colors.white};
  padding: 10px 0;
`;

export const CustomLink = styled.div`
  margin-bottom: 3px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkBlue};
  font-size: ${(props) => (props.small ? "16px" : "16px")};
`;

export const DangerAlert = styled(Alert)`
  background: ${(props) => props.theme.colors.white};
  color: #F32013;
  font-size: 16px;
  font-weight:500;
  text-align:center;
  margin-top:30px;
  border-radius: 0px;
  border: solid 1px ${(props) => props.theme.colors.white};
  Link {

  }

`;