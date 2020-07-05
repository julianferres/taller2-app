import * as React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {AntDesign, Octicons, Ionicons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";

export default function CustomHeader({title, isHome, navigation}){
    let [fonts] = useFonts({"OpenSans": require('../assets/fonts/OpenSans-SemiBold.ttf')})

    if(!fonts){
        return <AppLoading />
    }

    return(
        <View>
            <View style={{flexDirection: "row", height: 50, justifyContent: "space-around", alignItems: "center"}}>
                {
                    isHome ?
                        <TouchableOpacity style={{flex: 1, flexDirection: "row"}}
                                          onPress={() => navigation.openDrawer()}>
                            <Octicons name="person" size={30} color="black" style={{padding: 10, paddingLeft: 25}} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{flex:1, flexDirection: "row", paddingTop: 5}}
                                          onPress={() => navigation.goBack()} >
                            <Ionicons name="ios-arrow-back" size={30} color="black" style={{paddingLeft: 20}} />
                            <Text style={{paddingTop: 5, paddingLeft: 5}}>Back</Text>
                        </TouchableOpacity>
                }
                <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{textAlign: "center", fontSize: 25, fontFamily: "OpenSans"}}>{title}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                    <AntDesign name="youtube" size={40} color="#00335c" />
                </View>
            </View>
            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'transparent']}
                style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 4,
                }} />
        </View>

    )
}