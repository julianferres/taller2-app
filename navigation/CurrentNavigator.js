import React from "react";
import AuthStack from "./AuthStack";
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import SideBarNavigator from "./SideBarNavigator";

const Stack = createStackNavigator();

class Navigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Stack.Navigator>
                {!this.props.loggedIn &&
                    <Stack.Screen options={{ headerShown: false }} name="AuthStack"
                                  children={() => <AuthStack notificationToken={this.props.notificationToken}/>} />}
                {this.props.loggedIn && <Stack.Screen options={{ headerShown: false }} name="SideBarNavigator" component={SideBarNavigator} />}
            </Stack.Navigator>
        );

    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.appReducer.loggedIn };
};

const CurrentNavigator = connect(mapStateToProps)(Navigator);

export default CurrentNavigator;

