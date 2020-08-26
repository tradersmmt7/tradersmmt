import styled from "styled-components";
import { NavDropdown,Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const BrandWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${(props) => (props.footer ? "center" : "flex-start")};
  // padding: ${(props) => (props.footer ? "30px 20px" : "none")};
  img {
    height: 60px;
    width: 60px;
  }
`;

export const BrandTextWrapper = styled.div`
  color: ${(props) =>
    props.footer ? props.theme.colors.white : props.theme.colors.unknown};
  font-size: ${(props) => (props.footer ? "14px" : "16px")};
  margin-left: 10px;
  div {
    margin-bottom: -5px;
    font-weight: 500;
  }
`;

export const BannerInfo = styled.div`
  background-color: ${(props) => props.theme.colors.darkCyan};
`;

export const BannerTextSmall = styled.div`
  font-wight: bold;
  color: ${(props) => props.theme.colors.white};
  padding: 10px 0;
`;

export const CustomLink = styled.div`
  margin-bottom: 3px;
  cursor: pointer;
  font-size: ${(props) => (props.small ? "16px" : "16px")};
  font-weight: 500;
`;

export const HeaderContainer = styled.div`
  padding: 0px 0px;
`;

export const CustomNavDropdown = styled(NavDropdown)`
  color: ${(props) => props.theme.colors.darkBlue};
  a {
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: 16px;
    font-weight: 500;
  }
`;

export const CustomRoutingLink = styled(NavLink)`
  :hover {
    text-decoration: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  }
  color: ${(props) => props.theme.colors.darkBlue};
`;


export const CustomNavLink = styled(Nav.Link)`
  cursor: not-allowed;
  margin-bottom: 3px;
    font-size: 16px;
    font-weight: 500;
`;