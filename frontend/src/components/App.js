import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import HomeAppContainer from "./Pages/HomeAppContainer";
import "./index.css";
import store from "./react-redux/store";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <HomeAppContainer />
        </BrowserRouter>
      </Provider>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
