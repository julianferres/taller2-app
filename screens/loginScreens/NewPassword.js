import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../../constants/InitStackStylesheet";

export default class NewPassword extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            email: "",
            token: "",
            newPassword: ""
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Password Recovery</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Email to recover your password"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter received token"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ token: text })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter your new password"
                        placeholderTextColor="#cad6eb"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.popToTop()}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
