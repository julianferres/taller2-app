import React from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import {styles} from "../../constants/InitStackStylesheet";

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            email: "",
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
              <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate("New password")}>
                  <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
          </View>
        );
    }
}
