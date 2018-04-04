import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    View,
    ScrollView,
    Text,
    Platform,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as myActions from "../../actions/";
import DismissKeyboard from "react-native-dismiss-keyboard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles";
var { height, width } = Dimensions.get("window");
import { URL, METHOD } from "../../const/const";
import Image from "react-native-image-progress";
import { Dropdown } from "react-native-material-dropdown";
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: 2018,
            to: 2018,
            genres: [],
            selectedGenre: "",
        };
    }

    componentDidMount = () => {
        this.props.getGenre();
    };
    componentWillReceiveProps = nextProps => {
        if (this.props.genres != nextProps.genres) {
            this.setState({ genres: nextProps.genres });
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 0.08,
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "#333435"
                    }}
                >
                    <View style={{ margin: 10, flex: 0.7 }}>
                        <Text style={{ textAlign: "left", fontSize: 20, color: "#fff" }}>
                            Filter
              </Text>
                    </View>
                    <TouchableOpacity
                        style={{ margin: 10, flex: 0.3 }}
                        onPress={() => {
                            this.props.applyFilter(
                                this.state.selectedGenre,
                                this.state.from,
                                this.state.to
                            );
                        }}
                    >
                        <Text style={{ textAlign: "right", fontSize: 16, color: "#fff" }}>
                            Apply
              </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 0.92,
                        flexDirection: "column",
                        backgroundColor: "#fff"
                    }}
                >
                    <View style={{ backgroundColor: "#BDC3C7" }}>
                        <Text>Year Range</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.5 }}>
                            <Dropdown
                                value={this.state.from}
                                data={METHOD.getYears()}
                                onChangeText={selected => {
                                    this.setState({ from: selected });
                                }}
                            />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Dropdown
                                value={this.state.to}
                                data={METHOD.getYears()}
                                onChangeText={selected => {
                                    if (this.state.from < this.state.to)
                                        this.setState({ to: selected });
                                    else this.setState({ to: this.state.from });
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#BDC3C7" }}>
                        <Text>Genres</Text>
                    </View>
                    <Dropdown
                        label="ALL"
                        data={this.props.genres}
                        onChangeText={selected =>
                            this.props.genres.forEach(item => {
                                if (item.value == selected)
                                    this.setState({ selectedGenre: item.id });
                            })
                        }
                    />
                </View>
            </View>
        );
    }
}
mapStateToProps = (state, props) => {
    return {
        genres: state.launchReducer.genres
    };
};

mapDispatchToProps = dispatch => {
    return bindActionCreators(myActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
