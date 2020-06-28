import * as React from 'react';
import {View, ScrollView, Text, TouchableOpacity, StatusBar} from "react-native";
import {SimpleLineIcons, MaterialCommunityIcons} from "@expo/vector-icons";

export default function CustomDrawer(props){
    return(
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
            <ScrollView style={{marginLeft: 10}}>
                <TouchableOpacity style={{marginTop: 20, flex: 1, justifyContent: "center", flexDirection: "row"}}>
                    <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                 style={{marginTop: 5, flex: 1, flexDirection: "row"}}
                 onPress={() => props.navigation.navigate("TabMenu")}
                >
                    <SimpleLineIcons name="menu" size={30} color="black" />
                    <Text style={{fontSize: 20, paddingLeft: 10}}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                    onPress={() => props.navigation.navigate("Profile")}
                >
                    <SimpleLineIcons name="cloud-upload" size={30} color="black" />
                    <Text style={{fontSize: 20, paddingLeft: 10}}>Upload new video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                    onPress={() => props.navigation.navigate("Profile")}
                >
                    <SimpleLineIcons name="user" size={30} color="black" />
                    <Text style={{fontSize: 20, paddingLeft: 10}}>Edit my profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                >
                    <SimpleLineIcons name="logout" size={30} color="black" />
                    <Text style={{fontSize: 20, paddingLeft: 10}}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}