import * as React from 'react';
import {StatusBar, View, TextInput, Text, TouchableOpacity, Button, Alert, Picker, ScrollView, KeyboardAvoidingView, Dimensions} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import { Video } from 'expo-av';
import {connect} from 'react-redux';
import {app} from "../../../app/app";
import { showMessage } from "react-native-flash-message";
import {BallIndicator, BarIndicator} from "react-native-indicators"

class _VideoDetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            titleFocused: false,
            descriptionFocused: false,
            locationFocused: false,
            title: "",
            description: "",
            location: "",
            visible: "Yes",
            animating: false
        }
    }

    resetState(){
        this.setState({
            titleFocused: false,
            descriptionFocused: false,
            locationFocused: false,
            title: "",
            description: "",
            location: "",
            visible: "Yes",
            animating: false
        })
    }

    onResponse(response){
        if(response.ok){
            showMessage({
                    message: "Video uploaded!",
                    type: "success",
                    animationDuration: 1000,
                    icon: "success"
                }
            )
            this.resetState()
            this.props.navigation.navigate("TabMenu")
        } else {
            response.json().then(json => {
                Alert.alert(
                    "Error",
                    json["message"],
                    [{text: "Close", style: "cancel"}],
                    {cancelable: false}
                )
            }).catch(Alert.alert(
                "Error",
                "Unknown error. Try again later",
                [{text: "Close", style: "cancel"}],
                {cancelable: false}
            ))
        }
        this.setState({animating: false})
    }

    handleUpload() {
        if (this.state.title === "") {
            Alert.alert(
                "Empty title",
                "You must provide a title for your video",
                [{text: "Close", style: "cancel"}],
                {cancelable: false}
            )
        } else if (this.state.description === "") {
            Alert.alert(
                "Empty description",
                "You must provide a description for your video",
                [{text: "Close", style: "cancel"}],
                {cancelable: false}
            )
        } else if (this.state.location === "") {
            Alert.alert(
                "Empty location",
                "You must provide a location for your video",
                [{text: "Close", style: "cancel"}],
                {cancelable: false}
            )
        } else {
            this.setState({animating: true})
            const data = {
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                visible: this.state.visible === "Yes",
                video: {
                    uri: this.props.video.uri,
                    name: "video-upload",
                    type: "video/mp4",
                }
            }
            app.apiClient().uploadVideo(data, this.onResponse.bind(this))
        }
    }

    render() {
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Video detail" navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={{paddingLeft: 30, paddingTop: 50, paddingRight: 30}}>
                        <Text style={{fontSize: 20}}>Title</Text>
                        <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                            borderBottomColor: this.state.titleFocused ? "#839FF9" : "lightblue"}}
                                   placeholder="Enter title"
                                   onFocus={() => this.setState({titleFocused: true})}
                                   onBlur={() => this.setState({titleFocused: false})}
                                   onChangeText={(text) => this.setState({title: text})}
                        />
                        <Text style={{fontSize: 20, paddingTop: 5}}>Description</Text>
                        <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                            borderBottomColor: this.state.descriptionFocused ? "#839FF9" : "lightblue"}}
                                   placeholder="Enter description"
                                   onFocus={() => this.setState({descriptionFocused: true})}
                                   onBlur={() => this.setState({descriptionFocused: false})}
                                   onChangeText={(text) => this.setState({description: text})}
                        />
                        <Text style={{fontSize: 20, paddingTop: 5}}>Location</Text>
                        <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                            borderBottomColor: this.state.locationFocused ? "#839FF9" : "lightblue"}}
                                   placeholder="Enter location"
                                   onFocus={() => this.setState({locationFocused: true})}
                                   onBlur={() => this.setState({locationFocused: false})}
                                   onChangeText={(text) => this.setState({location: text})}
                        />
                        <Text style={{fontSize: 20, paddingTop: 5}}>Visible</Text>
                        <View style={{flex: 1, flexDirection: "row", paddingTop: 5}}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.visible}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({visible: itemValue})}
                            >
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                            <BarIndicator
                                animating={this.state.animating}
                                animationDuration={500}
                                color="blue"
                                count={5}
                            />
                        </View>

                    </View>
                    <KeyboardAvoidingView
                        behavior={"height"}
                        keyboardVerticalOffset={20}
                        enabled={false}
                        style={{justifyContent: "center", alignItems: "center", padding: 10}}>
                        <Video
                            source={{ uri: this.props.video.uri }}
                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                            rate={1.0}
                            isMuted={true}
                            isLooping
                            shouldPlay={true}
                            style={{height: Math.round(Dimensions.get('window').width - 70), width: Math.round(Dimensions.get('window').width - 70)}}
                        />
                        <TouchableOpacity style={{padding: 10}}>
                            <Button
                                title="Upload!"
                                onPress={() => this.handleUpload()}
                                color="blue"
                            />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>

            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return { video: state.appReducer.videoToUpload };
};

const VideoDetailScreen = connect(mapStateToProps, null)(_VideoDetailScreen);

export default VideoDetailScreen;


