import * as React from "react";
import {Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Video} from "expo-av";
import {connect} from "react-redux";
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons";

let customFonts = {
    "OpenSans": require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
    "OpenSans-regular": require('../../../assets/fonts/OpenSans-Regular.ttf')
};
const azulMarino = "#00335c";

class HorizontalRule extends React.Component {
    render() {
        return (
            <View
                style={{
                    borderBottomColor: "#D2D2D2",
                    borderBottomWidth: 0.5,
                    paddingBottom: this.props.padding,
                    marginBottom: this.props.margin
                }}
            />);
    }
}

class _VideoVisualizationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingCompleteDescription: false,
            fontsLoaded: false,
            likesAmount:0,
            dislikesAmount:0
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true});
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const widthResolution = Dimensions.get("window").width
        const heightResolution = widthResolution / 16 * 9;
        if (!this.state.fontsLoaded) {
            return <AppLoading/>
        }
        return (

            <ScrollView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Watch" navigation={this.props.navigation}/>
                <Video
                    source={{uri: this.props.videoInfo.uri}}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    rate={1.0}
                    isMuted={false}
                    isLooping
                    shouldPlay={false}
                    useNativeControls
                    style={{width: widthResolution, height: heightResolution, backgroundColor: "black"}}
                />

                <Text style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontFamily: "OpenSans"
                }}>{this.props.videoInfo.title}</Text>
                <HorizontalRule margin={0} padding={10}/>
                <View style={{flexDirection:"row", alignItems:"flex-start", paddingLeft:10}}>
                    <TouchableOpacity style={{padding: 10,}}
                                      onPress={() => console.log("Di LIKE")}>
                        <Ionicons size={30} name="md-thumbs-up" style={{color: azulMarino}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10}}
                                      onPress={() => console.log("Di Dislike")}>
                        <Ionicons size={30} name="md-thumbs-down" style={{color: azulMarino}} />

                    </TouchableOpacity>
                </View>
                <HorizontalRule margin={0} padding={0}/>
                <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: 10,}}
                                  onPress={() => this.props.navigation.navigate("UserProfile")}>
                    <Image source={{uri: `data:image/png;base64,${this.props.videoInfo.userPhoto}`}}
                           style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                    />
                    <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: widthResolution / 25
                        }}>{this.props.videoInfo.ownerName}</Text>
                    </View>
                </TouchableOpacity>
                <HorizontalRule margin={10} padding={0}/>
                <TouchableOpacity
                    onPress={() => this.setState({isShowingCompleteDescription: !this.state.isShowingCompleteDescription})}>
                    <Text numberOfLines={this.state.isShowingCompleteDescription ? 1000 : 5}
                          style={{
                              height: this.state.isShowingCompleteDescription ? "auto" : 100, paddingLeft: 10,
                              fontFamily: "OpenSans-regular", fontSize: 13, color: azulMarino,
                              paddingRight: 10
                          }}>{this.props.videoInfo.description}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {videoInfo: state.appReducer.videoVisualizationInfo};
};

const VideoVisualizationScreen = connect(mapStateToProps, null)(_VideoVisualizationScreen)

export default VideoVisualizationScreen;
