import * as React from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, Keyboard, Text, View, StatusBar } from "react-native";
import CustomHeader from "../../navigation/CustomHeader";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../../constants/InitStackStylesheet";
import { showMessage } from "react-native-flash-message";
import { app } from "../../app/app";
import { WAITING_RESPONSE } from "../../reducers/appReducer";
import { connect } from "react-redux";
import { store } from "../../reducers/appReducer";
import { UIActivityIndicator } from "react-native-indicators";

//Photo
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class _ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            phone_number: "",
            photo: null,
            isFetching: true,
        }
    }
    alertSignup(errorMessage) {
        showMessage({
            message: "Error",
            type: "danger",
            icon: "danger",
            animationDuration: 500
        });
    }

    showSuccessfulMessage() {
        showMessage({
            message: "Profile Successfully Updated",
            type: "success",
            animationDuration: 500,
            icon: "success"
        });
    }

    onResponse(response) {
        if (response.ok) {
            this.showSuccessfulMessage()
            this.props.navigation.navigate("Home")
        } else {
            response.json()
                .then(json => {
                    this.alertSignup("Sign up problem, try again!")
                })
        }
        this.props.setWaitingResponse(false);
    }

    handleSubmit() {
        this.props.setWaitingResponse(true);
        app.apiClient().editProfile(this.state, this.onResponse.bind(this))
    }

    componentDidMount() {
        this.getPermissionAsync();
        app.apiClient().homeVideos(this.onResponse.bind(this))
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

    simular() {
        this.showSuccessfulMessage()
        this.props.navigation.navigate("Home")
    }

    fetchingComponent() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <UIActivityIndicator color="#00335c" animating={this.state.isFetching} />
            </View>
        )
    }
    editProfileComponent() {
        return (
            [<View style={[styles.inputView, { marginTop: 50 }]}>
                <TextInput
                    style={styles.inputText}
                    value={this.state.email}
                    placeholderTextColor="#cad6eb"
                    editable={false}
                    onChangeText={(text) => this.setState({ email: text })}
                />
            </View>,
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#cad6eb"
                    onChangeText={(text) => this.setState({ password: text })}
                />
            </View>,
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Full Name"
                    placeholderTextColor="#cad6eb"
                    onChangeText={(text) => this.setState({ fullname: text })}
                />
            </View>,
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Phone Number"
                    placeholderTextColor="#cad6eb"
                    onChangeText={(text) => this.setState({ fullname: text })}
                />
            </View>,
            <TouchableOpacity style={styles.pickImage} onPress={this._pickImage}>
                {!this.state.photo && <Text style={styles.imagePickerText}>Pick a New Profile Image</Text>}
                {!this.state.photo && <Ionicons name="md-image" color={"white"} size={25} />}
                {this.state.photo && <Text style={styles.imagePickerText}>Image Selected</Text>}
                {this.state.photo && <Ionicons name="ios-checkmark-circle-outline" color={"white"} size={25} />}
            </TouchableOpacity>,
            <ActivityIndicator style={styles.activityIndicator} size={55} animating={this.props.showWaitingResponse} />,
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    //Keyboard.dismiss()
                    //this.handleSubmit()
                    this.simular()
                }}>
                <Text style={styles.loginText}>UPDATE</Text>
            </TouchableOpacity>]
        );
    }

    render() {
        console.log(store.getState().appReducer.email)
        return (
            <View style={[styles.updateProfileContainer, { paddingTop: StatusBar.currentHeight }]}>
                <CustomHeader title="Profile" navigation={this.props.navigation} />
                {!this.state.isFetching && this.fetchingComponent()}
                {this.state.isFetching && this.editProfileComponent()}
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

const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(_ProfileScreen);

export default ProfileScreen;
