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
import * as myActions from "../../actions/popularAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import Image from "react-native-image-progress";
class Info extends Component {
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
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <ScrollView>
            <View style={{ flex: 0.8, marginTop:10 }}>
              <View style={styles.infoOverView}>
                <Text numberOfLines={10} style={styles.infoOverViewText}>
                  {this.props.data.info.biography}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.infoHeads}>Born:</Text>
                  <Text style={styles.infoText}>
                    {" "}
                    {this.props.data.info.birthday}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.infoHeads}>Birthplace:</Text>
                  <Text style={styles.infoText}>
                    {" "}
                    {this.props.data.info.place_of_birth}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
mapStateToProps = (state, props) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
