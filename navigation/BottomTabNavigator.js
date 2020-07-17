import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import ChatStackNavigator from "../screens/bottomScreens/chat/ChatStack";
import VideoStackNavigator from "../screens/bottomScreens/video/VideoStack";
import SearchStack from "../screens/bottomScreens/search/SearchStack";
import TabBarLabel from "../components/TabBarLabel";
import {Notifications} from 'expo';
import {Vibration} from "react-native";
import {connect} from "react-redux";
import {USER_INFORMATION} from "../reducers/appReducer";
import {app} from "../app/app";


const BottomTab = createBottomTabNavigator();


export default class BottomTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.initialRoutName = "Home";

    }

    render() {
        return (
            <BottomTab.Navigator initialRouteName={this.initialRoutName}>
                <BottomTab.Screen
                    name="Home"
                    component={VideoStackNavigator}
                    options={{
                        tabBarLabel: ({focused}) => <TabBarLabel focused={focused} label="Home" />,
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-home"/>
                    }}
                />
                <BottomTab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{
                        tabBarLabel: ({focused}) => <TabBarLabel focused={focused} label="Search" />,
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-search"/>,
                    }}

                />
                <BottomTab.Screen
                    name="Messages"
                    component={ChatStackNavigator}
                    options={{
                        tabBarLabel: ({focused}) => <TabBarLabel focused={focused} label="Chat" />,
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-chatboxes"/>,
                    }}
                />

            </BottomTab.Navigator>
        );
    }
}