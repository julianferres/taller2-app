import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import VideoScreen from "./VideoScreen";

const VideoStack = createStackNavigator();

const navOptionHandler = () => {
    headerShown: false
}

export default function VideoStackNavigator() {
    return(
        <VideoStack.Navigator>
            <VideoStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <VideoStack.Screen name="Video" component={VideoScreen} options={{headerShown: false}}/>
        </VideoStack.Navigator>
    )
}