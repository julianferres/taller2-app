import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from "../../navigation/CustomHeader";
import {connect} from "react-redux";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import VideoThumbnailDisplay from "../general/VideoThumbnailDisplay";
import {app} from "../../app/app";
import * as VideoThumbnails from "expo-video-thumbnails";
import {styles} from "../../constants/InitStackStylesheet";
import {showMessage} from "react-native-flash-message";
import Lightbox from 'react-native-lightbox';

const azulMarino = "#00335c";
const widthResolution = Dimensions.get("window").width;

class _MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingVideos: true,
            thumbnails: [],
            userVideos: undefined
        }

        let widthDimension = Dimensions.get("window").width
        this.iconSize = (widthDimension - 200) / 5
        this.fontSizeIcon = this.iconSize / 3
    }

    manageError() {
        showMessage({
            message: "Error loading my profile",
            type: "danger",
            animationDuration: 500,
            icon: "danger"
        });
        this.props.navigation.navigate("Home")
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

    onResponse(response) {
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
        app.apiClient().getUserVideos({email: this.props.userEmail}, this.onResponse.bind(this))
    }

    onResponseDelete(response){
        if(response.ok){
            response.json().then(json => console.log(json))
            showMessage({
                message: "Video deleted successfully.",
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
        } else {
            response.json().then(json => console.log(json))
            showMessage({
                message: "There was a problem deleting the video.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
        this.resetState()
        app.apiClient().getUserVideos({email: this.props.userEmail}, this.onResponse.bind(this))
    }

    resetState(){
        this.setState({
            isFetchingVideos: true,
            thumbnails: [],
            userVideos: undefined
        })
    }

    deleteVideo(video){
        app.apiClient().deleteVideo({user_email: this.props.userEmail, video_title: video.title}, this.onResponseDelete.bind(this))
    }

    videosComponent() {
        if (this.state.isFetchingVideos) {
            return <View style={{flex: 1, alignItems: "center"}}>
                <ActivityIndicator size={55} color={"#00335c"} style={{paddingTop: 30}}/>
                <Text style={{fontSize: 16, fontFamily: "OpenSans", color: azulMarino, paddingTop: 10}}>Loading your
                    videos</Text>
            </View>
        } else {
            return (
                <View>
                    {this.state.userVideos.map((video, index) => (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} key={index}
                                    snapToInterval={widthResolution}>
                            <View style={{width: widthResolution}}>
                                <VideoThumbnailDisplay
                                    key={index}
                                    title={video["title"]}
                                    ownerName={this.props.myProfile["fullname"]}
                                    ownerEmail={this.props.userEmail}
                                    description={video["description"]}
                                    thumbnail={this.state.thumbnails[index]}
                                    reactions={video["reactions"]}
                                    uri={video["uri"]}
                                    userPhoto={this.props.myProfile["photo"]}
                                    navigation={this.props.navigation}
                                />
                            </View>
                            <TouchableOpacity style={{backgroundColor: "#00335c", flex: 1, justifyContent: "center"}}
                                              onPress={() => this.deleteVideo(video)}>
                                <View style={{padding: widthResolution / 20}}>
                                    <MaterialIcons name="delete" size={widthResolution / 10} color="white"/>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    ))}
                </View>
            )

        }
    }

    render() {
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
                        <Lightbox style={{flex: 1}}
                                  activeProps={{
                                      resizeMode: 'contain',
                                      flex: 1,
                                      width: null
                                  }}
                                  renderHeader={close => (
                                      <TouchableOpacity onPress={close}>
                                          <Text style={styles.closeButton}>Close</Text>
                                      </TouchableOpacity>
                                  )}
                        >
                            <Image source={{uri: `data:image/png;base64,${this.props.myProfile["photo"]}`}}
                                   style={{height: 200, width: 200}}/>
                        </Lightbox>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingLeft: 90}}>

                            <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                                              onPress={() => this.props.navigation.navigate("EditProfile")}>
                                <Ionicons name="ios-create" size={40} color={azulMarino}/>
                                <Text style={{fontSize: this.fontSizeIcon, color: "#00335c", fontFamily: "OpenSans"}}>Edit
                                    Profile</Text>
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
                    <View>
                        {this.videosComponent()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userEmail: state.appReducer.userEmail,
        myProfile: state.appReducer.myProfile,
        myVideos: state.appReducer.myVideos,
        myThumbnails: state.appReducer.myThumbnails
    }
}

//TODO: Agregar delete on long press
const MyProfileScreen = connect(mapStateToProps, null)(_MyProfileScreen);

export default MyProfileScreen;
