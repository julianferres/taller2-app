import * as React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {AntDesign, Octicons, Ionicons} from "@expo/vector-icons";

export default function CustomHeader({title, isHome, navigation}){
    return(
        <View style={{flexDirection: "row", height: 50}}>
            {
                isHome ?
                    <TouchableOpacity style={{flex: 1, flexDirection: "row"}}
                    onPress={() => navigation.openDrawer()}>
                        <Octicons name="person" size={30} color="black" style={{padding: 10}} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{flex:1, flexDirection: "row", paddingTop: 5}}
                    onPress={() => navigation.goBack()} >
                        <Ionicons name="ios-arrow-back" size={30} color="black" style={{paddingTop: 10, paddingLeft: 10}} />
                        <Text style={{paddingTop: 15, paddingLeft: 5}}>Back</Text>
                    </TouchableOpacity>
            }
            <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
                <Text style={{textAlign: "center", fontSize: 30, marginTop: 5, marginRight: 30}}>{title}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <AntDesign name="youtube" size={50} color="blue" />
            </View>
        </View>
    )
}