import React from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "../../GlobalComponents/CurrencyInput/CurrencyInput";
import { PrimaryButtonBlueBackground } from "../../GlobalComponents/commonStyles";
import { faRupeeSign,faPercentage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";

const PortfolioStatsForm = ({ handleSubmit, handleChange, portfolioStats }) => {

  return (
    <Form onSubmit={(e) => handleSubmit(e, 1)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Starting Captital</Form.Label>
        <CurrencyInput
          name={"startingCapital"}
          onChange={handleChange}
          placeholder="Enter starting capital"
          value={portfolioStats.startingCapital}
          type={<FontAwesomeIcons icon={faRupeeSign} />}
        />
      </Form.Group>
      
      <Form.Group controlId="formBasicPassword">
        <Form.Label>W.C.S</Form.Label>
        <CurrencyInput
          name={"wcs"}
          onChange={handleChange}
          placeholder="Enter w.c.s"
          value={portfolioStats.wcs}
          type={<FontAwesomeIcons icon={faPercentage} />}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Risk/Trade</Form.Label>
        <CurrencyInput
          name={"riskPerTrade"}
          onChange={handleChange}
          placeholder="Enter risk/trade"
          value={portfolioStats.riskPerTrade}
          type={<FontAwesomeIcons icon = {faPercentage}  />}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Withdraw</Form.Label>
        <CurrencyInput
          name={"withdraw"}
          onChange={handleChange}
          placeholder="Enter Withdraw"
          value={portfolioStats.withdraw}
          type={<FontAwesomeIcons icon={faRupeeSign} />}
        />
      </Form.Group>


      <PrimaryButtonBlueBackground variant="primary" type="submit">
        UPDATE
      </PrimaryButtonBlueBackground>
    </Form>
  );
};

export default PortfolioStatsForm;
