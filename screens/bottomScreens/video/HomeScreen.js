import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";

export default function HomeScreen({navigation}) {
    return(
        <View style={{flex: 1, paddingTop: 25}}>
            <CustomHeader title="Home" isHome={true} navigation={navigation}/>
            <Text>
                Home
            </Text>
            <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate("Video")}>
                <Text>
                    Watch video!
                </Text>
            </TouchableOpacity>
        </View>
    )
}



