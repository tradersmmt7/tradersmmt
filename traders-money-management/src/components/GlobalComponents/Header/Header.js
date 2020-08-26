import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../../Actions/action";
import income from "../../../Assets/svg/income.svg";
import {
  BannerInfo,
  BannerTextSmall,
  BrandWrapper,
  BrandTextWrapper,
  CustomLink,
  HeaderContainer,
  CustomNavDropdown,
  CustomRoutingLink,
  CustomNavLink,
} from "./styles";

const Header = ({ loggedIn, logoutUser, userDetails }) => {
  const [user, setUser] = useState(userDetails);
  let fullName = userDetails.fullName;

  useEffect(() => {
    setUser(userDetails);
  }, [fullName]);

  return (
    <section className="header-section">
      <header>
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
          <HeaderContainer className="container">
            <Navbar.Brand>
              <BrandWrapper>
                <img src={income} />
                <BrandTextWrapper>
                  <div>TRADING</div>
                  <div>MONEY</div>
                  <div>MANAGEMENT</div>
                </BrandTextWrapper>
              </BrandWrapper>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto"></Nav>
              {loggedIn ? (
                <Nav>
                  <Nav.Link>
                    <CustomRoutingLink
                      activeClassName="active"
                      to="/user/dashboard"
                    >
                      <CustomLink>Dashboard</CustomLink>
                    </CustomRoutingLink>
                  </Nav.Link>

                  {userDetails.subscriptionStatus ? (
                    <>
                      <Nav.Link>
                        <CustomRoutingLink to="/user/booked-trades">
                          <CustomLink>Booked Trades</CustomLink>{" "}
                        </CustomRoutingLink>
                      </Nav.Link>
                      <Nav.Link>
                        <CustomRoutingLink to="/user/open-trades">
                          <CustomLink>Open Trades</CustomLink>{" "}
                        </CustomRoutingLink>
                      </Nav.Link>
                      <Nav.Link>
                        <CustomRoutingLink to="/user/possible-trades">
                          <CustomLink>Possible Trades</CustomLink>{" "}
                        </CustomRoutingLink>
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <CustomNavLink>Booked Trades</CustomNavLink>
                      <CustomNavLink>Open Trades</CustomNavLink>
                      <CustomNavLink>Possible Trades</CustomNavLink>
                    </>
                  )}

                  <CustomNavDropdown
                    title={`Hi ${user.fullName ? user.fullName : ""}!`}
                  >
                    <NavDropdown.Item>
                      <CustomRoutingLink to="/user/portfolio">
                        <CustomLink small={true}>Portfolio</CustomLink>{" "}
                      </CustomRoutingLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <CustomLink small={true}>Contact us</CustomLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutUser()}>
                      <CustomLink small={true}>Logout</CustomLink>
                    </NavDropdown.Item>
                  </CustomNavDropdown>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link eventKey={2} href="#memes">
                    <CustomLink>CONTACT US</CustomLink>
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </HeaderContainer>
        </Navbar>
        <BannerInfo className="full-width banner-info">
          <div className="container">
            <BannerTextSmall>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attrasd.....
            </BannerTextSmall>
          </div>
        </BannerInfo>
      </header>
    </section>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.globalReducer.userDetails,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    logoutUser: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
