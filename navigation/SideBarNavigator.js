import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer"
import BottomTabNavigator from "./BottomTabNavigator";
import EditProfileScreen from "../screens/drawerScreens/EditProfileScreen";
import CustomDrawerContainer from "../screens/drawerScreens/CustomDrawer";
import UploadVideoScreen from "../screens/drawerScreens/upload/UploadVideoScreen";
import VideoDetailScreen from "../screens/drawerScreens/upload/VideoDetailScreen";
import FriendshipRequestsScreen from "../screens/drawerScreens/friendship/FriendshipRequestsScreen";
import UserProfileScreen from "../screens/general/UserProfileScreen";
import FriendsScreen from "../screens/drawerScreens/friendship/FriendsScreen";
import ConversationScreen from "../screens/general/ConversationScreen";
import MyProfileScreen from "../screens/drawerScreens/MyProfileScreen";

const Drawer = createDrawerNavigator();

export default function SideBarNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContainer {...props}/>}>
            <Drawer.Screen name="TabMenu" component={BottomTabNavigator} />
            <Drawer.Screen name="EditProfile" component={EditProfileScreen}/>
            <Drawer.Screen name="UploadVideo" component={UploadVideoScreen} />
            <Drawer.Screen name="VideoDetail" component={VideoDetailScreen} />
            <Drawer.Screen name="Requests" component={FriendshipRequestsScreen} />
            <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
            <Drawer.Screen name="Friends" component={FriendsScreen} />
            <Drawer.Screen name="Conversation" component={ConversationScreen} />
            <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
        </Drawer.Navigator>
    )
}

