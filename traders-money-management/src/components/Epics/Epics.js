import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import BookedTrades from "./BookedTrades/BookedTrades";
import OpenTrades from "./OpenTrades/openTrades";
import PossibleTrades from "./PossibleTrades/possibleTrades";
import Portfolio from "./Portfolio/portfolio";
import { fetchUserDetails } from "../../Actions/userActions";
const Epics = (props) => {
  useEffect(() => {
    props.fetchUserDetail();
  },[]);
  return (
    <>
      <Route
        path="/user/dashboard"
        render={(props) => <Dashboard {...props} />}
      />
      <Route
        path="/user/booked-trades"
        render={(props) => <BookedTrades {...props} />}
      />
      <Route
        path="/user/open-trades"
        render={(props) => <OpenTrades {...props} />}
      />
      <Route
        path="/user/possible-trades"
        render={(props) => <PossibleTrades {...props} />}
      />
      <Route
        path="/user/portfolio"
        render={(props) => <Portfolio {...props} />}
      />
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    fetchUserDetail: () => dispatch(fetchUserDetails()),
  };
};
export default connect(null, mapDispatchToProps)(Epics);
