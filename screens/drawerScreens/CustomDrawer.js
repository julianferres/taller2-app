import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StatusBar } from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {PENDING_FRIENDSHIP_REQUESTS, REMOVE_TOKEN} from "../../reducers/appReducer";
import { connect } from "react-redux";
import {app} from "../../app/app";


class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    onResponseFriendshipRequests(response){
        if(response.ok){
            response.json()
                .then(pendingRequests => {
                        this.props.setPendingFriendshipRequests(pendingRequests)
                })
        }
    }

    componentDidMount() {
        app.apiClient().getPendingFriendsRequests(this.onResponseFriendshipRequests.bind(this))
    }

    friendshipRequestNumberComponent(){
        if(this.props.pendingFriendshipRequests.length > 0){
            return (
                <View style={{paddingLeft: 10, paddingTop: 6}}>
                    <Text style={{fontSize: 14, backgroundColor: "black",
                        borderRadius: 100, color: "white"}}> {this.props.pendingFriendshipRequests.length} </Text>
                </View>
            )
        } else {
            return <View/>
        }

    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
                <ScrollView style={{ marginLeft: 10 }}>
                    <TouchableOpacity style={{ marginTop: 20, flex: 1, justifyContent: "center", flexDirection: "row" }}>
                        <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 5, flex: 1, flexDirection: "row" }}
                        onPress={() => this.props.navigation.navigate("TabMenu")}
                    >
                        <SimpleLineIcons name="menu" size={30} color="black" />
                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, flex: 1, flexDirection: "row" }}
                        onPress={() => this.props.navigation.navigate("UploadVideo")}
                    >
                        <SimpleLineIcons name="cloud-upload" size={30} color="black" />
                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Upload new video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, flex: 1, flexDirection: "row" }}
                        onPress={() => this.props.navigation.navigate("Requests")}
                    >
                        <SimpleLineIcons name="user-follow" size={30} color="black" />
                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Friendship requests</Text>
                        {this.friendshipRequestNumberComponent()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, flex: 1, flexDirection: "row" }}
                        onPress={() => this.props.navigation.navigate("Profile")}
                    >
                        <SimpleLineIcons name="user" size={30} color="black" />
                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Edit my profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, flex: 1, flexDirection: "row" }}
                        onPress={this.props.removeToken}
                    >
                        <SimpleLineIcons name="logout" size={30} color="black" />
                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { pendingFriendshipRequests: state.appReducer.pendingFriendshipRequests };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: () => dispatch({ type: REMOVE_TOKEN }),
        setPendingFriendshipRequests: value => dispatch({type: PENDING_FRIENDSHIP_REQUESTS, payload: value})
    }
}

const CustomDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

export default CustomDrawerContainer;