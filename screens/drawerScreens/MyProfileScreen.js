import * as React from 'react';
import {Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from "../../navigation/CustomHeader";
import {app} from "../../app/app";
import {showMessage} from "react-native-flash-message";
import * as VideoThumbnails from "expo-video-thumbnails";
import {connect} from "react-redux";
import {Ionicons} from "@expo/vector-icons";

const azulMarino = "#00335c";

class _MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnails: [],
            userVideos: undefined
        }
        let widthDimension = Dimensions.get("window").width
        this.iconSize = (widthDimension - 200) / 5
        this.fontSizeIcon = this.iconSize / 3
    }

    manageError() {
        showMessage({
            message: "Error loading your profile",
            type: "danger",
            animationDuration: 500,
            icon: "danger"
        });
        this.props.navigation.goBack()
    }

    generateThumbnail = async (videoUri, videoIndex, totalVideos) => {
        try {
            const {uri} = await VideoThumbnails.getThumbnailAsync(
                videoUri,
                {
                    time: 15000,
                }
            );

            var actualThumbnails = this.state.thumbnails
            this.setState({thumbnails: actualThumbnails.concat(uri)})
            if (videoIndex >= 1 || videoIndex === totalVideos - 1) {
                this.setState({isFetchingVideos: false})
            }
        } catch (e) {
            console.warn(e);
        }
    };

    onResponseVideos(response) {
        if (response.ok) {
            response.json().then(json => {
                this.setState({
                    userVideos:
                        json.map((responseVideo, index) => {
                                this.generateThumbnail(responseVideo["video"]["file_location"], index, json.length)
                                return {
                                    "title": responseVideo["video"]["title"],
                                    "location": responseVideo["video"]["location"],
                                    "uri": responseVideo["video"]["file_location"],
                                    "description": responseVideo["video"]["description"],
                                    "reactions": responseVideo["reactions"]
                                }
                            }
                        )
                })
            })
        } else {
            this.manageError()
        }
    }

    componentDidMount() {
        app.apiClient().getUserVideos({email: this.props.myProfile["email"]}, this.onResponseVideos.bind(this))
    }

    // videosComponent() {
    //     if (this.state.isFetchingVideos) {
    //         return <ActivityIndicator size={55} color={"#00335c"}/>
    //     } else {
    //         return (
    //             <View>
    //                 {this.state.userVideos.map((video, index) => (
    //                     <VideoThumbnailDisplay
    //                         key={index}
    //                         title={video["title"]}
    //                         ownerName={this.props.userName}
    //                         ownerEmail={this.props.userEmail}
    //                         description={video["description"]}
    //                         thumbnail={this.state.thumbnails[index]}
    //                         reactions={video["reactions"]}
    //                         uri={video["uri"]}
    //                         userPhoto={this.props.userPhoto}
    //                         navigation={this.props.navigation}
    //                     />
    //                 ))}
    //             </View>
    //         )
    //
    //     }
    // }

    render() {
        // let showComp;
        // this.state.isFetching ? showComp = this.fetchingComponent() : showComp = this.videosComponent()
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title={"My Profile"} navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: this.fontSizeIcon,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#D2D2D2"
                    }}>
                        <Image source={{uri: `data:image/png;base64,${this.props.myProfile["photo"]}`}}
                               style={{height: 200, width: 200}}/>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                            <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                                              onPress={() => this.props.navigation.navigate("EditProfile")}>
                                <Ionicons name="ios-create" size={40} color={azulMarino}/>
                                <Text style={{fontSize: this.fontSizeIcon, color: "#00335c", fontFamily:"OpenSans"}}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        borderBottomWidth: 0.5,
                        padding: 3,
                        borderBottomColor: "#D2D2D2"
                    }}>
                        <Text style={{
                            fontSize: 26,
                            fontFamily: "OpenSans",
                            color: azulMarino
                        }}>{this.props.myProfile["fullname"]}</Text>
                    </View>
                    {/*<View>*/}
                    {/*    {showComp}*/}
                    {/*</View>*/}
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        myProfile: state.appReducer.myProfile
    }
}

const MyProfileScreen = connect(mapStateToProps, null)(_MyProfileScreen);

export default MyProfileScreen;
