import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import CustomHeader from "../../navigation/CustomHeader";
import {app} from "../../app/app";
import {showMessage} from "react-native-flash-message";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoThumbnailDisplay from "./VideoThumbnailDisplay";

class _ConversationScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetchingConversation: true,
            currentPage: 1,
        }
    }

    resetState(){
        this.setState({
            isFetchingConversation: true
        })
    }

    onResponseGetConversation(response){
        response.json().then(r => console.log(r))
    }

    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().getFriends(this.onResponseGetConversation.bind(this))
        })
    }

    render() {

        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Conversation" navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.appReducer.videoVisualizationInfo.userEmail,
        userName: state.appReducer.videoVisualizationInfo.ownerName,
        userPhoto: state.appReducer.videoVisualizationInfo.userPhoto
    };
};

const ConversationScreen = connect(mapStateToProps, null)(_ConversationScreen)

export default ConversationScreen;