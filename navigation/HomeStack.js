import * as React from 'react';
import BottomTabNavigator from "./BottomTabNavigator";
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
                <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
        );
    }
}

