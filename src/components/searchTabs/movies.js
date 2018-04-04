import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import ListView from "../tabs/listView";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  componentWillReceiveProps = nextProps => {
    if (this.props.movies != nextProps.movies) {
      this.setState({
        movies: nextProps.movies
      });
    }
    if (this.props.data != nextProps.data) {
      this.setState({ movies: [] });
      this.props.filter(this.props.data, "movie");
    }
  };
  render() {
    return <ListView list={this.props.movies} isListSingleRow={true} />;
  }
}

mapStateToProps = (state, props) => {
  return {
    movies: state.filterMovieReducer.data
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
