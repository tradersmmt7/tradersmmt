import React from "react";
import Home from "./components/Home/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Store/store";
import Theme from "./Utils/theme";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
