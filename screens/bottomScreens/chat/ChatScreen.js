import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {USER_INFORMATION} from "../../../reducers/appReducer";
import { MaterialIcons } from '@expo/vector-icons';
import {Notifications} from "expo";

class _ChatScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
            isFetchingConversations: true
        }
    }

    fetchingComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#00335c", paddingBottom: 25, fontSize: 25}}>Loading chats</Text>
                <ActivityIndicator color={"#00335c"} size={55} animating={this.state.isFetchingConversation}/>
            </View>
        )
    }

    onResponse(response){
        if(response.ok){
            response.json().then(conversations => this.setState({conversations: conversations, isFetchingConversations: false}))
        } else {
            showMessage({
                message: "Error loading chats.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
            this.props.navigation.goBack()
        }
    }

    resetState(){
        this.setState({
            conversations: [],
            isFetchingConversations: true
        })
    }

    manageNotification(notification){
        if(notification.origin === "received" && notification.data.kind === "message"){
            app.apiClient().lastConversations(this.onResponse.bind(this))
        }
    }

    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().lastConversations(this.onResponse.bind(this))
        })
        Notifications.addListener(this.manageNotification.bind(this))
    }

    componentWillUnmount() {
        this._unsuscribe()
    }

    passUserInfo(user){
        this.props.passUserInfo({
            ownerName: user.fullname,
            userPhoto: user.photo,
            userEmail: user.email
        })
    }

    goToConversation(user){
        this.passUserInfo(user)
        this.props.navigation.navigate("Conversation")
    }

    onResponseDelete(response){
        if(response.ok){
            showMessage({
                message: "Chat deleted.",
                type: "success",
                animationDuration: 500,
                icon: "success"
            });
        } else {
            showMessage({
                message: "There was a problem deleting the conversation.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
        app.apiClient().lastConversations(this.onResponse.bind(this))
    }

    deleteConversation(conversation){
        this.resetState()
        app.apiClient().deleteConversation({other_user_email: conversation.user.email}, this.onResponseDelete.bind(this))
    }

    conversationsComponent(){
        const widthResolution = Dimensions.get("window").width

        if(this.state.conversations.length === 0){
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: widthResolution / 25, color:"#00335c"}}>
                        You don't have any active chat.
                    </Text>
                </View>
            )
        }

        return (
            <ScrollView>
                <View>
                    {this.state.conversations.map((conversation, index) => {
                        const lastMessageIsOwn = conversation["last_message"]["from_user"] === this.props.loggedUser
                        let lastMessage = conversation["last_message"]["message"]
                        const prefix = lastMessageIsOwn ? "You: " : conversation["user"]["fullname"].split(" ")[0] + ": "
                        lastMessage = prefix + lastMessage
                        return (
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} key={index} snapToInterval={widthResolution}>
                                <View style={{width: widthResolution}}>
                                    <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: widthResolution / 22, borderBottomColor: "#D2D2D2",
                                        borderBottomWidth: 0.5,}}
                                                      onPress={() => this.goToConversation(conversation.user)}
                                                      key={index}>
                                        <Image source={{uri:`data:image/png;base64,${conversation.user.photo}`}}
                                               style={{height: widthResolution / 8, width: widthResolution / 8, borderRadius: 100}}
                                        />
                                        <View style={{flex: 1, paddingLeft: 15, justifyContent: "center"}}>
                                            <Text style={{fontWeight: "bold", fontSize: widthResolution / 22}}>{conversation.user.fullname}</Text>
                                            <Text style={{fontWeight: lastMessageIsOwn ? "normal" : "bold",
                                                color: lastMessageIsOwn ? "gray" : "black",
                                                fontSize: widthResolution / 27}}>{lastMessage}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{backgroundColor: "#00335c", flex: 1, justifyContent: "center"}}
                                    onPress={() => this.deleteConversation(conversation)}>
                                    <View style={{padding: widthResolution / 20}}>
                                        <MaterialIcons name="delete" size={widthResolution / 10} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        )})}
                </View>
            </ScrollView>
        )
    }

    render() {
        let showComp;
        this.state.isFetchingConversations ? showComp = this.fetchingComponent() : showComp = this.conversationsComponent()

        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Messages" isHome={true} navigation={this.props.navigation}/>
                {showComp}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.appReducer.userEmail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        passUserInfo: value => dispatch({type: USER_INFORMATION, payload: value})
    }
}

const ChatScreen = connect(mapStateToProps, mapDispatchToProps)(_ChatScreen)

export default ChatScreen;