import * as React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomHeader({title, isHome, navigation}){
    const azulMarino = "#00335c"

    return<View>
        <View style={{flexDirection: "row", height: 50, justifyContent: "space-around", alignItems: "center"}}>
            {
                isHome ?
                    <TouchableOpacity style={{flex: 1, flexDirection: "row"}}
                                      onPress={() => navigation.openDrawer()}>
                        <Ionicons name="ios-person" size={30} color={azulMarino} style={{padding: 10, paddingLeft: 30}} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{flex:1, flexDirection: "row", color: "#00335c"}}
                                      onPress={() => navigation.goBack()} >
                        <Ionicons name="ios-arrow-back" size={30} color={azulMarino} style={{paddingLeft: 20}} />
                        <Text style={{paddingTop: 4, color:azulMarino, paddingLeft: 5}}>Back</Text>
                    </TouchableOpacity>
            }
            <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
                <Text style={{textAlign: "center", fontSize: 25, color:azulMarino, paddingBottom:5, fontFamily: "OpenSans"}}>{title}</Text>
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
}