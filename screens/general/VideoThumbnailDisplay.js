import * as React from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';
import {Text, View, Image, Dimensions, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {VIDEO_INFO_TO_WATCH} from "../../reducers/appReducer";

class _VideoThumbnailDisplay extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const padding = windowWidth / 25
        const dimension = windowWidth / 2 - padding
        return(
            <TouchableOpacity style={{margin: padding, marginBottom: 1, flex: 1, flexDirection: "row",
                backgroundColor: "#EEE8E8", borderWidth: 5, borderColor:"#EEE8E8", borderRadius: 2}}>
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
        upload: value => dispatch({type: VIDEO_INFO_TO_WATCH, payload: value})
    }
}

const VideoThumbnailDisplay = connect(null, mapDispatchToProps)(_VideoThumbnailDisplay)

export default VideoThumbnailDisplay;