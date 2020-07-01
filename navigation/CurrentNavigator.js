import React from "react";
import AuthStack from "./AuthStack";
import {connect} from "react-redux";
import SideBarNavigator from "./SideBarNavigator";

class Navigator extends React.Component {
    render() {
        return this.props.loggedIn ? <SideBarNavigator /> : <AuthStack />;
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.appReducer.loggedIn };
};

const CurrentNavigator = connect(mapStateToProps)(Navigator);

export default CurrentNavigator;