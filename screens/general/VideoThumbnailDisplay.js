import * as React from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {USER_INFORMATION} from "../../reducers/appReducer";

class _VideoThumbnailDisplay extends React.Component{
    constructor(props) {
        super(props);
    }

    watchVideo(){
        this.props.passVideoInfo({
            uri: this.props.uri,
            title: this.props.title,
            description: this.props.description,
            ownerName: this.props.ownerName,
            userPhoto: this.props.userPhoto,
            userEmail: this.props.ownerEmail,
            reactions: this.props.reactions
        })
        this.props.navigation.navigate("VideoVisualization")
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const padding = windowWidth / 25
        const dimension = windowWidth / 2 - padding
        return(
            <TouchableOpacity style={{margin: padding, marginBottom: 1, flex: 1, flexDirection: "row",
                backgroundColor: "#EEE8E8", borderWidth: 5, borderColor:"#EEE8E8", borderRadius: 2}}
                onPress={() => this.watchVideo()}>
                <Image source={{uri: this.props.thumbnail}} style={{width: dimension, height: dimension - 50}}/>
                <View style={{paddingLeft: padding, flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", textAlign: "justify"}}>{this.props.title}</Text>
                    <Text style={{fontSize: 14, color: "grey"}}>{this.props.ownerName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        passVideoInfo: value => dispatch({type: USER_INFORMATION, payload: value})
    }
}

const VideoThumbnailDisplay = connect(null, mapDispatchToProps)(_VideoThumbnailDisplay)

export default VideoThumbnailDisplay;