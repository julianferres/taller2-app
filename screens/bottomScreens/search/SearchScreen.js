import * as React from 'react';
import {StatusBar, View} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";

export default function SearchScreen({navigation}) {
    return (
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
            <CustomHeader title="Search" isHome={false} navigation={navigation}/>
        </View>
    )
}