import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ChatStackNavigator from "../screens/bottomScreens/chat/ChatStack";
import VideoStackNavigator from "../screens/bottomScreens/video/VideoStack";
import SearchStack from "../screens/bottomScreens/search/SearchStack";

const BottomTab = createBottomTabNavigator();

export default class BottomTabNavigator extends React.Component{
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
                        title: 'Home',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
                    }}
                />
                <BottomTab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-search" />,
                    }}
                />
                <BottomTab.Screen
                    name="Messages"
                    component={ChatStackNavigator}
                    options={{
                        title: 'Chat',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-chatboxes" />,
                    }}
                />

            </BottomTab.Navigator>
        );
    }
}

