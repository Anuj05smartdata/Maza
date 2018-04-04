import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
export default class DetailMenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.detailsparentView}>
        <View style={{ margin: 10, flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => {
              Actions.TVShows();
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
        <View style={{ margin: 10, flex: 0.7 }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            {" "}
            {this.state.tabCustomTitle ? this.state.tabCustomTitle : ""}{" "}
          </Text>
        </View>
        <View style={styles.detailsTopNav}>
          <TouchableOpacity>
            <Icon
              name="home"
              size={20}
              color="#fff"
              style={{ padding: 5 }}
              onPress={() => {
                Actions.Launch();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="share-alt"
              size={20}
              color="#fff"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="ellipsis-v"
              size={20}
              color="#fff"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
