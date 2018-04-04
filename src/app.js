import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Router from "./myRoutes";
import { Provider } from "react-redux";
import store from "./store/";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
