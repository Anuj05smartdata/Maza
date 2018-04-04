import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  View,
  BackgroundImage,
  TextInput,
  FlatList,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/discoverActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import { API } from "../../const/const";
import ListView from "../tabs/listView";
import Modal from "react-native-modal";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import { Radio, List, ListItem, Right } from "native-base";
class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isListSingleRow: true,
      loading: true,
      isVisible: false,
      selectedItem: "popularity.desc",
      isFilterVisible: false
    };
  }


  componentDidMount = () => {
    this.props.discover(this.state.selectedItem,this.props.genre&&this.props.genre,this.props.to&&this.props.to,this.props.from&&this.props.from);
  };

  componentWillReceiveProps = nextProps => {
    console.log("next props: ",nextProps);
    if (this.props.movies != nextProps.movies)
      this.setState({
        movies: nextProps.movies,
        loading: false
      });
  };

  render() {
    console.log("disocver: ",this.props);
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
          <View
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#333435"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={async() => {
                  await this.props.updatePostionDrawer(false);
                  Actions.drawerOpen();
                }}
              >
                <Icon
                  name="bars"
                  size={25}
                  color="#fff"
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              <View style={{ margin: 10 }}>
                <Text
                  style={{ textAlign: "left", fontSize: 25, color: "#fff" }}
                >
                  Discover
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={async() => {
                  await this.props.updatePostionDrawer(true);
                  Actions.drawerOpen();
                }}
              >
                <Icon name="filter" size={25} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  this.setState({ isVisible: true });
                }}
              >
                <Icon name="sort" size={25} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  this.setState({
                    isListSingleRow: !this.state.isListSingleRow
                  });
                }}
              >
                <Icon
                  name={this.state.isListSingleRow ? "table" : "list-ul"}
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
          <ListView
            style={{ flex: 0.9 }}
            list={this.props.movies}
            isListSingleRow={this.state.isListSingleRow}
          />
          <Modal
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <View style={{ backgroundColor: "#fff", flex: 0.6 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 15
                }}
              >
                Apply Sorting By
              </Text>
              <List>
                <ListItem
                  onPress={() => {
                    this.setState({
                      selectedItem: "original_title.desc",
                      isVisible: false,
                      loading: true
                    });
                    this.props.discover(this.state.selectedItem);
                  }}
                >
                  <Radio
                    selected={this.state.selectedItem == "original_title.desc"}
                  />
                  <Text style={styles.radio}>Title</Text>
                </ListItem>
                <ListItem
                  onPress={() => {
                    this.setState({
                      selectedItem: "popularity.desc",
                      isVisible: false,
                      loading: true
                    });
                    this.props.discover(this.state.selectedItem);
                  }}
                >
                  <Radio
                    selected={this.state.selectedItem == "popularity.desc"}
                  />
                  <Text style={styles.radio}>Popularity</Text>
                </ListItem>
                <ListItem
                  onPress={() => {
                    this.setState({
                      selectedItem: "vote_average.desc",
                      isVisible: false,
                      loading: true
                    });
                    this.props.discover(this.state.selectedItem);
                  }}
                >
                  <Radio
                    selected={this.state.selectedItem == "vote_average.desc"}
                  />
                  <Text style={styles.radio}>Rating</Text>
                </ListItem>
                <ListItem
                  onPress={() => {
                    this.setState({
                      selectedItem: "release_date.desc",
                      isVisible: false,
                      loading: true
                    });
                    this.props.discover(this.state.selectedItem);
                  }}
                >
                  <Radio
                    selected={this.state.selectedItem == "release_date.desc"}
                  />
                  <Text style={styles.radio}>Release Date</Text>
                </ListItem>
                <ListItem
                  onPress={() => {
                    this.setState({
                      selectedItem: "revenue.desc",
                      isVisible: false,
                      loading: true
                    });
                    this.props.discover(this.state.selectedItem);
                  }}
                >
                  <Radio selected={this.state.selectedItem == "revenue.desc"} />
                  <Text style={styles.radio}>Revenue</Text>
                </ListItem>
              </List>
              <Text
                style={{
                  textAlign: "right",
                  color: "green",
                  fontSize: 12,
                  marginRight: 10
                }}
                onPress={() => this.setState({ isVisible: false })}
              >
                CANCEL
              </Text>
            </View>
          </Modal>
        </View>
      );
    }
  }
}
mapStateToProps = (state, props) => {
  return {
    movies:state.discoverReducer.data,
    genre: state.discoverReducer.genre,
    from: state.discoverReducer.from,
    to: state.discoverReducer.to
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
