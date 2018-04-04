import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
var { height, width } = Dimensions.get("window");
import Image from "react-native-image-progress";
import {API} from '../../const/const';
class Seasons extends Component {
  constructor(props) {
    super(props);
  }
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
      return this.props.data &&
        this.props.data.info &&
        this.props.data.info.seasons &&
        this.props.data.info.seasons.length > 0 ? (
        <FlatList
          numColumns={1}
          scrollEnabled={true}
          data={this.props.data.info.seasons}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  flexDirection: "column",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#B5BEC6"
                }}
              >
                <View style={{ flex: 0.1, flexDirection: "row" }}>
                  <Text style={{ color: "#000", fontSize: 18 }}>
                    {" "}
                    {item.name}
                  </Text>
                  <Text style={{ color: "#000", fontSize: 10 }}>
                    {" "}
                    {item.episode_count} episodes
                  </Text>
                </View>
                <View style={{ flex: 0.4, flexDirection: "column" }}>
                  <Image
                    indicator={ActivityIndicator}
                    indicatorProps={{
                      color: "rgba(150, 150, 150, 1)",
                      unfilledColor: "rgba(200, 200, 200, 0.2)"
                    }}
                    source={{ uri: API.IMGPATH + item.poster_path }}
                    resizeMethod="resize"
                    style={{ width: width, height: height * 0.3 }}
                  />
                </View>
                <View style={{ flex: 0.1, flexDirection: "row" }}>
                  <Text style={{ color: "#000", fontSize: 10 }}>
                    {" "}
                    {item.season_number + 1}
                  </Text>
                  <Text style={{ color: "#000", fontSize: 10 }}>
                    {" "}
                    {item.air_date}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ color: "#000", fontSize: 15, fontWeight: "bold" }}
                  >
                    {" "}
                    {item.overview}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Sessions Not Found
          </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Seasons);
