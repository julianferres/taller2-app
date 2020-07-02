import * as React from 'react';
import {Text, View, StatusBar} from "react-native";
import CustomHeader from "../../navigation/CustomHeader";

export default function ProfileScreen({navigation}) {
    return(
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
            <CustomHeader title="Profile" navigation={navigation}/>
            <Text>
                Profile
            </Text>
        </View>
    )
}