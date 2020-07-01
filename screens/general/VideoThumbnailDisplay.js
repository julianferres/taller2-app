import * as React from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';
import {Text, View, Image, Dimensions} from "react-native";

export default class VideoThumbnailDisplay extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const padding = windowWidth / 25
        const dimension = windowWidth / 2 - padding
        return(
            <View style={{padding: padding  , flex: 1, flexDirection: "row"}}>
                <Image source={{uri: this.props.thumbnail}} style={{width: dimension, height: dimension - 50}}/>
                <View style={{paddingLeft: padding, flex: 1}}>
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>{this.props.title}</Text>
                    <Text style={{fontSize: 16}}>{this.props.description}</Text>
                    <Text style={{fontSize: 14, color: "grey"}}>{this.props.ownerName}</Text>
                </View>
            </View>
        )
    }
}