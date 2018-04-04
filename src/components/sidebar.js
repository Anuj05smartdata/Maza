import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../actions/";
import DismissKeyboard from "react-native-dismiss-keyboard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import icon from "../img/logo.png";
var { height, width } = Dimensions.get("window");
import { URL, METHOD } from "../const/const";
import Image from "react-native-image-progress";
import { Dropdown } from "react-native-material-dropdown";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 2018,
      to: 2018,
      genres: [],
      selectedGenre: "",
      selectedMenu: "Launch"
    };
  }

  componentDidMount = () => {
    this.props.getGenre();
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.genres != nextProps.genres) {
      this.setState({ genres: nextProps.genres });
    }
  };
  render() {
    return (
      <View style={styles.sidemenumaindiv}>
        <View
          style={{
            flexDirection: "row",
            height: height * 0.2,
            alignItems: "center",
            backgroundColor: "#333435"
          }}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL(URL.LoginTMDB)}
            style={{
              flexDirection: "row",
              height: height * 0.2,
              alignItems: "center"
            }}
          >
            <Image
              indicator={ActivityIndicator}
              indicatorProps={{
                color: "rgba(150, 150, 150, 1)",
                unfilledColor: "rgba(200, 200, 200, 0.2)"
              }}
              source={icon}
              style={{
                top: height * 0.05,
                height: 100,
                width: 80
              }}
            />
            <Text
              style={{
                fontSize: 14,
                top: height * 0.04,
                color: "white",
                textAlignVertical: "center",
                marginLeft: width * 0.01
              }}
            >
              Connect to TMDb
              </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={[styles.sidemenuitems, { backgroundColor: this.state.selectedMenu == "Launch" ? "#BDC3C7" : '#fff' }]}
            onPress={() => {
              this.setState({ selectedMenu: "Launch" })
              Actions.Launch();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="film" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Movies</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sidemenuitems, { backgroundColor: this.state.selectedMenu == "TVShows" ? "#BDC3C7" : '#fff' }]}
            onPress={() => {
              this.setState({ selectedMenu: "TVShows" })
              Actions.TVShows();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="tv" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Tv Shows</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sidemenuitems, { backgroundColor: this.state.selectedMenu == "discover" ? "#BDC3C7" : '#fff' }]}
            onPress={() => {
              this.setState({ selectedMenu: "discover" })
              Actions.discoverMovies();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="search" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Discover</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sidemenuitems, { backgroundColor: this.state.selectedMenu == "popularPeople" ? "#BDC3C7" : '#fff' }]}
            onPress={() => {
              this.setState({ selectedMenu: "popularPeople" })
              Actions.popularPeople();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="user" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Popular People</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.breakitems}
            onPress={() => {
              DismissKeyboard();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="bell" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Reminders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidemenuitems}
            onPress={() => {
              DismissKeyboard();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="question-circle" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Contact Developer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidemenuitems}
            onPress={() => {
              DismissKeyboard();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="google-plus" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Google+ Community</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidemenuitems}
            onPress={() => {
              DismissKeyboard();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="unlock-alt" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Unlock Pro</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidemenuitems}
            onPress={() => {
              DismissKeyboard();
            }}
          >
            <View style={styles.sideMenuIconView}>
              <Icon name="cog" size={20} color="#BDC3C7" />
            </View>
            <View style={styles.sideMenuTextView}>
              <Text style={styles.sidemenuText}>Setting</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
mapStateToProps = (state, props) => {
  return {
    genres: state.launchReducer.genres
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
