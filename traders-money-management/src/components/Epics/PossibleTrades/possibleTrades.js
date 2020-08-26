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
import {
  savePossibleTrade,
  fetchPossibleTrade,
  updatePossibleTradeDetail,
  deletePossibleTradeDetail,
} from "../../../Actions/possibleTradesActions";
import { DangerAlert } from "../Dashboard/styles";
import Danger from "../../../Assets/svg/warning.svg";
import PTradeTable from "./PTradeTable";
import CustomModal from "../../GlobalComponents/CustomModal/CustomModal";
import EditPossibleTrade from "./EditPossibleTrade";
import IconDropDown from "../../GlobalComponents/IconDropDown/IconDropDown";
import EditDeleteButtton from "../../GlobalComponents/EditDeleteButton/EditDeleteButtton";

import { faFileAlt, faRupeeSign,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";

const initialState = {
  possibleTrade: {
    script: "",
    longOrShort: "",
    entryPrice: "",
    stopLoss: "",
  },
  showModal: false,
  modalData: {
    show: false,
    data: null,
  },
};

const PossibleTrades = (props) => {
  const [possibleTrade, setPossibleTrade] = useState(
    initialState.possibleTrade
  );
  const [showModal, setShowModal] = useState(initialState.showModal);
  const [modalData, setModalData] = useState(initialState.modalData);

  useEffect(() => {
    props.fetchPossibleTrade();
  }, []);

  const handleChange = (e) => {
    setPossibleTrade({ ...possibleTrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    props.savePossibleTrade(possibleTrade);
    setPossibleTrade(initialState.possibleTrade);
  };

  const onUpdate = (data) => {
    props.updatePossibleTradeDetail({
      entryPrice: data.entryPrice,
      longOrShort: data.longOrShort.toLowerCase(),
      script: data.script,
      stopLoss: data.stopLoss,
      _id: data._id,
    });
  };

  const onDelete = (id) => {
    props.deletePossibleTradeDetail({
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
    if (props.possibleTrade.data.length > 0) {
      let ptradeData = props.possibleTrade.data;
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
    return props.possibleTrade.data;
  };

  return (
    <section className="header-section">
      <header>
        <div className="container">
          <HeadingWrapper>Possible Trades</HeadingWrapper>
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
                <LabelHeading>Enter script: </LabelHeading>
                <CurrencyInput
                  name="script"
                  placeholder="Script"
                  type={<FontAwesomeIcons icon={faFileAlt} />}
                  onChange={handleChange}
                  value={possibleTrade.script}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter Long/Short: </LabelHeading>
                <Dropdown
                  onSelect={handleChange}
                  name="longOrShort"
                  value={possibleTrade.longOrShort}
                  options={[
                    { key: "long", render: "Long" },
                    { key: "short", render: "Short" },
                  ]}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter entry price: </LabelHeading>
                <CurrencyInput
                  name="entryPrice"
                  placeholder="Entry price"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={possibleTrade.entryPrice}
                />
              </Col>
              <Col sm={12} md={6} lg={3}>
                <LabelHeading>Enter stop loss: </LabelHeading>
                <CurrencyInput
                  name="stopLoss"
                  placeholder="Stop loss"
                  type={<FontAwesomeIcons icon={faRupeeSign} />}
                  onChange={handleChange}
                  value={possibleTrade.stopLoss}
                />
              </Col>
              <Col sm={12} md={6} lg={2}>
                <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
              </Col>
            </CustomRow>
          </Container>
          <Divider />
          {props.possibleTrade.data.length > 0 && (
            <PTradeTable possibleTrade={ModifiedDataSource()} />
          )}
          {props.possibleTrade.data.length === 0 && (
            <DangerAlert variant="danger">
              Please enter basic details from to view Possible Trades. &nbsp;
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
            <EditPossibleTrade
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
  possibleTrade: state.globalReducer.possibleTrade,
  possibleTradeForm: state.globalReducer.possibleTradeForm,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    savePossibleTrade: (data) => dispatch(savePossibleTrade(data)),
    fetchPossibleTrade: (data) => dispatch(fetchPossibleTrade(data)),
    updatePossibleTradeDetail: (data) =>
      dispatch(updatePossibleTradeDetail(data)),
    deletePossibleTradeDetail: (data) =>
      dispatch(deletePossibleTradeDetail(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PossibleTrades)
);
