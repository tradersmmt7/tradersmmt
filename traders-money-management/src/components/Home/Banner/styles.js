import styled from "styled-components";
import { Tabs, Button } from "react-bootstrap";

export const BannerFirstRow = styled.div`
  margin-bottom: 30px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt20 ? "20px" : 0)};
`;

export const FlexWrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt20 ? "30px" : 0)};
  background: ${(props) =>
    props.background ? `url(${props.background}) no-repeat` : "none"};
  width: 100%;
  margin: 0 auto;
  padding: 50px 80px;
  text-decoration: uppercase;
`;
export const SmallWrapper = styled.div`
  flex: ${(props) => (props.fg ? props.fg : 1)};
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
`;

export const CustomTabs = styled(Tabs)`
  background-color:  ${(props) => props.theme.colors.darkBlue};
  color:  ${(props) => props.theme.colors.white};
`;

export const CustomForm = styled.form`
  width: 90%;
  margin: 20px auto;
`;

export const LoginSignUpTabContainer = styled.div`
  height: 100%;
`;


export const BannerText = styled.div`
  font-size: 45px;
  color:  ${(props) => props.theme.colors.white};
  width: 80%;
  align-self: center;
`;