import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {USER_INFORMATION} from "../../../reducers/appReducer";
import {connect} from "react-redux";

class _FriendshipRequestsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendshipRequests: undefined,
            isFetchingRequests: true
        }
        const widthResolution = Dimensions.get("window").width

        this.iconSize = widthResolution / 10
        this.fontSizeIcon = this.iconSize / 3
    }

    manageError(){
        showMessage({
            message: "Error loading requests",
            type: "danger",
            animationDuration: 500,
            icon: "danger"
        });
        this.props.navigation.goBack()
    }

    onResponseRequests(response){
        if(response.ok){
            response.json()
                .then(pendingRequests => {
                    this.setState({friendshipRequests: pendingRequests, isFetchingRequests: false})
                })
        } else {
            this.manageError()
        }
    }

    resetState(){
        this.setState({
            friendshipRequests: undefined,
            isFetchingRequests: true
        })
    }

    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().getPendingFriendsRequests(this.onResponseRequests.bind(this))
        })
    }

    fetchingComponent(){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator color="#00335c" size={50}/>
            </View>
        )
    }

    onResponseAcceptRequest(response){
        if(response.ok){
            showMessage({
                message: `Congratulations! Request accepted.`,
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
        } else {
            this.manageError()
        }
        app.apiClient().getPendingFriendsRequests(this.onResponseRequests.bind(this))
    }

    acceptFriendshipRequest(request){
        this.resetState()
        app.apiClient().acceptFriendshipRequest({other_user_email: request.email}, this.onResponseAcceptRequest.bind(this))
    }

    onResponseDeclineRequest(response){
        if(response.ok){
            showMessage({
                message: `You decline the request.`,
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
        } else {
            this.manageError()
        }
        app.apiClient().getPendingFriendsRequests(this.onResponseRequests.bind(this))
    }

    declineFriendshipRequest(request){
        this.resetState()
        app.apiClient().declineFriendshipRequest({other_user_email: request.email}, this.onResponseDeclineRequest.bind(this))
    }

    goToProfile(request){
        this.props.passVideoInfo({
            ownerName: request.fullname,
            userPhoto: request.photo,
            userEmail: request.email
        })
        this.props.navigation.navigate("UserProfile")
    }

    requestsComponent(){
        const widthResolution = Dimensions.get("window").width
        if(this.state.friendshipRequests.length === 0){
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: this.fontSizeIcon * 3/2, color:"#00335c"}}>
                        You don't have any friendship request.
                    </Text>
                </View>
            )
        }
        return(
            <ScrollView>
                {this.state.friendshipRequests.map((request, index) => {
                    return (
                        <View style={{flex: 1, flexDirection: "row", paddingRight: 20, borderBottomWidth: 2, borderBottomColor: "#00335c"}} key={index}>
                            <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: 10}}
                            onPress={() => this.goToProfile(request)}>
                                <Image source={{uri:`data:image/png;base64,${request.photo}`}}
                                       style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                                />
                                <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                                    <Text style={{fontWeight: "bold", fontSize: widthResolution / 25}}>{request.fullname}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => this.acceptFriendshipRequest(request)}>
                                    <MaterialCommunityIcons name="account-check" size={this.iconSize} color="#00335c" />
                                    <Text style={{textAlign: "center", color: "#00335c", fontSize: this.fontSizeIcon}}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.declineFriendshipRequest(request)}>
                                    <MaterialCommunityIcons name="account-remove" size={this.iconSize} color="#00335c" />
                                    <Text style={{fontSize: this.fontSizeIcon, color: "#00335c"}}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }


    render() {
        const showComp = this.state.isFetchingRequests ? this.fetchingComponent() : this.requestsComponent()
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Requests" navigation={this.props.navigation}/>
                {showComp}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        passVideoInfo: value => dispatch({type: USER_INFORMATION, payload: value})
    }
}

const FriendshipRequestsScreen = connect(null, mapDispatchToProps)(_FriendshipRequestsScreen)

export default FriendshipRequestsScreen;