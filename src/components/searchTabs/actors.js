import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
import PersonList from "../personList";
class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: []
    };
  }
  componentWillReceiveProps = nextProps => {
    if (this.props.person != nextProps.person) {
      this.setState({
        person: nextProps.person
      });
    }
    if (this.props.data != nextProps.data) {
      this.setState({ person: [] });
      this.props.filter(this.props.data, "person");
    }
  };
  render() {
    return <PersonList data={this.props.person} />;
  }
}

mapStateToProps = (state, props) => {
  return {
    person: state.filterPersonReducer.data
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(myActions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Actors);
