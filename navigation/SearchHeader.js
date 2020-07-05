import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from "../constants/InitStackStylesheet";

export default class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: "row", height: 50, justifyContent: "space-around", alignItems: "center"}}>
                    {
                        this.props.isHome ?
                            <TouchableOpacity style={{flex: 1, flexDirection: "row"}}
                                              onPress={() => this.props.navigation.openDrawer()}>
                                <Octicons name="person" size={30} color="black" style={{padding: 10, paddingLeft: 25}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{flex: 1, flexDirection: "row", paddingTop: 5}}
                                              onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name="ios-arrow-back" size={30} color="black" style={{paddingLeft: 20}}/>
                                <Text style={{paddingTop: 5, paddingLeft: 5}}>Back</Text>
                            </TouchableOpacity>
                    }
                    <View style={styles.searchBox}>
                        <TextInput
                            onEntered={() => this.textInput.focus()}
                            autoFocus={true}
                            ref={(input) => {
                                this.textInput = input;
                            }}
                            style={{flex: 2, height: 50, paddingLeft: 10}}
                            placeholder="Search a Video"
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({searchTerm: text})}
                        />
                    </View>
                </View>
                <LinearGradient
                    colors={['rgba(0,0,0,0.4)', 'transparent']}
                    style={{
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 4,
                    }}/>
            </View>

        )
    }
}