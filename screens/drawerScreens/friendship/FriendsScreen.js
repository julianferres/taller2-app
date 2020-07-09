import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {VIDEO_INFO_TO_WATCH} from "../../../reducers/appReducer";
import {connect} from "react-redux";

class _FriendsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingFriends: true,
            friends: undefined
        }
        const widthResolution = Dimensions.get("window").width

        this.iconSize = widthResolution / 10
        this.fontSizeIcon = this.iconSize / 3
    }

    manageError(message){
        showMessage({
            message: message,
            type: "danger",
            animationDuration: 500,
            icon: "danger"
        });
        this.props.navigation.goBack()
    }

    resetState(){
        this.setState({
            isFetchingFriends: true,
            friends: undefined
        })
    }

    async onResponseGetFriends(response){
        try {
            if(response.ok){
                let friends = await response.json()
                this.setState({isFetchingFriends: false, friends: friends})
            } else {
                console.log("Error")
            }
        } catch (e) {
            this.manageError("Error loading friends.")
        }
    }

    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().getFriends(this.onResponseGetFriends.bind(this))
        })
    }

    onResponseDeleteFriend(response){
        if(response.ok){
            showMessage({
                message: "Friend deleted.",
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
            this.resetState()
            app.apiClient().getFriends(this.onResponseGetFriends.bind(this))
        } else {
            this.manageError("Error deleting friend.")
        }
    }

    deleteFriend(friend){
        app.apiClient().deleteFriend({other_user_email: friend.email}, this.onResponseDeleteFriend.bind(this))
    }

    goToProfile(friend){
        this.props.passVideoInfo({
            ownerName: friend.fullname,
            userPhoto: friend.photo,
            userEmail: friend.email
        })
        this.props.navigation.navigate("UserProfile")
    }

    fetchingComponent(){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color:"#00335c", paddingBottom:25, fontSize: 25}}>Loading friends</Text>
                <ActivityIndicator color={"#00335c"} size={55} />
            </View>
        )
    }

    friendsComponent(){
        if(this.state.friends.length === 0){
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: this.fontSizeIcon * 3/2, color:"#00335c"}}>
                        You don't have any friends yet.
                    </Text>
                </View>
            )
        } else {
            const widthResolution = Dimensions.get("window").width
            return (
                <ScrollView>
                    {this.state.friends.map((friend, index) => {
                        return (
                            <View style={{flex: 1, flexDirection: "row", paddingRight: 20, borderBottomWidth: 2, borderBottomColor: "#00335c"}} key={index}>
                                <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: 10}}
                                                  onPress={() => this.goToProfile(friend)}>
                                    <Image source={{uri:`data:image/png;base64,${friend.photo}`}}
                                           style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                                    />
                                    <View style={{flex: 1, paddingLeft: 10, justifyContent: "center"}}>
                                        <Text style={{fontWeight: "bold", fontSize: widthResolution / 25}}>{friend.fullname}</Text>
                                        <Text style={{fontSize: widthResolution / 35}}>{friend.email}</Text>
                                        <Text style={{fontSize: widthResolution / 35}}>Phone: {friend.phone_number}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                    <TouchableOpacity style={{flex: 1, alignItems: "center"}}>
                                        <MaterialCommunityIcons name="message-text" size={this.iconSize} color="#00335c" />
                                        <Text style={{textAlign: "center", color: "#00335c", fontSize: this.fontSizeIcon}}>Send message</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex: 1, alignItems: "center"}} onPress={() => this.deleteFriend(friend)}>
                                        <MaterialCommunityIcons name="account-minus" size={this.iconSize} color="#00335c" />
                                        <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>Delete friend</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            )
        }
    }

    render() {
        const showComp = this.state.isFetchingFriends ? this.fetchingComponent() : this.friendsComponent()

        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Friends" navigation={this.props.navigation}/>
                {showComp}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        passVideoInfo: value => dispatch({type: VIDEO_INFO_TO_WATCH, payload: value})
    }
}

const FriendsScreen = connect(null, mapDispatchToProps)(_FriendsScreen)

export default FriendsScreen;