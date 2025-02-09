import * as React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import VideoVisualizationScreen from "./VideoVisualizationScreen";
import UserProfileScreen from "../../general/UserProfileScreen";

const VideoStack = createStackNavigator();

export default function VideoStackNavigator() {
    return(
        <VideoStack.Navigator>
            <VideoStack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <VideoStack.Screen name="VideoVisualization" component={VideoVisualizationScreen} options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <VideoStack.Screen name="UserProfile" component={UserProfileScreen} options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
        </VideoStack.Navigator>
    )
}