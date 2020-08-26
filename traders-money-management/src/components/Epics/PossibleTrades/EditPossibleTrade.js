import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { LabelHeading } from "../../GlobalComponents/commonStyles";
import Dropdown from "../../GlobalComponents/DropDown/Dropdown";
import CurrencyInput from "../../GlobalComponents/CurrencyInput/CurrencyInput";
import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";

const EditPossibleTrade = (props) => {
  const [possibleTrade, setPossibleTrade] = useState(
    typeof props.data === "string"
      ? null
      : {
          ...props.data,
        }
  );

  const handleChange = (e) => {
    setPossibleTrade({ ...possibleTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onUpdate(possibleTrade);
    props.onHide();
  };

  const handleDelete = () => {
    props.onDelete(props.data);
    props.onHide();
  };

  const EditForm = () => {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Possible Trade Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <LabelHeading color={true}>Enter script: </LabelHeading>
              <CurrencyInput
                name="script"
                placeholder="Script"
                type={<FontAwesomeIcons icon={faFileAlt} />}
                onChange={handleChange}
                value={possibleTrade.script}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <LabelHeading color={true}>Enter Long/Short: </LabelHeading>
              <Dropdown
                onSelect={handleChange}
                name="longOrShort"
                value={possibleTrade.longOrShort.toLowerCase()}
                options={[
                  { key: "long", render: "Long" },
                  { key: "short", render: "Short" },
                ]}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <LabelHeading color={true}>Enter entry price: </LabelHeading>
              <CurrencyInput
                name="entryPrice"
                placeholder="Entry price"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={possibleTrade.entryPrice}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <LabelHeading color={true}>Enter stop loss: </LabelHeading>
              <CurrencyInput
                name="stopLoss"
                placeholder="Stop loss"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={possibleTrade.stopLoss}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save & Continue
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </>
    );
  };

  const DeleteView = () => {
    return (
      <>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <h3>Are you sure ?</h3>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDelete}>
            Continue
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </>
    );
  };

  return (
    <div>{typeof props.data === "string" ? DeleteView() : EditForm()}</div>
  );
};

export default EditPossibleTrade;
