import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform
} from "react-native";
import Image from "react-native-image-progress";

import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import {API} from "../const/const";
var { height, width } = Dimensions.get("window");
export default class PersonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <FlatList
        numColumns={1}
        scrollEnabled={true}
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 20,
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#B5BEC6"
              }}
              onPress={()=>{Actions.discoverPerson({person:item})}}
            >
              <View style={{ flex: 0.23, flexDirection: "column" }}>
                <Image
                  indicator={ActivityIndicator}
                  indicatorProps={{
                    color: "rgba(150, 150, 150, 1)",
                    unfilledColor: "rgba(200, 200, 200, 0.2)"
                  }}
                  source={{ uri: API.IMGPATH + item.profile_path }}
                  resizeMethod="resize"
                  borderRadius={Platform.OS == "ios" ? 40 : 100}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View
                style={{
                  flex: 0.77,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  alignContent: "flex-start"
                }}
              >
                <Text
                  style={{ color: "#000", fontSize: 15, fontWeight: "bold" }}
                >
                  {" "}
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}
