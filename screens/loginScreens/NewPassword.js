import React from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";

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
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00335c",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "white",
        marginBottom: 40,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    forgot: {
        color: "white",
        fontSize: 12,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: "white",
        fontSize: 16,
    },
});
