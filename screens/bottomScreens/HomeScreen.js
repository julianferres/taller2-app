import * as React from 'react';
import {Button, Text, View} from 'react-native';
import SideBarNavigator from "../../navigation/SideBarNavigator"

export default function HomeScreen() {
    return(
        <>
        <SideBarNavigator />
            <View>
                <Text>
                    Home
                </Text>
            </View>
        </>
    )
}



