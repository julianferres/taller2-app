import * as React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";

export default function ConversationScreen({navigation}) {
    return(
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
            <CustomHeader title="Chat" navigation={navigation}/>
            <Text>
                Conversacion
            </Text>
        </View>
    )
}