import * as React from 'react';
import {ActivityIndicator, ScrollView, StatusBar, Text, Vibration, View} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import VideoThumbnailDisplay from "../../general/VideoThumbnailDisplay";
import * as VideoThumbnails from "expo-video-thumbnails";
import {Notifications} from "expo";
import {USER_INFORMATION, SET_PROFILE} from "../../../reducers/appReducer";
import {connect} from "react-redux";


class _HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            videos: [],
            thumbnails: [],
        }

        this.onResponseNotification = this.onResponseNotification.bind(this)
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
            if (videoIndex > (totalVideos / 2 - 1)) {
                this.setState({isFetching: false})
            }
        } catch (e) {
            console.warn(e);
        }
    };

    onResponse(response) {
        if (response.ok) {
            response.json().then(json => {
                this.setState({
                    videos:
                        json.map((responseVideo, index) => {
                                this.generateThumbnail(responseVideo["video"]["file_location"], index, json.length)
                                return {
                                    "fullname": responseVideo["user"]["fullname"],
                                    "email": responseVideo["user"]["email"],
                                    "title": responseVideo["video"]["title"],
                                    "location": responseVideo["video"]["location"],
                                    "uri": responseVideo["video"]["file_location"],
                                    "description": responseVideo["video"]["description"],
                                    "photo": responseVideo["user"]["photo"],
                                    "reactions": responseVideo["reactions"]
                                }
                            }
                        )
                })
            })
        } else {
            response.json().then(json => console.log(json)).catch(e => console.log(e))
        }
    }

    onResponseNotification(response, screenToGo){
        if(response.ok){
            response.json().then(json => {
                this.props.passUserInfo({
                    ownerName: json["fullname"],
                    userPhoto: json["photo"],
                    userEmail: json["email"]
                })
                this.props.navigation.navigate(screenToGo)
            })
        }
    }

    onResponseGetUserChat(response){
        this.onResponseNotification(response, "Conversation")
    }

    onResponseGetUserFriendshipRequest(response){
        this.onResponseNotification(response, "UserProfile")
    }


    manageNotification(notification){

        if(notification.origin === "received"){
            Vibration.vibrate()
        } else if (notification.origin === "selected"){
            if(notification.data.kind === "message"){
                app.apiClient().getUser({email: notification.data.from}, this.onResponseGetUserChat.bind(this))
            } else if(notification.data.kind === "friendship_request"){
                app.apiClient().getUser({email: notification.data.from}, this.onResponseGetUserFriendshipRequest.bind(this))
            }
        }
    }

    onResponseGet(response) {
        if (response.ok) {
            response.json().then(json => this.props.setProfile(json))
        } else {
            this.alertProfile("Problem when trying to get profile data. Try again later")
        }
    }

    resetState(){
        this.setState({
                isFetching: true,
                videos: [],
                thumbnails: [],
            }
        )
    }
    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().getProfile(this.onResponseGet.bind(this))
            app.apiClient().homeVideos(this.onResponse.bind(this))
        })
        Notifications.addListener(this.manageNotification.bind(this))
    }

    componentWillUnmount() {
        this._unsuscribe()
    }

    fetchingComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#00335c", paddingBottom: 25, fontSize: 25}}>Loading Videos</Text>
                <ActivityIndicator color={"#00335c"} size={55} animating={this.state.isFetching}/>
            </View>
        )
    }

    videoListComponent() {
        return (
            <ScrollView>
                {this.state.videos.map((video, index) => (
                    <VideoThumbnailDisplay
                        key={index}
                        title={video["title"]}
                        ownerName={video["fullname"]}
                        ownerEmail={video["email"]}
                        description={video["description"]}
                        thumbnail={this.state.thumbnails[index]}
                        uri={video["uri"]}
                        userPhoto={video["photo"]}
                        reactions={video["reactions"]}
                        navigation={this.props.navigation}
                    />
                ))}
            </ScrollView>
        )
    }

    render() {
        let showComp;
        this.state.isFetching ? showComp = this.fetchingComponent() : showComp = this.videoListComponent()
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="ChoTuve" isHome={true} navigation={this.props.navigation}/>
                {showComp}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        passUserInfo: value => dispatch({type: USER_INFORMATION, payload: value}),
        setProfile: value => dispatch({type: SET_PROFILE, payload: value})
    }
}

const HomeScreen = connect(null, mapDispatchToProps)(_HomeScreen)

export default HomeScreen;
