import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import NowPlaying from "./tabs/nowPlaying";
import TopBoxOffice from "./tabs/topBoxOffice";
import Anticipated from "./tabs/anticipated";
import Upcoming from "./tabs/upcoming";
class MenuComponent extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <View
        style={{
          flex: 0.09,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: "#333435"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Actions.drawerOpen("drawer");
              }}
            >
              <Icon name="bars" size={25} color="#fff" style={{ padding: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ textAlign: "left", fontSize: 25, color: "#fff" }}>
              Cinematics
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.updateListView();
              }}
            >
              <Icon
                name={this.props.isListSingleRow ? "table" : "list-ul"}
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Actions.Search();
              }}
            >
              <Icon name="search" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

mapStateToProps = (state, props) => {
  return {
    isListSingleRow: state.listReducer.isListSingleRow
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
