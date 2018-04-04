import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, ActivityIndicator } from "react-native";
import * as myActions from "../../actions/tvActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import ListView from "./listView";
class TopRated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvData: [],
      loading: true
    };
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.tvData != this.props.tvData) {
      this.setState({
        tvData: nextProps.tvData,
        loading: !this.state.loading
      });
    }
  };
  componentDidMount = () => {
    this.props.topRated();
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
        <ListView
          list={this.props.tvData}
          isListSingleRow={this.props.isListSingleRow}
        />
      );
    }
  }
}
mapStateToProps = (state, props) => {
  return {
    tvData: state.tvReducer.toprated
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
