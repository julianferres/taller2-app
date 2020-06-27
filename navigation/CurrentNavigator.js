import React from "react";
import HomeStackContainer from "./HomeStack";
import AuthStack from "./AuthStack";
import {connect} from "react-redux";
import { Header } from "@react-navigation/stack";

class Navigator extends React.Component {
    render() {
        return this.props.loggedIn ? <HomeStackContainer /> : <AuthStack />;
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.appReducer.loggedIn };
};

const CurrentNavigator = connect(mapStateToProps)(Navigator);

export default CurrentNavigator;