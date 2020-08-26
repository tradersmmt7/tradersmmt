import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { LabelHeading } from "../../GlobalComponents/commonStyles";
import Dropdown from "../../GlobalComponents/DropDown/Dropdown";
import CurrencyInput from "../../GlobalComponents/CurrencyInput/CurrencyInput";
import CustomDatepicker from "../../GlobalComponents/CustomDatepicker/CustomDatepicker";
import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";

const EditOpenTrades = (props) => {
  const [openTrade, setOpenTrade] = useState(
    typeof props.data === "string"
      ? null
      : {
          ...props.data,
        }
  );

  const handleChange = (e) => {
    setOpenTrade({ ...openTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onUpdate(openTrade);
    props.onHide();
  };

  const handleDelete = () => {
    props.onDelete(props.data);
    props.onHide();
  };

  const EditForm = () => {
    let entryDate =
      typeof openTrade.entryDate === "object"
        ? openTrade.entryDate
        : new Date(openTrade.entryDate);

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Open Trade Details
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
              <LabelHeading color={true}>Script: </LabelHeading>
              <CurrencyInput
                name="script"
                placeholder="Enter Script"
                type=""
                onChange={handleChange}
                value={openTrade.script}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Long/Short: </LabelHeading>
              <Dropdown
                onSelect={handleChange}
                name="longOrShort"
                value={openTrade.longOrShort.toLowerCase()}
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
                value={openTrade.entryPrice}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Quantity: </LabelHeading>
              <CurrencyInput
                name="quantity"
                placeholder="Quantity"
                type={<FontAwesomeIcons icon={faBoxOpen} />}
                onChange={handleChange}
                value={openTrade.quantity}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Initial Stop Loss: </LabelHeading>
              <CurrencyInput
                name="initialStopLoss"
                placeholder="Initial Stop Loss"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={openTrade.initialStopLoss}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Current Stop Loss: </LabelHeading>
              <CurrencyInput
                name="currentStopLoss"
                placeholder="Current Stop Loss"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={openTrade.currentStopLoss}
              />
            </Col>

            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter Target: </LabelHeading>
              <CurrencyInput
                name="target"
                placeholder="Target"
                type=""
                onChange={handleChange}
                value={openTrade.target}
              />
            </Col>

            <Col sm={12} md={6} lg={3}>
              <LabelHeading color={true}>Enter CMP: </LabelHeading>
              <CurrencyInput
                name="cmp"
                placeholder="CMP"
                type={<FontAwesomeIcons icon={faRupeeSign} />}
                onChange={handleChange}
                value={openTrade.cmp}
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

export default EditOpenTrades;
