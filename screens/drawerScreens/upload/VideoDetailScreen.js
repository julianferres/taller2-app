import * as React from 'react';
import {StatusBar, View, TextInput, Text, TouchableOpacity, Button, Alert, KeyboardAvoidingView} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import { Video } from 'expo-av';
import {connect} from 'react-redux';

class _VideoDetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            titleFocused: false,
            descriptionFocused: false,
            locationFocused: false,
            title: "",
            description: "",
            location: ""
        }
    }

    handleUpload() {
        console.log(this.props.video)
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

        }
    }

    render() {
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Video detail" navigation={this.props.navigation}/>
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
                </View>
                <KeyboardAvoidingView
                    behavior={"height"}
                    keyboardVerticalOffset={20}
                    enabled={false}
                    style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 30}}>
                    <Video
                        source={{ uri: this.props.video.uri }}
                        resizeMode={Video.RESIZE_MODE_STRETCH}
                        rate={1.0}
                        isMuted={true}
                        isLooping
                        useNativeControls
                        style={{height: 300, width: 300}}
                    />
                    <TouchableOpacity style={{padding: 30}}>
                        <Button
                            title="Upload!"
                            onPress={() => this.handleUpload()}
                        />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return { video: state.appReducer.videoToUpload };
};

const VideoDetailScreen = connect(mapStateToProps, null)(_VideoDetailScreen);

export default VideoDetailScreen;


