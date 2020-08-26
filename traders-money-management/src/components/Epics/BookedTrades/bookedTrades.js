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
import BTradeTable from "./BTradeTable";
import CustomModal from "../../GlobalComponents/CustomModal/CustomModal";
import IconDropDown from "../../GlobalComponents/IconDropDown/IconDropDown";
import EditDeleteButtton from "../../GlobalComponents/EditDeleteButton/EditDeleteButtton";
import CustomDatepicker from "../../GlobalComponents/CustomDatepicker/CustomDatepicker";
import {
  fetchingTrades,
  saveBookedTrades,
  deleteBookedTrades,
  updateBookedTradeDetail,
} from "../../../Actions/bookedTradesAction";
import EditBookedTrades from "./EditBookedTrades";

import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";


const initialState = {
  bookedTrade: [
    {
      entryDate: new Date(),
      exitDate: new Date(),
      script: "",
      longOrShort: "",
      entryPrice: "",
      quantity: "",
      initialStopLoss: "",
      exitPrice: "",
      charges: "",
    },
  ],
  showModal: false,
  modalData: {
    show: false,
    data: null,
  },
};

const BookedTrades = (props) => {
  const [bookedTrade, setBookedTrade] = useState(initialState.bookedTrade[0]);
  const [showModal, setShowModal] = useState(initialState.showModal);
  const [modalData, setModalData] = useState(initialState.modalData);

  useEffect(() => {
    props.fetchingTrades();
  }, []);

  const handleChange = (e) => {
    setBookedTrade({ ...bookedTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    props.saveBookedTrade(bookedTrade);
    setBookedTrade(initialState.bookedTrade);
  };

  const onUpdate = (data) => {
    props.updateBookedTradeDetail({
      entryDate: data.entryDate,
      exitDate: data.exitDate,
      script: data.script,
      longOrShort: data.longOrShort.toLowerCase(),
      entryPrice: data.entryPrice,
      quantity: data.quantity,
      initialStopLoss: data.initialStopLoss,
      exitPrice: data.exitPrice,
      charges: data.charges,
      _id: data._id,
    });
  };

  const onDelete = (id) => {
    props.deleteBookedTrades({
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
    if (props.bookedTrade.length > 0) {
      let ptradeData = props.bookedTrade;
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
    return props.bookedTrade;
  };
  return (
    <section className="header-section">
      <header>
        <div className="container">
          <HeadingWrapper>Booked Trades</HeadingWrapper>
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
                  selected={bookedTrade.entryDate}
                  onChange={handleChange}
                />
              </Col>

              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Exit Date: </LabelHeading>
                <CustomDatepicker
                  name="exitDate"
                  placeholder="Entry price"
                  onChange={handleChange}
                  selected={bookedTrade.exitDate}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Script: </LabelHeading>
                <CurrencyInput
                  name="script"
                  placeholder="Enter Script"
                  type={<FontAwesomeIcons icon={faFileAlt} />}
                  onChange={handleChange}
                  value={bookedTrade.script}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Long/Short: </LabelHeading>
                <Dropdown
                  onSelect={handleChange}
                  name="longOrShort"
                  value={bookedTrade.longOrShort}
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
                  value={bookedTrade.entryPrice}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Quantity: </LabelHeading>
                <CurrencyInput
                  name="quantity"
                  placeholder="Quantity"
                  type={<FontAwesomeIcons icon={faBoxOpen} />}
                  onChange={handleChange}
                  value={bookedTrade.quantity}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Initial Stop Loss: </LabelHeading>
                <CurrencyInput
                  name="initialStopLoss"
                  placeholder="Initial Stop Loss"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={bookedTrade.initialStopLoss}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Exit Price: </LabelHeading>
                <CurrencyInput
                  name="exitPrice"
                  placeholder="Exit Price"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={bookedTrade.exitPrice}
                />
              </Col>

              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Charges: </LabelHeading>
                <CurrencyInput
                  name="charges"
                  placeholder="Enter Charges"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={bookedTrade.charges}
                />
              </Col>

              <Col
                sm={12}
                md={6}
                lg={2}
                style={
                  window.screen.width < 798
                    ? { paddingTop: "0px" }
                    : { paddingTop: "25px" }
                }
              >
                <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
              </Col>
            </CustomRow>
          </Container>
          <Divider />
          {props.bookedTrade.length > 0 && (
            <BTradeTable bookedTrade={ModifiedDataSource()} />
          )}
          {props.bookedTrade.length === 0 && (
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
            <EditBookedTrades
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
  bookedTrade: state.tradeReducer.bookedTrade,
  bookedTradeForm: state.tradeReducer.bookedTradeForm,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    saveBookedTrade: (data) => dispatch(saveBookedTrades(data)),
    fetchingTrades: (data) => dispatch(fetchingTrades(data)),
    updateBookedTradeDetail: (data) => dispatch(updateBookedTradeDetail(data)),
    deleteBookedTrades: (data) => dispatch(deleteBookedTrades(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookedTrades)
);
