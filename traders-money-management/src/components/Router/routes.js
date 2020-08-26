import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Banner from "../Home/Banner/Banner";
import { getCookie } from "../../Utils/Cookies";

import Epics from "../Epics/Epics";

const routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Banner {...props} />} />
      {getCookie("userId") ? (
        <Route path="/user" component={Epics} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
};

export default routes;
