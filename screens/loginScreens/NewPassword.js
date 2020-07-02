import React from "react";
import { ActivityIndicator, Alert, TextInput, Text, View, TouchableOpacity, Keyboard } from "react-native";
import { styles } from "../../constants/InitStackStylesheet";
import { app } from "../../app/app";
import { WAITING_RESPONSE, EMAIL_TO_RECOVER } from "../../reducers/appReducer";
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";


class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.targetEmail,
            token: "",
            new_password: ""
        }
        this.errorMessages = {
            "Incorrect Email when trying to recover password.": "Invalid Email"
        }
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }
    validateEmail() {
        return this.emailRegex.test(this.state.email);
    }

    alertNewPassword(errorMessage) {
        showMessage({
            message: errorMessage,
            type: "danger",
            animationDuration: 500,
            icon: "warning"
        });
    }

    showSuccessfulMessage() {
        showMessage({
            message: "Password Successfully Updated",
            type: "success",
            icon: "success"
        });
    }

    onResponse(response) {
        if (response.ok) {
            response.json()
                .then(json => console.log(json))
            this.showSuccessfulMessage()
            this.props.setEmailToRecover("")
            this.props.navigation.popToTop()
        } else {
            response.json()
                .then(json => {
                    this.alertNewPassword(this.errorMessages[json.message])
                })
        }
        this.props.setWaitingResponse(false);
    }

    handleSubmit() {
        if (!this.validateEmail(this.state.email)) {
            this.alertNewPassword("Please enter a valid email");
            return;
        }
        this.props.setWaitingResponse(true);
        app.apiClient().newPassword(this.state, this.onResponse.bind(this))
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.forgotPasswordLogo}>Password Recovery</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={this.state.email}
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
                        onChangeText={(text) => this.setState({ new_password: text })}
                    />
                </View>
                <ActivityIndicator size={55} animating={this.props.showWaitingResponse} />
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.handleSubmit()
                    }}>

                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showWaitingResponse: state.appReducer.waitingResponse,
        targetEmail: state.appReducer.emailToRecover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWaitingResponse: value => dispatch({ type: WAITING_RESPONSE, payload: value }),
        setEmailToRecover: value => dispatch({ type: EMAIL_TO_RECOVER, payload: value })
    }
}

const NewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(NewPassword);

export default NewPasswordContainer;