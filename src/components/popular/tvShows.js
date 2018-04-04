import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import * as myActions from "../../actions/popularAction";
import Image from "react-native-image-progress";
import ListView from "../TVTabs/listView";
class TVShows extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps = nextProps => {};

  componentDidMount = () => {};
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator
            animating={true}
            style={styles.indicatorPosition}
            size="large"
            color="black"
          />
        </View>
      );
    } else {
      return( this.props.data.tvShow ? 
        <ListView list={this.props.data.tvShow} isListSingleRow={false} />
       : 
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
           TV Shows Not Found
          </Text>
        </View>
      )
    }
  }
}
mapStateToProps = (state, props) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TVShows);
