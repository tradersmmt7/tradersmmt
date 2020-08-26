import React, { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import bannerContent from "../../../Assets/svg/bannercontent.svg";
import { login, registration } from "../../../Actions/action";
import Slider from "./Slider";
import Login from "./Login";
import Register from "./Register";
import {
  FlexWrapper,
  SmallWrapper,
  CustomTabs,
  LoginSignUpTabContainer,
  FlexWrapper2,
  BannerFirstRow,
  BannerText,
} from "./styles";
import { getCookie } from "../../../Utils/Cookies";

const Banner = (props) => {
  const [login, setlogin] = useState({
    emailId: '',
    password: '',
  });
  const [register, setRegister] = useState({
    fullName: '',
    emailId: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 1) {
      props.loginVerify(login);
    } else if (type === 2) {
      props.registration(register);
    }
  };
  const handleChange = (e, type) => {
    if (type === 1) {
      login[e.target.name] = e.target.value;
      setlogin({...login});
    } else if (type === 2) {
      register[e.target.name] = e.target.value;
      setRegister({...register});
    }
  };

  useEffect(() => {
    if (props.loggedIn) {
      props.history.push("/user/dashboard");
    }
  }, [props.loggedIn]);

  let registerStatus = props.registrationStatus.success;
  useEffect(() => {
    if (registerStatus) {
      setRegister({
        fullName: '',
        emailId: '',
        phone: '',
        password: '',
      });
    }
  }, [registerStatus]);

  return (
    <>
      <section className="banner-section">
        <BannerFirstRow className="container">
          <FlexWrapper mt20={true}>
            <SmallWrapper fg={3}>
              <Slider />
            </SmallWrapper>
            <SmallWrapper>
              <LoginSignUpTabContainer className="loginsignUpCOntainer">
                <CustomTabs
                  defaultActiveKey="Login"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="Login" title="LOGIN">
                    <Login
                      login={login}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      loginStatus={props.loginStatus}
                    />
                  </Tab>
                  <Tab eventKey="signup" title="REGISTER">
                    <Register
                      register={register}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      registrationStatus={props.registrationStatus}
                    />
                  </Tab>
                </CustomTabs>
              </LoginSignUpTabContainer>
            </SmallWrapper>
          </FlexWrapper>
        </BannerFirstRow>
        <div className="max-width">
          <FlexWrapper2 mt20={true} background={bannerContent}>
            <BannerText>
              Lorem Ipsum s it is sometimes known, is dummy text used in lay out
              print,aaying out print..
            </BannerText>
          </FlexWrapper2>
        </div>
      </section>
      <section className="traders-section">
        <div className="container traders-info">TRADERS INFO [COMING SOON]</div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.globalReducer.loggedIn,
  loginStatus: state.globalReducer.loginStatus,
  registrationStatus: state.globalReducer.registrationStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    loginVerify: (data) => dispatch(login(data)),
    registration: (data) => dispatch(registration(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
