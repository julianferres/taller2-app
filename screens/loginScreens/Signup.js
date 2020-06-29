import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { styles } from "../../constants/InitStackStylesheet";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            photo: ""
        }
        this.errorMessages = {
            "Incorrect Email when trying to recover password.": "Invalid Email"
        }
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }
    validateEmail() {
        return this.emailRegex.test(this.state.email);
    }

    alertSignup(errorMessage) {
        showMessage({
            message: errorMessage,
            type: "danger",
            animationDuration: 500
        });
    }
    showSuccessfulMessage() {
        showMessage({
            message: "User Successfully Created",
            type: "success",
            animationDuration: 500
        });
    }




    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Sign up</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Full Name"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ fullName: text })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Photo"
                        placeholderTextColor="#cad6eb"
                        onChangeText={(text) => this.setState({ photo: text })}
                    // TODO: ver esto porque no tiene que ser texto
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
