import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TabHeader from './TabHeader'

import Text from 'react-native';
import {CHANGE_HEADER_TITLE} from "../reducers/appReducer";
import {connect} from "react-redux";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

class BottomTabNavigator extends React.Component{
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //navigation.setOptions({ headerTitle: "ASD" });
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
                    }}
                    listeners={() => this.props.changeHeaderText("Home")}
                />
                <BottomTab.Screen
                    name="Messages"
                    component={LinksScreen}
                    options={{
                        title: 'Chat',
                        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-chatboxes" />,
                    }}
                    listeners={() => this.props.changeHeaderText("Chat")}
                />

            </BottomTab.Navigator>
        );
    }
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return <TabHeader tabText="Chotuve"/>
        //return 'Chotuve';
    case 'Messages':
        return <TabHeader tabText="Chotuvecin"/>
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeHeaderText: value => dispatch({ type: CHANGE_HEADER_TITLE, payload: value }),
    }
}

const BottomTabNavigatorContainer = connect(null, mapDispatchToProps)(BottomTabNavigator);

export default BottomTabNavigatorContainer;


