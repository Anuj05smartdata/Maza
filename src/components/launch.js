import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import styles from "./styles";
import NowPlaying from "./tabs/nowPlaying";
import TopBoxOffice from "./tabs/topBoxOffice";
import Anticipated from "./tabs/anticipated";
import Upcoming from "./tabs/upcoming";
import icon from "../img/icon.png";
import MenuComponent from "./menuComponent";
class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <MenuComponent />
        <ScrollableTabView
          tabBarBackgroundColor="#333435"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#BDC3C7"
          tabBarTextStyle={{ fontFamily: "Arial", fontSize: 12 }}
          tabBarUnderlineStyle={{ backgroundColor: "#3FC380" }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <NowPlaying
            tabLabel="NOW PLAYING"
            isListSingleRow={this.props.isListSingleRow}
          />
          <TopBoxOffice
            tabLabel="TOP BOX OFFICE"
            isListSingleRow={this.props.isListSingleRow}
          />
          <Anticipated
            tabLabel="ANTICIPATED"
            isListSingleRow={this.props.isListSingleRow}
          />
          <Upcoming
            tabLabel="UPCOMING"
            isListSingleRow={this.props.isListSingleRow}
          />
        </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Launch);
