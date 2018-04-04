import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "../styles";
import {API} from "../../const/const";
import renderIf from "../renderIf";
var { height, width } = Dimensions.get("window");
import Image from "react-native-image-progress";
export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  render() {
    return (
      <View style={styles.listMainContainer}>
        <View style={{ flex: 0.95 }}>
          <View style={styles.listFlatContainer}>
            {this.props.list ? (
              <FlatList
                numColumns={this.props.isListSingleRow ? 1 : 3}
                scrollEnabled={true}
                data={this.props.list}
                keyExtractor={item => item.id.toString()}
                key={`${
                  this.props.isListSingleRow
                    ? item => item.id.toString()
                    : item => item.id * (0.1).toString()
                }`}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        height: this.props.isListSingleRow
                          ? height * 0.2
                          : height * 0.3,
                        width: this.props.isListSingleRow ? width : width * 0.3,
                        marginTop: height * 0.015,
                        marginBottom: height * 0.015,
                        marginLeft: width * 0.015,
                        backgroundColor: this.props.isListSingleRow
                          ? "#fff"
                          : "#BDC3C7",
                        flexDirection: this.props.isListSingleRow
                          ? "row"
                          : "column",
                        borderBottomWidth: this.props.isListSingleRow ? 2 : 0,
                        borderBottomColor: "#BDC3C7"
                      }}
                    >
                      <TouchableOpacity
                        style={{ flex: this.props.isListSingleRow ? 0.2 : 0.8 }}
                        onPress={() => {
                          Actions.movieDetails({ movie: item });
                        }}
                      >
                        <Image
                          indicator={ActivityIndicator}
                          indicatorProps={{
                            borderWidth: 0,
                            color: "rgba(150, 150, 150, 1)",
                            unfilledColor: "rgba(200, 200, 200, 0.2)"
                          }}
                          resizeMethod="resize"
                          source={{ uri: API.IMGPATH + item.poster_path }}
                          style={{
                            width: this.props.isListSingleRow
                              ? width * 0.2
                              : width * 0.3,
                            height: this.props.isListSingleRow
                              ? height * 0.18
                              : height * 0.25
                          }}
                        />
                      </TouchableOpacity>
                      {renderIf(!this.props.isListSingleRow)(
                        <TouchableOpacity
                          onPress={() => {
                            Actions.movieDetails({ movie: item });
                          }}
                          style={styles.flatMultiMain}
                        >
                          <View style={styles.flatMultiTitleContainer}>
                            <Text
                              style={styles.flatMultiTitle}
                              numberOfLines={2}
                            >
                              {" "}
                              {item.title}
                            </Text>
                          </View>
                          <View style={styles.flatMultibtnContainer}>
                            <Icon name="ellipsis-v" size={20} color="#000" />
                          </View>
                        </TouchableOpacity>
                      )}
                      {renderIf(this.props.isListSingleRow)(
                        <TouchableOpacity
                          onPress={() => {
                            Actions.movieDetails({ movie: item });
                          }}
                          style={styles.flatSingleMain}
                        >
                          <View style={styles.flatSingleTitleContainer}>
                            <Text style={styles.flatDate} numberOfLines={2}>
                              {new Date(item.release_date).getFullYear()}
                            </Text>
                            <Text style={styles.flatSTitle} numberOfLines={2}>
                              {" "}
                              {item.title}
                            </Text>
                            <Text style={styles.flatSingleTT}>
                              {item.popularity.toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.flatSigleRateContainer}>
                            <Image
                              indicator={ActivityIndicator}
                              indicatorProps={{
                                borderWidth: 0,
                                color: "rgba(150, 150, 150, 1)",
                                unfilledColor: "rgba(200, 200, 200, 0.2)"
                              }}
                              resizeMethod="resize"
                              source={{
                                uri:
                                  "https://cdn-images-1.medium.com/fit/c/45/45/1*vIR7iO-1GnY2xYxL6NiYkw.png"
                              }}
                              style={styles.rateImage}
                            />
                            <Text style={styles.rateText}>
                              {" "}
                              {item.vote_average}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
