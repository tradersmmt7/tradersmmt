import styled from "styled-components";
import { Tabs, Button } from "react-bootstrap";


export const FooterWrapper = styled.footer`
  margin-top: 30px;
  background-color: ${(props) => props.theme.colors.darkCyan};
  // position: fixed;
  height: 115px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
`;

export const FooterContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 30px 20px;
`;
