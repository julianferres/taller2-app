import * as React from 'react';
import BottomTabNavigatorContainer from "./BottomTabNavigator";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import TabHeader from "./TabHeader";

const Stack = createStackNavigator();

class HomeStack extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigatorContainer}
                              options={{ headerTitle: () => <TabHeader headerTitle={this.props.headerTitle} /> }}
                />
            </Stack.Navigator>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        headerTitle: state.appReducer.headerTitle
    }
}

const HomeStackContainer = connect(mapStateToProps, null)(HomeStack);

export default HomeStackContainer;

