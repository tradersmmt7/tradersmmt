import React from "react";
import { FooterWrapper, FooterContainer } from "./style";
import income from "../../../Assets/svg/income.svg";
import income_white from "../../../Assets/svg/income_white.svg";
import { BrandWrapper, BrandTextWrapper } from "../Header/styles";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <section className="footer-section">
      <FooterWrapper>
        <FooterContainer>
          <BrandWrapper footer={true}>
            <img src={income_white} height="50" width="50" />
            <BrandTextWrapper footer={true}>
              <div>TRADING</div>
              <div>MONEY</div>
              <div>MANAGEMENT</div>
              <div>Copyright @2020</div>
            </BrandTextWrapper>
          </BrandWrapper>
        </FooterContainer>
      </FooterWrapper>
    </section>
  );
};

export default Footer;
