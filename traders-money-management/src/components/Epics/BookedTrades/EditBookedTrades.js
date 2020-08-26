import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { LabelHeading } from "../../GlobalComponents/commonStyles";
import Dropdown from "../../GlobalComponents/DropDown/Dropdown";
import CurrencyInput from "../../GlobalComponents/CurrencyInput/CurrencyInput";
import CustomDatepicker from "../../GlobalComponents/CustomDatepicker/CustomDatepicker";

import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";


const EditBookedTrades = (props) => {
  const [bookedTrade, setBookedTrade] = useState(
    typeof props.data === "string"
      ? null
      : {
          ...props.data,
          entryDate: new Date(),
        }
  );

  const handleChange = (e) => {
    setBookedTrade({ ...bookedTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onUpdate(bookedTrade);
    props.onHide();
  };

  const handleDelete = () => {
    props.onDelete(props.data);
    props.onHide();
  };

  const EditForm = () => {
    let entryDate =
      typeof bookedTrade.entryDate === "object"
        ? bookedTrade.entryDate
        : new Date(bookedTrade.entryDate);

    let exitDate =
      typeof bookedTrade.exitDate === "object"
        ? bookedTrade.exitDate
        : new Date(bookedTrade.exitDate);

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Booked Trade Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Entry date: </LabelHeading>
              <CustomDatepicker
                name="entryDate"
                placeholder="Enter entry date"
                selected={entryDate}
                onChange={handleChange}
              />
            </Col>

            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Exit Date: </LabelHeading>
              <CustomDatepicker
                name="exitDate"
                placeholder="Entry price"
                onChange={handleChange}
                selected={exitDate}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Script: </LabelHeading>
              <CurrencyInput
                name="script"
                placeholder="Enter Script"
                type={<FontAwesomeIcons icon={faFileAlt} />}
                onChange={handleChange}
                value={bookedTrade.script}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Long/Short: </LabelHeading>
              <Dropdown
                onSelect={handleChange}
                name="longOrShort"
                value={bookedTrade.longOrShort.toLowerCase()}
                options={[
                  { key: "long", render: "Long" },
                  { key: "short", render: "Short" },
                ]}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Entry Price: </LabelHeading>
              <CurrencyInput
                name="entryPrice"
                placeholder="Price"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={bookedTrade.entryPrice}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Quantity: </LabelHeading>
              <CurrencyInput
                name="quantity"
                placeholder="Quantity"
                type={<FontAwesomeIcons icon={faBoxOpen} />}
                onChange={handleChange}
                value={bookedTrade.quantity}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Initial Stop Loss: </LabelHeading>
              <CurrencyInput
                name="initialStopLoss"
                placeholder="Initial Stop Loss"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={bookedTrade.initialStopLoss}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Exit Price: </LabelHeading>
              <CurrencyInput
                name="exitPrice"
                placeholder="Exit Price"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={bookedTrade.exitPrice}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Charges: </LabelHeading>
              <CurrencyInput
                name="charges"
                placeholder="Charges"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={bookedTrade.charges}
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

export default EditBookedTrades;
