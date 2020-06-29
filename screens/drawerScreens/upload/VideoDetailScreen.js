import * as React from 'react';
import {StatusBar, View, TextInput, Text} from "react-native";
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
            locatio: ""
        }
    }

    render() {
        console.log(this.props.videoToUpload)
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Video detail" navigation={this.props.navigation}/>
                <View style={{paddingLeft: 30, paddingTop: 50, paddingRight: 50}}>
                    <Text style={{fontSize: 20}}>Title</Text>
                    <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                        borderBottomColor: this.state.titleFocused ? "#839FF9" : "lightblue"}}
                               placeholder="Title"
                               onFocus={() => this.setState({titleFocused: true})}
                               onBlur={() => this.setState({titleFocused: false})}
                               onChangeText={(text) => this.setState({title: text})}
                    />
                    <Text style={{fontSize: 20, paddingTop: 5}}>Description</Text>
                    <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                        borderBottomColor: this.state.descriptionFocused ? "#839FF9" : "lightblue"}}
                               placeholder="Title"
                               onFocus={() => this.setState({descriptionFocused: true})}
                               onBlur={() => this.setState({descriptionFocused: false})}
                               onChangeText={(text) => this.setState({description: text})}
                    />
                    <Text style={{fontSize: 20, paddingTop: 5}}>Location</Text>
                    <TextInput style={{paddingTop: 10, borderBottomWidth: 1,
                        borderBottomColor: this.state.locationFocused ? "#839FF9" : "lightblue"}}
                               placeholder="Title"
                               onFocus={() => this.setState({locationFocused: true})}
                               onBlur={() => this.setState({locationFocused: false})}
                               onChangeText={(text) => this.setState({location: text})}
                    />
                    <Video
                        source={{ uri: this.props.video.uri }}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        rate={1.0}
                        isMuted={true}
                        shouldPlay
                        isLooping
                        useNativeControls
                        style={{height: 200, width: 200}}
                    />
                </View>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return { video: state.appReducer.videoToUpload };
};

const VideoDetailScreen = connect(mapStateToProps, null)(_VideoDetailScreen);

export default VideoDetailScreen;


