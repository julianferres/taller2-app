import React from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View, Keyboard} from "react-native";
import {styles} from "../../constants/InitStackStylesheet";
import { showMessage } from "react-native-flash-message";
import {app} from "../../app/app";
import {ADD_TOKEN, USER_EMAIL, WAITING_RESPONSE} from "../../reducers/appReducer";
import {connect} from "react-redux";
import {AntDesign} from "@expo/vector-icons";

class Login extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
        email: "",
        password: "",
    }
    this.errorMessages = {
        "Incorrect password when trying to log in": "Invalid username and password"
    }
    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  }
  static options = {
      headerStyle: {
          backgroundColor: '#f4511e',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
  }

  validateEmail() {
       return this.emailRegex.test(this.state.email);
  }

  alertLogin(errorMessage){
    showMessage({
      message: "Login Error",
      description: errorMessage,
      type: "danger",
      animationDuration: 500,
      icon: "warning"
    });
  }

  onResponse(response){
      if(response.ok){
        response.json()
            .then(json => {
                this.props.setUserEmail(this.state.email)
                this.props.setToken(json.login_token)
            })
        } else {
        response.json()
            .then(json => {
                this.alertLogin(this.errorMessages[json.message])
            })
        }
        this.props.setWaitingResponse(false);
  }

  handleSubmit(){
      if(!this.validateEmail(this.state.email)){
          this.alertLogin("Please enter a valid email");
          return;
      }
      this.props.setWaitingResponse(true);
      app.apiClient().login(this.state, this.onResponse.bind(this))
  }

  render() {
      return (
          <View style={styles.container}>
              <View style={{flexDirection: "row", alignItems: "center", marginBottom: 50}}>
                  <AntDesign name="youtube" size={50} color="#00335c" />
                  <Text style={{justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: 45,
                      color: "#00335c"}}> Chotuve </Text>
              </View>
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

              <ActivityIndicator style={styles.activityIndicator} color={"#00335c"} size={55} animating={this.props.showWaitingResponse} />

              <TouchableOpacity style={styles.loginBtn} onPress={() => {
                  Keyboard.dismiss()
                  this.handleSubmit()
              }}>
                  <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Sign up")}>
                  <Text style={styles.loginText}>Signup</Text>
              </TouchableOpacity>
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    return {
        showWaitingResponse: state.appReducer.waitingResponse
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWaitingResponse: value => dispatch({ type: WAITING_RESPONSE, payload: value }),
        setToken: token => dispatch({ type: ADD_TOKEN, payload: token }),
        setUserEmail: email => dispatch({ type: USER_EMAIL, payload: email})
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;