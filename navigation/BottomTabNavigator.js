import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TabHeader from './TabHeader'

const BottomTab = createBottomTabNavigator();

export default class BottomTabNavigator extends React.Component{
    constructor(props) {
        super(props);
        this.initialRoutName = "Home";
    }

    getHeaderTitle(route) {
        const routeName = route.state?.routes[route.state.index]?.name ?? this.initialRoutName;
        switch (routeName) {
            case 'Home':
                return <TabHeader headerTitle="Chotuve"/>
            case 'Messages':
                return <TabHeader headerTitle="Chotuvecin"/>
        }
    }

    render() {
        this.props.navigation.setOptions({ headerTitle: this.getHeaderTitle(this.props.route) });
        return (
            <BottomTab.Navigator initialRouteName={this.initialRoutName}>
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
                    }}
                />
                <BottomTab.Screen
                    name="Messages"
                    component={LinksScreen}
                    options={{
                        title: 'Chat',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-chatboxes" />,
                    }}
                />

            </BottomTab.Navigator>
        );
    }
}

