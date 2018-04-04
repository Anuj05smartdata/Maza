import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import {API} from '../../const/const';
import Image from "react-native-image-progress";
class Cast extends Component {
  constructor(props) {
    super(props);
    state = {
      loading: true
    };
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
        this.props.data.cast &&
        this.props.data.cast.cast &&
        this.props.data.cast.cast.length > 0 ? (
        <FlatList
          numColumns={1}
          scrollEnabled={true}
          data={this.props.data.cast.cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 20,
                  flexDirection: "row",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#B5BEC6"
                }}
                onPress={()=>{Actions.discoverPerson({person:item})}}
              >
                <View style={{ flex: 3, flexDirection: "column" }}>
                  <Image
                    indicator={ActivityIndicator}
                    indicatorProps={{
                      color: "rgba(150, 150, 150, 1)",
                      unfilledColor: "rgba(200, 200, 200, 0.2)"
                    }}
                    resizeMethod="resize"
                    borderRadius={Platform.OS == "ios" ? 40 : 100}
                    source={{ uri: API.IMGPATH + item.profile_path }}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ color: "#000", fontSize: 15, fontWeight: "bold" }}
                  >
                    {" "}
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#000", fontSize: 10 }}>
                    {" "}
                    as {item.character}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Cast Not Found
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

export default connect(mapStateToProps, mapDispatchToProps)(Cast);
