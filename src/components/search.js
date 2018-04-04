import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import styles from "./styles";
import Movies from "./searchTabs/movies";
import Actors from "./searchTabs/actors";
import TVShows from "./searchTabs/tvShows";
import DismissKeyboard from "react-native-dismiss-keyboard";
var { height, width } = Dimensions.get("window");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holder: "Movies",
      query: "",
      data: []
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.data != nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#333435"
          }}
        >
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              <View style={{ margin: 10, flex: 0.1 }}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.pop();
                  }}
                >
                  <Icon
                    name="arrow-left"
                    size={20}
                    color="#fff"
                    style={{ padding: 5 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ margin: 10, flex: 0.08 }}>
                <Icon
                  name="search"
                  size={20}
                  color="#fff"
                  style={{ padding: 5 }}
                />
              </View>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder={"Search " + this.state.holder + "..."}
                  placeholderTextColor="#BDC3C7"
                  underlineColorAndroid="transparent"
                  style={styles.searchText}
                  selectTextOnFocus={true}
                  onChangeText={async text => {
                    await this.setState({ query: text });
                    await this.props.search(this.state.query);
                  }}
                  autoFocus={true}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <ScrollableTabView
          style={{ flex: 0.9 }}
          onPress={() => {
            DismissKeyboard();
          }}
          tabBarBackgroundColor="#333435"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#BDC3C7"
          tabBarTextStyle={{ fontFamily: "Arial", fontSize: 12 }}
          tabBarUnderlineStyle={{ backgroundColor: "#3FC380" }}
          onChangeTab={item => {
            this.setState({
              holder:
                item.i == 0 ? "Movies" : item.i == 1 ? "Actors" : "TV Shows"
            });
          }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Movies tabLabel="MOVIES" data={this.state.data} />
          <Actors tabLabel="ACTORS" data={this.state.data} />
          <TVShows tabLabel="TV SHOWS" data={this.state.data} />
        </ScrollableTabView>
      </View>
    );
  }
}

mapStateToProps = (state, props) => {
  return {
    data: state.searchReducer.data
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
