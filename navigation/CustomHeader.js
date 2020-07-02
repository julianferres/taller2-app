import * as React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {AntDesign, Octicons, Ionicons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from "@use-expo/font";


export default function CustomHeader({title, isHome, navigation}){
    let [fonts] = useFonts({"tradeGothic": require('../assets/fonts/TradeGothicLT-Bold.ttf')})

    if(!fonts){
        return <View />
    }

    return(
        <View>
            <View style={{flexDirection: "row", height: 50, justifyContent: "space-around"}}>
                {
                    isHome ?
                        <TouchableOpacity style={{flex: 1, flexDirection: "row"}}
                                          onPress={() => navigation.openDrawer()}>
                            <Octicons name="person" size={30} color="black" style={{padding: 10, paddingLeft: 20}} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{flex:1, flexDirection: "row", paddingTop: 5}}
                                          onPress={() => navigation.goBack()} >
                            <Ionicons name="ios-arrow-back" size={30} color="black" style={{paddingTop: 10, paddingLeft: 20}} />
                            <Text style={{paddingTop: 15, paddingLeft: 5}}>Back</Text>
                        </TouchableOpacity>
                }
                <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{textAlign: "center", fontSize: 30, marginTop: 5, marginRight: 30, fontFamily: "tradeGothic"}}>{title}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                    <AntDesign name="youtube" size={50} color="#00335c" />
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