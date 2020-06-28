import * as React from 'react';
import BottomTabNavigator from "./BottomTabNavigator";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class HomeStack extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator}  />
            </Stack.Navigator>
        );
    }
}

