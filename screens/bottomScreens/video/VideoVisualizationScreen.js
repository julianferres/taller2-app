import * as React from "react";
import {Dimensions, StatusBar, View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Video} from "expo-av";
import {connect} from "react-redux";

class _VideoVisualizationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingCompleteDescription: false
        }
    }

    render() {
        const widthResolution = Dimensions.get("window").width
        const heightResolution = widthResolution / 16 * 9;
        return(
            <ScrollView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Watch" navigation={this.props.navigation}/>
                    <Video
                        source={{ uri: this.props.videoInfo.uri }}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        rate={1.0}
                        isMuted={false}
                        isLooping
                        shouldPlay={false}
                        useNativeControls
                        style={{width: widthResolution, height: heightResolution, backgroundColor: "black"}}
                    />

                <Text style={{fontSize: 20, fontWeight: "bold", paddingLeft: 10, paddingRight: 10}}>{this.props.videoInfo.title}</Text>
                <View style={{flex: 1, flexDirection: "row", padding: 10, }}>
                    <Image source={{uri:`data:image/png;base64,${this.props.videoInfo.userPhoto}`}}
                           style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                    />
                    <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: widthResolution / 25}}>{this.props.videoInfo.ownerName}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.setState({isShowingCompleteDescription: !this.state.isShowingCompleteDescription})}>
                    <Text numberOfLines={this.state.isShowingCompleteDescription ? 1000 : 5}
                          style={{height: this.state.isShowingCompleteDescription ? "auto" : 84, paddingLeft: 10,
                              paddingRight: 10}}>{this.props.videoInfo.description}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return { videoInfo: state.appReducer.videoVisualizationInfo };
};

const VideoVisualizationScreen = connect(mapStateToProps, null)(_VideoVisualizationScreen)

export default VideoVisualizationScreen;
