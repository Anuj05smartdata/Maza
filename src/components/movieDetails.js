import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform,
  Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import Image from "react-native-image-progress";
import * as myActions from "../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
var { height, width } = Dimensions.get("window");
import styles from "./styles";
import Carousel from "react-native-smart-carousel";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import Info from "./detailsTab/info";
import Cast from "./detailsTab/cast";
import Review from "./detailsTab/review";
import Share, { ShareSheet, Button } from "react-native-share";
import {API,SOCIALx64,URL} from "../const/const";
import Modal from "react-native-modal";
class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      type: "movie",
      sliderImages: [],
      tabCustomTitle: "",
      info: [],
      cast: [],
      review: [],
      visible: false,
      shareOptions: {},
      isModalVisible: false
    };
  }
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  onCancel() {
    this.setState({ visible: false });
  }
  onOpen() {
    this.setState({ visible: true });
    this.setState({
      shareOptions: {
        title: this.props.movie.title,
        message: this.props.movie.overview,
        url:
          URL.MOVIE +
          this.props.movie.id +
          "-" +
          this.props.movie.title.replace(/ /g, "-"),
        subject: "Cinematics-The Movie APP Movie :" + this.props.movie.title
      }
    });
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.sliderImages != nextProps.sliderImages) {
      this.setState({ sliderImages: nextProps.sliderImages });
    }
    if (this.props.info != nextProps.info) {
      this.setState({ info: nextProps.info });
    }
    if (this.props.cast != nextProps.cast) {
      this.setState({ cast: nextProps.cast });
    }
    if (this.props.review != nextProps.review) {
      this.setState({
        review: nextProps.review,
        loading: !this.state.loading
      });
    }
  };

  componentDidMount = () => {
    this.props.sliderData(this.props.movie.id);
    this.props.getDetailedInfo(this.props.movie.id);
    this.props.getCasts(this.props.movie.id);
    this.props.getReview(this.props.movie.id);
  };

  render() {
    if (this.state.loading) {
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
        <View style={styles.container}>
          <View style={styles.detailsparentView}>
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
            <View style={{ margin: 10, flex: 0.6 }}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {this.state.tabCustomTitle
                  ? this.state.tabCustomTitle
                  : ""}{" "}
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
              <TouchableOpacity onPress={this.onOpen.bind(this)}>
                <Icon
                  name="share-alt"
                  size={20}
                  color="#fff"
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isModalVisible: !this.state.isModalVisible });
                }}
              >
                <Icon
                  name="ellipsis-v"
                  size={20}
                  color="#fff"
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
            </View>
            <Modal isVisible={this.state.isModalVisible} swipeDirection={'right'} onBackdropPress={()=>{this.toggleModal()}}> 
              <View
                style={styles.modalDot}
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <TouchableOpacity style={styles.modalData}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                      Linking.openURL(URL.GOOGLEPLAY);
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={styles.modalText}>Google Play Store</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                      Linking.openURL(URL.GOOGLEPLAY);
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={styles.modalText}>View on IMDb</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                      Linking.openURL(
                       URL.MOVIE +
                          this.props.movie.id +
                          "-" +
                          this.props.movie.title.replace(/ /g, "-")
                      );
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={styles.modalText}>View on TMDb</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                      Linking.openURL(URL.MDbTALK);
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={styles.modalText}>Join The Discussion</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          <View style={styles.caraosulContainer}>
            <View style={{ flex: 0.6 }}>
              <Carousel
                data={this.props.sliderImages}
                autoStart={true}
                playTime={1000}
                height={height * 0.27}
                width={width}
                navigation={true}
                navigationType="dots"
                navigationColor="#fff"
                style={{ resizeMode: "stretch" }}
              />
            </View>
            <View style={styles.detailsTopContentTopConWrap}>
              <View style={styles.detailsTopContent}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.adultIndicator}>
                    {" "}
                    {this.props.movie.adult ? 18 : "N/A"}{" "}
                  </Text>
                  <Icon
                    name="circle"
                    size={8}
                    color="#6C7A89"
                    style={{ padding: 5 }}
                  />
                  <Text style={styles.detailsContent}>
                    {" "}
                    {new Date(this.props.movie.release_date).getFullYear()}{" "}
                  </Text>
                  <Icon
                    name="circle"
                    size={8}
                    color="#6C7A89"
                    style={{ padding: 5 }}
                  />
                  <Text style={styles.detailsContent}>
                    {" "}
                    {Math.floor(this.props.info.runtime / 60)} hr{" "}
                    {this.props.info.runtime % 60} mins
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    {" "}
                    {this.props.movie.title}{" "}
                  </Text>
                </View>
                <View>
                  {this.props.info && this.props.info.genres ? (
                    <FlatList
                      numColumns={4}
                      scrollEnabled={true}
                      data={this.props.info.genres}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({ item, index }) => {
                        return (
                          <View>
                            <Text style={{ color: "#6C7A89" }}>
                              {" "}
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  ) : null}
                </View>
              </View>
            </View>
            <Image
              indicator={ActivityIndicator}
              indicatorProps={{
                color: "rgba(150, 150, 150, 1)",
                unfilledColor: "rgba(200, 200, 200, 0.2)"
              }}
              source={{ uri: API.IMGPATH + this.props.movie.poster_path }}
              style={{
                width: width * 0.2,
                height: height * 0.18,
                position: "absolute",
                zIndex: 999,
                marginTop: height * 0.23,
                marginLeft: width * 0.05
              }}
            />
          </View>

          <ScrollableTabView
            tabBarBackgroundColor="#6C7A89"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#BDC3C7"
            tabBarTextStyle={{ fontFamily: "Arial", fontSize: 12 }}
            tabBarUnderlineStyle={{ backgroundColor: "#3FC380" }}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <Info
              tabLabel="INFO"
              data={{
                info: this.props.info,
                cast: this.props.cast,
                review: this.props.review,
                type: this.state.type
              }}
            />
            <Cast
              tabLabel="CAST"
              data={{
                info: this.props.info,
                cast: this.props.cast,
                review: this.props.review,
                type: this.state.type
              }}
            />
            <Review
              tabLabel="REVIEW"
              data={{
                info: this.props.info,
                cast: this.props.cast,
                review: this.props.review,
                type: this.state.type
              }}
            />
          </ScrollableTabView>
          <ShareSheet
            visible={this.state.visible}
            onCancel={this.onCancel.bind(this)}
          >
            <Button
              iconSrc={{ uri: SOCIALx64.TWITTER_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(
                    Object.assign(this.state.shareOptions, {
                      social: "twitter"
                    })
                  );
                }, 300);
              }}
            >
              Twitter
            </Button>
            <Button
              iconSrc={{ uri: SOCIALx64.FACEBOOK_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(
                    Object.assign(this.state.shareOptions, {
                      social: "facebook"
                    })
                  );
                }, 300);
              }}
            >
              Facebook
            </Button>
            <Button
              iconSrc={{ uri: SOCIALx64.WHATSAPP_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(
                    Object.assign(this.state.shareOptions, {
                      social: "whatsapp"
                    })
                  );
                }, 300);
              }}
            >
              Whatsapp
            </Button>
            <Button
              iconSrc={{ uri: SOCIALx64.GOOGLE_PLUS_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(
                    Object.assign(this.state.shareOptions, {
                      social: "googleplus"
                    })
                  );
                }, 300);
              }}
            >
              Google +
            </Button>
            <Button
              iconSrc={{ uri: SOCIALx64.EMAIL_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(
                    Object.assign(this.state.shareOptions, {
                      social: "email"
                    })
                  );
                }, 300);
              }}
            >
              Email
            </Button>
            <Button
              iconSrc={{ uri: SOCIALx64.CLIPBOARD_ICON }}
              onPress={() => {
                this.onCancel();
                setTimeout(() => {
                  if (typeof this.state.shareOptions["url"] !== undefined) {
                    Clipboard.setString(this.state.shareOptions["url"]);
                    if (Platform.OS === "android") {
                      ToastAndroid.show(
                        "link Copied to Clipboard",
                        ToastAndroid.SHORT
                      );
                    } else if (Platform.OS === "ios") {
                      AlertIOS.alert("Link Copied to Clipboard");
                    }
                  }
                }, 300);
              }}
            >
              Copy Link
            </Button>
          </ShareSheet>
        </View>
      );
    }
  }
}
mapStateToProps = (state, props) => {
  return {
    sliderImages: state.searchReducer.data,
    info: state.detailReducer.data,
    cast: state.castReducer.data,
    review: state.reviewReducer.data
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);