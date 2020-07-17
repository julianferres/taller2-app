import * as React from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {USER_INFORMATION} from "../../../reducers/appReducer";
import { BlurView } from "expo-blur";


const widthResolution = Dimensions.get("window").width
const heightResolution = Dimensions.get("window").height

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#00335c"  ,
        borderRadius: 15,
        padding: 10,
        margin: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
});

class _ChatScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
            isFetchingConversations: true,
            showDeleteModal: false,
            conversationToDelete: undefined,
            blurIntensity: 1
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
            isFetchingConversations: true,
            showDeleteModal: false,
            conversationToDelete: undefined
        })
    }

    componentDidMount() {
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            app.apiClient().lastConversations(this.onResponse.bind(this))
        })
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

    openDeleteConversationModal(conversation){
        this.setState({showDeleteModal: true, conversationToDelete: conversation})
    }

    closeDeleteConversationModal(){
        this.setState({showDeleteModal: false, conversationToDelete: undefined})
    }

    conversationsComponent(){
        const widthResolution = Dimensions.get("window").width
        const userNameToDelete = this.state.showDeleteModal ? this.state.conversationToDelete.user.fullname.split(" ")[0] : ""
        return (
            <ScrollView>
                <Modal visible={this.state.showDeleteModal}
                    transparent={true}
                       animationStyle="fade">
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.openButton}>
                                <Text style={styles.textStyle}>Delete chat with {userNameToDelete}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.openButton} onPress={() => this.closeDeleteConversationModal()}>
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{backgroundColor: this.state.showDeleteModal ? 'rgba(100,100,100, 0.6)' :'rgba(100,100,100, 0.0)' }}>
                    {this.state.conversations.map((conversation, index) => {
                        const lastMessageIsOwn = conversation["last_message"]["from_user"] === this.props.loggedUser
                        let lastMessage = conversation["last_message"]["message"]
                        const prefix = lastMessageIsOwn ? "You: " : conversation["user"]["fullname"].split(" ")[0] + ": "
                        lastMessage = prefix + lastMessage
                        return (
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{width: widthResolution}}>
                                    <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: widthResolution / 22, borderBottomWidth: 2, borderBottomColor: "#00335c"}}
                                                      onPress={() => this.goToConversation(conversation.user)}
                                                      onLongPress={() => this.openDeleteConversationModal(conversation)}
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
                                <View>
                                    <Text>ASD</Text>
                                </View>
                            </ScrollView>

                        )
                    })}
                </View>

            </ScrollView>
        )
    }

    render() {
        console.log(this.state)
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