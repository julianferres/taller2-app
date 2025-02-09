import React from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {styles} from "../../constants/InitStackStylesheet";
import {showMessage} from "react-native-flash-message";
import {app} from "../../app/app";
import {ADD_TOKEN, WAITING_RESPONSE} from "../../reducers/appReducer";
import {connect} from "react-redux";
import {AntDesign} from "@expo/vector-icons";

class Login extends React.Component {
    static options = {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.errorMessages = {
            "Incorrect password when trying to log in": "Invalid username and password"
        }
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    }

    validateEmail() {
        return this.emailRegex.test(this.state.email);
    }

    alertLogin(errorMessage) {
        showMessage({
            message: "Login Error",
            description: errorMessage,
            type: "danger",
            animationDuration: 500,
            icon: "warning"
        });
    }

    onResponse(response) {
        if (response.ok) {
            response.json()
                .then(json => {
                    this.props.setToken(json.login_token, this.state.email)
                })
        } else {
            response.json()
                .then(json => {
                    this.alertLogin(this.errorMessages[json.message])
                })
        }
        this.props.setWaitingResponse(false);
    }

    handleSubmit() {
        if (!this.validateEmail(this.state.email)) {
            this.alertLogin("Please enter a valid email");
            return;
        }

        if(this.state.password.length < 4 || !/\d/.test(this.state.password)){
            this.alertLogin("Your password should have at least four characters and a number.")
            return;
        }

        this.props.setWaitingResponse(true);
        let data = this.state
        data.notification_token = this.props.notificationToken;
        app.apiClient().login(data, this.onResponse.bind(this))
    }

    fetchingComponent(){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color:"#00335c", paddingBottom:25, fontSize: 25}}>Loading ...</Text>
                <ActivityIndicator color={"#00335c"} size={55} />
            </View>
        )
    }

    render() {
        if(this.props.isFetchingCredentials){
            return this.fetchingComponent()
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    enabled={false}
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 50}}>
                        <AntDesign name="youtube" size={50} color="#00335c"/>
                        <Text style={{
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: 45,
                            color: "#00335c"
                        }}> Chotuve </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="#cad6eb"
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor="#cad6eb"
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgot password")}>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <ActivityIndicator style={styles.activityIndicator} color={"#00335c"} size={55}
                                       animating={this.props.showWaitingResponse}/>

                    <TouchableOpacity style={styles.loginBtn} onPress={() => {
                        Keyboard.dismiss()
                        this.handleSubmit()
                    }}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Sign up")}>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        showWaitingResponse: state.appReducer.waitingResponse,
        isFetchingCredentials: state.appReducer.isFetchingCredentials
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWaitingResponse: value => dispatch({type: WAITING_RESPONSE, payload: value}),
        setToken: (token, email) => dispatch({type: ADD_TOKEN, payload: {token: token, userEmail: email}}),
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;