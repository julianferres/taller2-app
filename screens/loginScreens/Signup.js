import React from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../../constants/InitStackStylesheet";
import { showMessage } from "react-native-flash-message";
import { app } from "../../app/app";
import { WAITING_RESPONSE } from "../../reducers/appReducer";
import { connect } from "react-redux";

//Photo
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            phone_number: "1234-5678",
            photo: null,
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
            icon: "danger",
            animationDuration: 500
        });
    }

    showSuccessfulMessage() {
        showMessage({
            message: "User Successfully Created",
            type: "success",
            animationDuration: 500,
            icon: "success"
        });
    }

    onResponse(response) {
        if (response.ok) {
            this.showSuccessfulMessage()
            this.props.navigation.popToTop()
        } else {
            response.json()
                .then(json => {
                    this.alertSignup("Sign up problem, try again!")
                })
        }
        this.props.setWaitingResponse(false);
    }

    handleSubmit() {
        if (!this.validateEmail(this.state.email)) {
            this.alertSignup("Please enter a valid email");
            return;
        }
        this.props.setWaitingResponse(true);
        app.apiClient().signUp(this.state, this.onResponse.bind(this))
    }

    componentDidMount() {
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                this.alertSignup('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.cancelled) {
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                this.setState({ photo: { uri: localUri, name: filename, type } });
            }
        } catch (E) {
            console.log(E);
        }
    };

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
                        onChangeText={(text) => this.setState({ fullname: text })}
                    />
                </View>
                <TouchableOpacity style={styles.pickImage} onPress={this._pickImage}>
                    {!this.state.photo && <Text style={styles.imagePickerText}>Pick an Image</Text>}
                    {!this.state.photo && <Ionicons name="md-image" color={"white"} size={25} />}
                    {this.state.photo && <Text style={styles.imagePickerText}>Image Selected</Text>}
                    {this.state.photo && <Ionicons name="ios-checkmark-circle-outline" color={"white"} size={25} />}
                </TouchableOpacity>
                <ActivityIndicator style={styles.activityIndicator} size={55} animating={this.props.showWaitingResponse} />
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.handleSubmit()
                    }}>
                    <Text style={styles.loginText}>SIGNUP</Text>
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
        setWaitingResponse: value => dispatch({ type: WAITING_RESPONSE, payload: value })
    }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;