import * as React from 'react';
import {Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SimpleLineIcons} from "@expo/vector-icons";
import {REMOVE_TOKEN} from "../../reducers/appReducer";
import {connect} from "react-redux";
import {app} from "../../app/app";
import {showMessage} from "react-native-flash-message";

const azulMarino = "#00335c";

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingFriendshipRequests: 0,
            profilePhoto: null
        }
    }

    messageSwipe() {
        showMessage({
            message: "Swipe left to delete a video",
            type: "default",
            animationDuration: 200,
            icon: "info",
            style: {height: 50, backgroundColor: azulMarino}
        });
        this.props.navigation.navigate("Home")
    }

    onResponseFriendshipRequests(response) {
        if (response.ok) {
            response.json()
                .then(pendingRequests => {
                    this.setState({pendingFriendshipRequests: pendingRequests.length})
                })
        }
    }


    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("state", () => {
            app.apiClient().getPendingFriendsRequests(this.onResponseFriendshipRequests.bind(this))
        })
    }

    componentWillUnmount() {
        this._unsuscribe()
    }

    friendshipRequestNumberComponent() {
        if (this.state.pendingFriendshipRequests > 0) {
            return (
                <View style={{paddingLeft: 10, paddingTop: 6}}>
                    <Text style={{
                        fontSize: 14, backgroundColor: "#00335c",
                        borderRadius: 100, color: "white"
                    }}> {this.state.pendingFriendshipRequests} </Text>
                </View>
            )
        } else {
            return <View/>
        }
    }


    render() {
        const widthResolution = Dimensions.get("window").width
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <ScrollView style={{marginLeft: 10}}>
                    <TouchableOpacity style={{marginTop: 20, flex: 1, justifyContent: "center", alignItems: "center"}}
                                      onPress={() => {
                                          this.messageSwipe()
                                          this.props.navigation.navigate("MyProfile")
                                      }}>
                        <Image source={{uri: `data:image/png;base64,${this.props.myProfile["photo"]}`}}
                               style={{height: widthResolution / 5, width: widthResolution / 5, borderRadius: 200}}
                        />
                        <Text style={{
                            flex: 1,
                            justifyContent: "center",
                            fontFamily: "OpenSans-regular",
                            fontSize: 15,
                            color: azulMarino
                        }}>My profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                        onPress={() => this.props.navigation.navigate("UploadVideo")}
                    >
                        <SimpleLineIcons name="cloud-upload" size={30} color={azulMarino}/>
                        <Text
                            style={{fontSize: 20, paddingLeft: 10, fontFamily: "OpenSans-regular", color: azulMarino}}>Upload
                            new video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                        onPress={() => this.props.navigation.navigate("Friends")}
                    >
                        <SimpleLineIcons name="people" size={30} color={azulMarino}/>
                        <Text style={{
                            fontSize: 20,
                            paddingLeft: 10,
                            fontFamily: "OpenSans-regular",
                            color: azulMarino
                        }}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                        onPress={() => this.props.navigation.navigate("Requests")}
                    >
                        <SimpleLineIcons name="user-follow" size={30} color={azulMarino}/>
                        <Text
                            style={{fontSize: 20, paddingLeft: 10, fontFamily: "OpenSans-regular", color: azulMarino}}>Friendship
                            requests</Text>
                        {this.friendshipRequestNumberComponent()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginTop: 20, flex: 1, flexDirection: "row"}}
                        onPress={this.props.removeToken}
                    >
                        <SimpleLineIcons name="logout" size={30} color={azulMarino}/>
                        <Text style={{
                            fontSize: 20,
                            paddingLeft: 10,
                            fontFamily: "OpenSans-regular",
                            color: azulMarino
                        }}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myProfile: state.appReducer.myProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: () => dispatch({type: REMOVE_TOKEN}),
    }
}

const CustomDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

export default CustomDrawerContainer;