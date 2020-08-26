import React,{useEffect} from "react";
import Header from "../GlobalComponents/Header/Header";
import Banner from "./Banner/Banner";
import Footer from "../GlobalComponents/Footer/Footer";
import Routes from "../Router/routes";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { verifyUser } from "../../Actions/action";
const Home = (props) => {
  useEffect(() => {
    props.checkUp();
  },[]);
  return (
    <div className="home-container">
      <Header {...props} />
      <Routes {...props} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.globalReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    checkUp: () => dispatch(verifyUser())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
