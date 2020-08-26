import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { PorfolioStats } from "./PorfolioStats";
import { DangerAlert } from "./styles";
import Danger from "../../../Assets/svg/warning.svg";
import { fetchUserDetails } from "../../../Actions/userActions";
import { HeadingWrapper, Divider,BlockHeading } from "../../GlobalComponents/commonStyles";

const Dashboard = (props) => {
  useEffect(() => {
    props.fetchUserDetail();
  }, []);

  useEffect(() => {}, [props.portfolioStats.startingCapital]);

  return (
    <section className="header-section">
      <header>
        <div className="container">
          <HeadingWrapper>Dashboard</HeadingWrapper>
          <Divider />

          {props.portfolioStats.length > 0 && (
            <PorfolioStats portfolioStats={props.portfolioStats} />
          )}
          {props.portfolioStats.length === 0 && (
            <DangerAlert variant="danger">
              Please enter basic details from{" "}
              <Link to="/user/portfolio">Portfolio Section</Link> to view
              Portfolio Statistics. &nbsp;
              <img src={Danger} height="30" width="30" />
            </DangerAlert>
          )}
        </div>
      </header>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.globalReducer.userDetails,
  portfolioStats: state.globalReducer.portfolioStats,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    fetchUserDetail: () => dispatch(fetchUserDetails()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
