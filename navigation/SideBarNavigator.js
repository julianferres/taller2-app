import * as React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer"
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/drawerScreens/ProfileScreen";
import CustomDrawer from "../screens/drawerScreens/CustomDrawer";
import UploadVideoScreen from "../screens/drawerScreens/upload/UploadVideoScreen";
import VideoDetailScreen from "../screens/drawerScreens/upload/VideoDetailScreen";

const Drawer = createDrawerNavigator();

export default function SideBarNavigator(){
    return(
        <Drawer.Navigator drawerContent={props => CustomDrawer(props)} >
            <Drawer.Screen name="TabMenu" component={BottomTabNavigator} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="UploadVideo" component={UploadVideoScreen} />
            <Drawer.Screen name="VideoDetail" component={VideoDetailScreen} />
        </Drawer.Navigator>
    )
}

