import React from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";

export default class Login extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            photo: ""
        }
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
                <TouchableOpacity>
                <Text style={styles.loginText}>Already Registered? Login</Text>
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
    fontSize: 45,
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
