import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
}

