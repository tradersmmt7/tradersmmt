import React, { useState, useEffect } from "react";
import {
  HeadingWrapper,
  Divider,
  PrimaryButton,
  LabelHeading,
  BlockHeading,
  CustomRow,
} from "../../GlobalComponents/commonStyles";
import CurrencyInput from "../../GlobalComponents/CurrencyInput/CurrencyInput";
import { Container, Col, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "../../GlobalComponents/DropDown/Dropdown";
import { DangerAlert } from "../Dashboard/styles";
import Danger from "../../../Assets/svg/warning.svg";
import OTradeTable from "./OTradeTable";
import CustomModal from "../../GlobalComponents/CustomModal/CustomModal";
import IconDropDown from "../../GlobalComponents/IconDropDown/IconDropDown";
import EditDeleteButtton from "../../GlobalComponents/EditDeleteButton/EditDeleteButtton";
import CustomDatepicker from "../../GlobalComponents/CustomDatepicker/CustomDatepicker";
import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";
import {
  fetchingOpenTrades,
  saveOpenTrade,
  deleteOpenTrades,
  updateOpenTradeDetail,
} from "../../../Actions/OpenTradesAction";
import EditOpenTrades from "./EditOpenTrades";

const initialState = {
  openTrade: {
    entryDate: new Date(),
    script: "",
    longOrShort: "",
    entryPrice: "",
    quantity: "",
    initialStopLoss: "",
    currentStopLoss: "",
    target: "",
    cmp: "",
  },
  showModal: false,
  modalData: {
    show: false,
    data: null,
  },
};

const OpenTrades = (props) => {
  const [openTrade, setOpenTrade] = useState(initialState.openTrade);
  const [showModal, setShowModal] = useState(initialState.showModal);
  const [modalData, setModalData] = useState(initialState.modalData);

  useEffect(() => {
    props.fetchingOpenTrades();
  }, []);

  const handleChange = (e) => {
    setOpenTrade({ ...openTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    props.saveOpenTrade(openTrade);
  };

  const onUpdate = (data) => {
    props.updateOpenTradeDetail({
      entryDate: data.entryDate,
      script: data.script,
      longOrShort: data.longOrShort.toLowerCase(),
      entryPrice: data.entryPrice,
      quantity: data.quantity,
      initialStopLoss: data.initialStopLoss,
      currentStopLoss: data.currentStopLoss,
      target: data.target,
      quantity: data.quantity,
      cmp: data.cmp,
      _id: data._id,
    });
  };

  const onDelete = (id) => {
    props.deleteOpenTrades({
      _id: id,
    });
  };

  const deleteTradeRow = (id) => {
    setModalData({
      show: true,
      data: id,
    });
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setModalData({
      show: false,
      data: null,
    });
  };

  const editTradeRow = (data) => {
    setModalData({
      show: true,
      data,
    });
  };

  const ModifiedDataSource = () => {
    if (props.openTrade.length > 0) {
      let ptradeData = props.openTrade;
      ptradeData.map((data, index) => {
        data.actions = (
          <EditDeleteButtton
            onEdit={() => editTradeRow(data)}
            onDelete={() => deleteTradeRow(data._id)}
          />
        );
      });
      return ptradeData;
    }
    return props.openTrade;
  };

  return (
    <section className="header-section">
      <header>
        <div className="container">
          <HeadingWrapper>Open Trades</HeadingWrapper>
          <Divider />
          <Container>
            <BlockHeading>
              <div className="trade-title">Enter the details below:</div>
              <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attrasd.....
              </p>
            </BlockHeading>
            <CustomRow>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Entry date: </LabelHeading>

                <CustomDatepicker
                  name="entryDate"
                  placeholder="Enter entry date"
                  selected={openTrade.entryDate}
                  onChange={handleChange}
                />
              </Col>

              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Script: </LabelHeading>
                <CurrencyInput
                  name="script"
                  placeholder="Enter Script"
                  type={<FontAwesomeIcons icon={faFileAlt} />}
                  onChange={handleChange}
                  value={openTrade.script}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Long/Short: </LabelHeading>
                <Dropdown
                  onSelect={handleChange}
                  name="longOrShort"
                  value={openTrade.longOrShort}
                  options={[
                    { key: "long", render: "Long" },
                    { key: "short", render: "Short" },
                  ]}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Entry Price: </LabelHeading>
                <CurrencyInput
                  name="entryPrice"
                  placeholder="Price"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={openTrade.entryPrice}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Quantity: </LabelHeading>
                <CurrencyInput
                  name="quantity"
                  placeholder="Quantity"
                  type={<FontAwesomeIcons icon={faBoxOpen} />}
                  onChange={handleChange}
                  value={openTrade.quantity}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Initial Stop Loss: </LabelHeading>
                <CurrencyInput
                  name="initialStopLoss"
                  placeholder="Initial Stop Loss"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={openTrade.initialStopLoss}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Current Stop Loss: </LabelHeading>
                <CurrencyInput
                  name="currentStopLoss"
                  placeholder="Current Stop Loss"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={openTrade.currentStopLoss}
                />
              </Col>

              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Target: </LabelHeading>
                <CurrencyInput
                  name="target"
                  placeholder="Target"
                  type=""
                  onChange={handleChange}
                  value={openTrade.target}
                />
              </Col>

              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter CMP: </LabelHeading>
                <CurrencyInput
                  name="cmp"
                  placeholder="CMP"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={openTrade.cmp}
                />
              </Col>

              <Col sm={12} md={6} lg={2} style={{paddingTop:'25px'}}>
                <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
              </Col>
            </CustomRow>
          </Container>
          <Divider />
          {props.openTrade.length > 0 && (
            <OTradeTable openTrade={ModifiedDataSource()} />
          )}
          {props.openTrade.length === 0 && (
            <DangerAlert variant="danger">
              Please enter basic details from to view Booked Trades. &nbsp;
              <img src={Danger} height="30" width="30" />
            </DangerAlert>
          )}
        </div>
      </header>
      {modalData.show && (
        <CustomModal
          show={modalData.show}
          data={modalData.data}
          onHide={hideModal}
          render={() => (
            <EditOpenTrades
              onUpdate={onUpdate}
              onDelete={onDelete}
              onHide={hideModal}
              {...modalData}
            />
          )}
        />
      )}
    </section>
  );
};
const mapStateToProps = (state) => ({
  user: state.globalReducer.userDetails,
  openTrade: state.tradeReducer.openTrade,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    saveOpenTrade: (data) => dispatch(saveOpenTrade(data)),
    fetchingOpenTrades: (data) => dispatch(fetchingOpenTrades(data)),
    updateOpenTradeDetail: (data) => dispatch(updateOpenTradeDetail(data)),
    deleteOpenTrades: (data) => dispatch(deleteOpenTrades(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpenTrades)
);
