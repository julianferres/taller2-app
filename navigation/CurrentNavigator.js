import React from "react";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import {connect} from "react-redux";

class Navigator extends React.Component {
    render() {
        return this.props.loggedIn ? <HomeStack /> : <AuthStack />;
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.appReducer.loggedIn };
};

const CurrentNavigator = connect(mapStateToProps)(Navigator);

export default CurrentNavigator;