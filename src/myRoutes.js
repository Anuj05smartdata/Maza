import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Stack,
  Scene,
  Router,
  ActionConst,
  Drawer,
  Overlay,
  Modal
} from "react-native-router-flux";
import LAUNCH from "./components/launch";
import Search from "./components/search";
import TVShows from "./components/tvShowsBar";
import sidebarComponent from "./components/sidebar";
import * as myActions from "./actions/";
// import Home from './components/home'
import icon from "./img/icon.png";
import styles from "./components/styles";
import movieDetails from "./components/movieDetails";
import tvDetails from "./components/tvDetails";
import Menu from "./components/menuComponent";
import People from "./components/popular/popularPeople";
import DiscoverMovies from "./components/discover/discover";
import DiscoverPerson from "./components/personDetails";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Filter from './components/Menus/filter';
class MyRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('router : ',this.props);
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        barButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}
      >
        <Stack key="root" hideNavBar hideTabBar>
          <Drawer
            hideNavBar
            key="drawer"
            contentComponent={this.props.rightDrawer?Filter:sidebarComponent}
            drawerImage={icon}
            drawerWidth={this.props.rightDrawer?300:250}
            title="Cinematics"
            drawerPosition={this.props.rightDrawer?"right":"left"}
          >
            <Scene
              key="Launch"
              component={LAUNCH}
              title="Cinematics"
              hideTabBar
              hideNavBar
              
            />
            <Scene
              key="TVShows"
              component={TVShows}
              title="Cinematics"
              hideTabBar
              hideNavBar
            />
            <Scene
              key="movieDetails"
              component={movieDetails}
              title="Movie Details"
              hideNavBar
              hideTabBar
            />
            <Scene
              key="tvDetails"
              component={tvDetails}
              title="TV Show Details"
              hideNavBar
              hideTabBar
            />
            <Scene
              key="Search"
              component={Search}
              title="Cinematics"
              hideTabBar
              hideNavBar
            />
            <Scene
              key="popularPeople"
              component={People}
              title="Popular People"
              hideTabBar
              hideNavBar
            />
            <Scene key="discover">
              <Scene
                key="discoverMovies"
                component={DiscoverMovies}
                hideTabBar
                hideNavBar
                initial
              />
              <Scene
                key="discoverPerson"
                component={DiscoverPerson}
                hideTabBar
                hideNavBar
              />
            </Scene>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

mapStateToProps=(state,props)=>{
  return{
    rightDrawer: state.launchReducer.position,
  }
}

mapDispatchToProps=dispatch=>{
  return bindActionCreators(myActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MyRouter);