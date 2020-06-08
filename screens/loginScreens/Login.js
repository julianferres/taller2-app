import React from "react";
import { TextInput, Text, View, TouchableOpacity, Alert} from "react-native";
import {styles} from "../../constants/InitStackStylesheet";
import {app} from "../../app/app";

export default class Login extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
        email: "",
        password: "",
    }
  }

  alertLogin(errorMessage){
      Alert.alert(
          "Login error",
          errorMessage,
          [{text: "Close", style: "cancel"}],
          { cancelable: false }
      )
  }

  onResponse(response){
      console.log(response);
      this.alertLogin("Muchos errores huevon");
  }

  handleSubmit(){
      app.apiClient().login(this.state, this.onResponse.bind(this))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Chotuve App</Text>
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
        <TouchableOpacity  onPress={() => this.props.navigation.navigate("Forgot password")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.handleSubmit()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Sign up")}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
