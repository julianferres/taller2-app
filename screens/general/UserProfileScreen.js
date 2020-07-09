import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import CustomHeader from "../../navigation/CustomHeader";
import {app} from "../../app/app";
import {showMessage} from "react-native-flash-message";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoThumbnailDisplay from "./VideoThumbnailDisplay";

class _UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendshipStatus: "",
            isFetchingFriendStatus: true,
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
            message: "Error loading user profile",
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
                                    "description": responseVideo["video"]["description"]
                                }
                            }
                        )
                })
            })
        } else {
            this.manageError()
        }
    }

    onResponseFriendshipStatus(response) {
        response.json().then(json => this.setState({isFetchingFriendStatus: false, friendshipStatus: json["status"]}))
    }

    componentDidMount() {
        app.apiClient().getFriendshipStatus({other: this.props.userEmail}, this.onResponseFriendshipStatus.bind(this))
        app.apiClient().getUserVideos({email: this.props.userEmail}, this.onResponseVideos.bind(this))
    }

    onResponseFriendshipRequest(response) {
        if (response.ok) {
            showMessage({
                message: "Request sent!",
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
            this.setState({isFetchingFriendStatus: false, friendshipStatus: "sent"})
        } else {
            showMessage({
                message: "Error sending request.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
    }

    sendFriendshipRequest() {
        this.setState({isFetchingFriendStatus: true})
        app.apiClient().sendFriendshipRequest({other_user_email: this.props.userEmail}, this.onResponseFriendshipRequest.bind(this))
    }

    addUserComponent() {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                              onPress={() => this.sendFriendshipRequest()}>
                <MaterialCommunityIcons name="account-plus" size={this.iconSize} color="#00335c"/>
                <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>Add friend</Text>
            </TouchableOpacity>
        )
    }

    alreadyFriendsComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <MaterialCommunityIcons name="account-supervisor" size={this.iconSize} color="#00335c"/>
                <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>You are friends!</Text>
            </View>
        )
    }

    waitingAcceptanceComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <MaterialCommunityIcons name="account-clock" size={this.iconSize} color="#00335c"/>
                <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>Request already sent.</Text>
            </View>
        )
    }

    onResponseAcceptRequest(response) {
        if (response.ok) {
            showMessage({
                message: `Congratulations! ${this.props.userName.split(" ")[0]} and you are now friends.`,
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
            this.setState({isFetchingFriendStatus: false, friendshipStatus: "friends"})
        } else {
            showMessage({
                message: "Error sending request.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
    }

    acceptFriendshipRequest() {
        this.setState({isFetchingFriendStatus: true})
        app.apiClient().acceptFriendshipRequest({other_user_email: this.props.userEmail}, this.onResponseAcceptRequest.bind(this))
    }

    onResponseDeclineRequest(response) {
        if (response.ok) {
            showMessage({
                message: `You decline ${this.props.userName.split(" ")[0]} request.`,
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
            this.setState({isFetchingFriendStatus: false, friendshipStatus: "no_contact"})
        } else {
            showMessage({
                message: "Error sending request.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
    }

    declineFriendshipRequest() {
        this.setState({isFetchingFriendStatus: true})
        app.apiClient().declineFriendshipRequest({other_user_email: this.props.userEmail}, this.onResponseDeclineRequest.bind(this))
    }

    receivedFriendshipRequestComponent() {
        return (
            <View style={{flex: 1, justifyContent: "space-around", alignItems: "center", paddingLeft: 5}}>
                <Text style={{textAlign: "center", color: "#00335c", fontSize: this.fontSizeIcon}}>
                    {this.props.userName.split(" ")[0]} wants to be your friend!
                </Text>
                <TouchableOpacity onPress={() => this.acceptFriendshipRequest()}>
                    <MaterialCommunityIcons name="account-check" size={this.iconSize} color="#00335c"/>
                    <Text style={{textAlign: "center", color: "#00335c", fontSize: this.fontSizeIcon}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.declineFriendshipRequest()}>
                    <MaterialCommunityIcons name="account-remove" size={this.iconSize} color="#00335c"/>
                    <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>Decline</Text>
                </TouchableOpacity>

            </View>
        )
    }

    friendComponent() {
        if (this.state.isFetchingFriendStatus) {
            return <ActivityIndicator size={55} color={"#00335c"}/>
        } else {
            if (this.state.friendshipStatus === "no_contact") {
                return this.addUserComponent()
            } else if (this.state.friendshipStatus === "friends") {
                return this.alreadyFriendsComponent()
            } else if (this.state.friendshipStatus === "sent") {
                return this.waitingAcceptanceComponent()
            } else {
                return this.receivedFriendshipRequestComponent();
            }
        }
    }

    videosComponent() {
        if (this.state.isFetchingVideos) {
            return <ActivityIndicator size={55} color={"#00335c"}/>
        } else {
            return (
                <View>
                    {this.state.userVideos.map((video, index) => (
                        <VideoThumbnailDisplay
                            key={index}
                            title={video["title"]}
                            ownerName={this.props.userName}
                            ownerEmail={this.props.userEmail}
                            description={video["description"]}
                            thumbnail={this.state.thumbnails[index]}
                            uri={video["uri"]}
                            userPhoto={this.props.userPhoto}
                            navigation={this.props.navigation}
                        />
                    ))}
                </View>
            )

        }
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title={this.props.userName.split(" ")[0]} navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: this.fontSizeIcon,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#D2D2D2"
                    }}>
                        <Image source={{uri: `data:image/png;base64,${this.props.userPhoto}`}}
                               style={{height: 200, width: 200}}/>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            {this.friendComponent()}
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        borderBottomWidth: 0.5,
                        padding: 3,
                        borderBottomColor: "#D2D2D2"
                    }}>
                        <Text style={{fontSize: 26, fontWeight: "bold"}}>{this.props.userName}</Text>
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
        userEmail: state.appReducer.videoVisualizationInfo.userEmail,
        userName: state.appReducer.videoVisualizationInfo.ownerName,
        userPhoto: state.appReducer.videoVisualizationInfo.userPhoto
    };
};

const UserProfileScreen = connect(mapStateToProps, null)(_UserProfileScreen)

export default UserProfileScreen;
