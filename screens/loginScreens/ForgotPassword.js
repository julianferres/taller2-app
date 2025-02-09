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
import {app} from "../../app/app";
import {EMAIL_TO_RECOVER, WAITING_RESPONSE} from "../../reducers/appReducer";
import {connect} from "react-redux";
import {showMessage} from "react-native-flash-message";


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
        this.errorMessages = {
            "Incorrect Email when trying to recover password.": "Invalid Email"
        }
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }

    validateEmail() {
        return this.emailRegex.test(this.state.email);
    }

    alertForgotPassword(errorMessage) {
        showMessage({
            message: errorMessage,
            type: "danger",
            animationDuration: 500,
            icon: "warning"
        });
    }

    onResponse(response) {
        if (response.ok) {
            this.props.setEmailToRecover(this.state.email)
            this.props.navigation.navigate("New password")
        } else {
            response.json()
                .then(json => {
                    this.alertForgotPassword(this.errorMessages[json.message])
                })
        }
        this.props.setWaitingResponse(false);
    }

    handleSubmit() {
        if (!this.validateEmail(this.state.email)) {
            this.alertForgotPassword("Please enter a valid email");
            return;
        }
        this.props.setWaitingResponse(true);
        app.apiClient().forgotPassword(this.state, this.onResponse.bind(this))
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    enabled={false}
                    style={styles.container}
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <Text style={styles.forgotPasswordLogo}>Password Recovery</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter Email to recover your password"
                            placeholderTextColor="#cad6eb"
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>

                    <ActivityIndicator style={styles.activityIndicator} color={"#00335c"} size={55}
                                       animating={this.props.showWaitingResponse}/>

                    <TouchableOpacity style={styles.loginBtn}
                                      onPress={() => {
                                          Keyboard.dismiss()
                                          this.handleSubmit()
                                      }}
                    >
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
        setWaitingResponse: value => dispatch({type: WAITING_RESPONSE, payload: value}),
        setEmailToRecover: value => dispatch({type: EMAIL_TO_RECOVER, payload: value})
    }
}

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

export default ForgotPasswordContainer;