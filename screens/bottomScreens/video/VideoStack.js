import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import VideoVisualizationScreen from "./VideoVisualizationScreen";

const VideoStack = createStackNavigator();

const navOptionHandler = () => {
    headerShown: false
}

export default function VideoStackNavigator() {
    return(
        <VideoStack.Navigator>
            <VideoStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <VideoStack.Screen name="VideoVisualization" component={VideoVisualizationScreen} options={{headerShown: false}}/>
        </VideoStack.Navigator>
    )
}