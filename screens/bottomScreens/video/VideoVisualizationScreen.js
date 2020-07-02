import * as React from "react";
import {Dimensions, StatusBar, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Video} from "expo-av";

export default class VideoVisualizationScreen extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Watch" isHome={true} navigation={this.props.navigation}/>
                <View>
                    <Video
                        source={{ uri: this.props.video.uri }}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        rate={1.0}
                        isMuted={true}
                        isLooping
                        shouldPlay={true}
                        style={{height: Math.round(Dimensions.get('window').width), width: Math.round(Dimensions.get('window').width)}}
                    />
                </View>
            </View>
        )
    }
}