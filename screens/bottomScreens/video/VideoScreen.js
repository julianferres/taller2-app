import * as React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";

export default function VideoScreen({navigation}) {
    return(
        <View style={{flex: 1, paddingTop: 25}}>
            <CustomHeader title="Watch Video" navigation={navigation}/>
            <Text>
                Video
            </Text>
        </View>
    )
}