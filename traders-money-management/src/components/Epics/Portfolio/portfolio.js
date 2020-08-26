import React, { useState, useEffect } from "react";
import { Badge, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  HeadingWrapper,
  Divider,
  FlexSpaceBetweenWrapper,
  PrimaryButton,
} from "../../GlobalComponents/commonStyles";
import {
  PortfolioWrapper,
  StatsWrapper,
  PersonalDetails,
  ViewDetailsHeading,
  ViewDetailsInfo,
  CustomTable,
  SubscribeBtn,
} from "./style";
import PortfolioStatsForm from "./portfolioStatsForm";
import {
  updatePortfolioStats,
  fetchUserDetails,
} from "../../../Actions/userActions";
import { authPostCall } from "../../../Utils/apiCalls";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const initialState = {
  portfolioStats: {
    startingCapital: "",
    wcs: "",
    riskPerTrade: "",
    withdraw: "",
  },
};

const Portfolio = (props) => {
  const [portfolioStats, setPortfolioStats] = useState(
    props.portfolioStats.length
      ? {
          startingCapital: props.portfolioStats[0].startingCapital,
          wcs: props.portfolioStats[0].worstCaseScenario,
          riskPerTrade: props.portfolioStats[0].riskPerTrade,
          withdraw: props.portfolioStats[0].withdraw,
        }
      : initialState.portfolioStats
  );

  let paymentData = {
    id: null,
    amount: null,
    currency: null,
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (!props.user.subscriptionStatus) {
        await authPostCall("/api/user/razorpay", {}).then((res) => {
          paymentData = res;
        });
      }
      // ...
    }
    fetchData();
  });

  const handleChange = (e) => {
    portfolioStats[e.target.name] = e.target.value;
    setPortfolioStats({ ...portfolioStats });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updatePortfolioStats({ ...portfolioStats });
    setPortfolioStats({
      startingCapital: "",
      wcs: "",
      riskPerTrade: "",
      withdraw: "",
    });
  };

  async function displayRazorpay() {
    console.log(paymentData, "let checl");
    console.log(paymentData.id, "let checl");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_ZlqfAwdWeZ9YmI",
      amount: paymentData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: paymentData.currency,
      name: "Trading Money Management",
      description: "Subcription for premium plan",
      image: "/static/media/income.1efe3b20.svg",
      // order_id: paymentData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        await authPostCall("/api/user/razorpay/success", {
          payId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        }).then((res) => {
          props.fetchUserDetails();
          Swal.fire(
            "Congrats!",
            "You have successfully subscribed to us for next one month!",
            "success"
          );
        });
      },
      prefill: {
        name: props.user.fullName,
        email: props.user.emailId,
        contact: props.user.phone,
      },
      theme: {
        color: "#05386b",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <section className="header-section">
      <header>
        <div className="container">
          <HeadingWrapper>Portfolio Details</HeadingWrapper>
          <Divider />
          <PortfolioWrapper>
            <StatsWrapper>
              {props.portFolioStatsForm.success !== null &&
                props.portFolioStatsForm.success && (
                  <Alert variant="success">
                    {props.portFolioStatsForm.message}
                  </Alert>
                )}
              {props.portFolioStatsForm.success !== null &&
                !props.portFolioStatsForm.success && (
                  <Alert variant="danger">
                    {props.portFolioStatsForm.message}
                  </Alert>
                )}
              <PortfolioStatsForm
                portfolioStats={portfolioStats}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </StatsWrapper>
            <PersonalDetails>
              <FlexSpaceBetweenWrapper>
                <ViewDetailsHeading>View details here:</ViewDetailsHeading>
              </FlexSpaceBetweenWrapper>
              <CustomTable striped bordered hover>
                <tbody>
                  <ViewDetailsInfo>
                    <td>Name :</td>
                    <td>{props.user.fullName}</td>
                  </ViewDetailsInfo>
                  <ViewDetailsInfo>
                    <td>Email-ID :</td>
                    <td>{props.user.emailId}</td>
                  </ViewDetailsInfo>
                  <ViewDetailsInfo>
                    <td>Phone :</td>
                    <td>{props.user.phone}</td>
                  </ViewDetailsInfo>
                  <ViewDetailsInfo>
                    <td>Subscription Status :</td>
                    <td>
                      {props.user.subscriptionStatus ? (
                        <>
                          <Badge variant="success">Subscribed</Badge>
                          <Badge variant="warning">
                            Ends in{" "}
                            {new Date(props.user.subscriptionEndDate)
                              .toISOString()
                              .slice(0, 10)}
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="warning">No Subscription</Badge>
                      )}
                    </td>
                  </ViewDetailsInfo>
                </tbody>
              </CustomTable>
              {!props.user.subscriptionStatus && (
                <Alert variant="info">
                  <h3>
                    Please subscribe to our 30 days package for{" "}
                    <Badge variant="primary">Rs 137</Badge> only, to access all
                    the features.
                  </h3>
                  <SubscribeBtn
                    variant="danger"
                    size="md"
                    onClick={displayRazorpay}
                  >
                    {" "}
                    Subscribe Now !
                  </SubscribeBtn>
                </Alert>
              )}
            </PersonalDetails>
          </PortfolioWrapper>
        </div>
      </header>
    </section>
  );
};
const mapStateToProps = (state) => ({
  user: state.globalReducer.userDetails,
  portFolioStatsForm: state.globalReducer.portFolioStatsForm,
  portfolioStats: state.globalReducer.portfolioStats,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    updatePortfolioStats: (data) => dispatch(updatePortfolioStats(data)),
    fetchUserDetails: (data) => dispatch(fetchUserDetails(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Portfolio)
);
