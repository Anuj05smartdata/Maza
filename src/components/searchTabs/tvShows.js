import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import ListView from "../TVTabs/listView";
class TVShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv: []
    };
  }
  componentWillReceiveProps = nextProps => {
    if (this.props.tv != nextProps.tv) {
      this.setState({
        tv: nextProps.tv
      });
    }
    if (this.props.data != nextProps.data) {
      this.setState({ tv: [] });
      this.props.filter(this.props.data, "tv");
    }
  };
  render() {
    return <ListView list={this.props.tv} isListSingleRow={true} />;
  }
}

mapStateToProps = (state, props) => {
  return {
    tv: state.filterTVReducer.data
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TVShows);
