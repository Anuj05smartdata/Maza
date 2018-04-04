import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import { Avatar } from "react-native-elements";
import Image from "react-native-image-progress";
import { IMAGEPATH } from "../../const/const";
class Review extends Component {
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
        this.props.data.review &&
        this.props.data.review.length > 0 ? (
        <FlatList
          numColumns={1}
          scrollEnabled={true}
          data={this.props.data.review}
          keyExtractor={item => item.author.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  margin: 5,
                  justifyContent: "center",
                  alignContent: "flex-start",
                  borderBottomColor: "#6C7A89"
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Image
                    indicator={ActivityIndicator}
                    indicatorProps={{
                      color: "rgba(150, 150, 150, 1)",
                      unfilledColor: "rgba(200, 200, 200, 0.2)"
                    }}
                    source={{
                      uri:
                       IMAGEPATH.TMDb
                    }}
                    style={styles.rateImage}
                  />
                  <Text style={styles.authorName}> {item.author.trim()}</Text>
                </View>
                <Text
                  numberOfLines={5}
                  style={[styles.infoOverViewText, { color: "#6C7A89" }]}
                >
                  {item.content}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Review Not Found
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
