import * as React from 'react';
import {
    ActivityIndicator, Dimensions, TextInput, ScrollView, StatusBar, Text,
    TouchableOpacity, View, KeyboardAvoidingView, Keyboard, Image
} from 'react-native';
import {connect} from "react-redux";
import CustomHeader from "../../navigation/CustomHeader";
import {app} from "../../app/app";
import { Ionicons } from '@expo/vector-icons';
import {showMessage} from "react-native-flash-message";
import * as Font from "expo-font";
import {Notifications} from "expo";

let customFonts = {
    "OpenSans": require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    "OpenSans-regular": require('../../assets/fonts/OpenSans-Regular.ttf')
};

class _ConversationScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetchingConversation: true,
            currentPage: 1,
            messages: undefined,
            messageToSend: "",
            pages: undefined,
            fontsLoaded: false,
            scrollDown: true,
            topChildIndex: 15,
        }

        this.perPage = 15

        this.widthResolution = Dimensions.get("window").width
        this.fontSizeNotMessages = this.widthResolution / 25
        this.paddingMessage = this.widthResolution * 2/7
        this.heightResolution = Dimensions.get("window").height
        this.fontSizeMessage = this.widthResolution / 25

    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true});
    }

    resetState(){
        this.setState({
            isFetchingConversation: true
        })
    }

    onResponseGetConversation(response){
        response.json().then(json => {
            this.setState({
                messages: json["messages"],
                pages: json["pages"],
                isFetchingConversation: false,
                scrollDown: true,
                currentPage: 1})
        })
    }

    getConversation(){
        app.apiClient().getConversation(
            { other_user_email: this.props.userEmail,
                page: 1,
                per_page: this.perPage},
            this.onResponseGetConversation.bind(this))

    }

    manageNotification(notification){
        if(notification.origin === "received" && notification.data.kind === "message" && notification.data.from === this.props.userEmail){
            this.getConversation()
        }
    }

    componentDidMount() {
        this._loadFontsAsync();
        this._unsuscribe = this.props.navigation.addListener("focus", () => {
            this.resetState()
            this.getConversation()
        })
        Notifications.addListener(this.manageNotification.bind(this))
    }

    componentWillUnmount() {
        this._unsuscribe()
    }

    fetchingComponent(){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color:"#00335c", paddingBottom:25, fontSize: 25}}>Loading messages</Text>
                <ActivityIndicator color={"#00335c"} size={55} />
            </View>
        )
    }

    onResponseSendMessage(response){
        if(response.ok){
            this.getConversation()
        } else {
            response.json().then(json => console.log(json))
            showMessage({
                message: "Error sending message. Please try again.",
                type: "danger",
                animationDuration: 500,
                icon: "danger"
            });
        }
    }

    sendMessage(){
        if(this.state.messageToSend.length === 0){
            showMessage({
                message: "Your message is empty",
                type: "danger",
                animationDuration: 200,
                icon: "danger"
            });
            return;
        }
        this.textInput.clear()
        Keyboard.dismiss()
        app.apiClient().sendMessage({other_user_email: this.props.userEmail, message: this.state.messageToSend}, this.onResponseSendMessage.bind(this))
        this.setState({messageToSend: ""})
    }

    isOwnMessage(message){
        return this.props.loggedUser === message["from_user"]
    }

    ownMessage(message){
        return(
            <View style={{padding: 5, flexDirection: "row"}}>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", backgroundColor: "#00335c", marginLeft: this.paddingMessage,
                    borderRadius: 25, padding: this.fontSizeMessage / 2}}>
                    <Text style={{fontSize: this.fontSizeMessage, fontFamily: "OpenSans", color: "white", marginLeft: 10, marginRight: 10}}>
                        {message["message"]}
                    </Text>
                </View>
            </View>
        )
    }

    otherUserMessage(message){
        return(
            <View style={{padding: 5, flexDirection: "row", alignItems: "center"}}>
                <Image source={{uri:`data:image/png;base64,${this.props.userPhoto}`}}
                       style={{height: this.fontSizeMessage * 2, width: this.fontSizeMessage * 2, borderRadius: 100}}
                />
                <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#EEE8E8", marginRight: this.paddingMessage,
                    borderRadius: 25, padding: this.fontSizeMessage / 2, marginLeft: 4}}>
                    <Text style={{fontSize: this.fontSizeMessage, fontFamily: "OpenSans", marginLeft: 10, marginRight: 10}}>
                        {message["message"]}
                    </Text>
                </View>
            </View>
        )
    }

    onResponseGetConversationNextPage(response){
        response.json().then(json => {
            let alreadyFetchedMessages = this.state.messages;
            let oldCurrentPage = this.state.currentPage;
            this.setState({
                messages: alreadyFetchedMessages.concat(json["messages"]),
                pages: json["pages"],
                currentPage: oldCurrentPage + 1,
                scrollDown: false})
        })
    }

    getConversationNextPage(){
        app.apiClient().getConversation(
            { other_user_email: this.props.userEmail,
                page: this.state.currentPage + 1,
                per_page: this.perPage},
            this.onResponseGetConversationNextPage.bind(this))

    }

    moreMessages(e){
        if(e.nativeEvent.contentOffset.y === 0 && this.state.pages > this.state.currentPage){
            this.getConversationNextPage()
        }
    }

    messagesComponent(chatsHeight){
        if(this.state.messages.length === 0){
            return (
                <ScrollView style={{height: chatsHeight, marginBottom: 10}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 10}}>
                    <Text style={{fontSize: this.fontSizeNotMessages, color:"#00335c"}}>
                        You don't have any messages with {this.props.userName.split(" ")[0]}.
                    </Text>
                </View>
                </ScrollView>
            )
        } else {
            return (
                <ScrollView style={{height: chatsHeight, marginBottom: 10}}
                            contentContainerStyle={{flexDirection: "column-reverse"}}
                            ref={ref => this.scrollView = ref} onContentSizeChange={(height, whidth) => {
                                if(this.state.scrollDown){
                                    this.scrollView.scrollToEnd({animated: true})
                                } else {
                                    const heightToScroll = height / (this.state.currentPage + 3 )
                                    this.scrollView.scrollTo({x: 0, y: height - heightToScroll, animated: false})
                                }
                            }}
                            onScroll={(e) => this.moreMessages(e)}
                    >
                        {this.state.messages.map((message, index) => {
                            let messageComp = this.isOwnMessage(message) ? this.ownMessage(message) : this.otherUserMessage(message)
                            return(
                                <View key={index}>
                                    {messageComp}
                                </View>
                            )
                        })}
                </ScrollView>
            )
        }
    }

    conversationComponent(){
        let headerSize = 50
        let heightDimension = Dimensions.get("window").height
        let inputTextSize = heightDimension / 10
        let fontSize = inputTextSize / 4
        let chatsHeight = heightDimension - headerSize - inputTextSize - StatusBar.currentHeight

        let widthDimension = Dimensions.get("window").width
        let sendIconSize = widthDimension / 10
        let inputSizeWidth = widthDimension - widthDimension / 8
        return (
            <KeyboardAvoidingView behavior="height">
                {this.messagesComponent(chatsHeight)}
                <View style={{paddingLeft: 10, flexDirection: "row"}}>
                    <View style={{borderWidth: 2, borderColor: "#00335c", borderRadius: 30, width: inputSizeWidth - 5, marginRight: 5, justifyContent: "center"}}>
                        <TextInput
                            placeholder="Write a message..."
                            style={{color: "#00335c", fontSize: fontSize, marginLeft: 10, marginRight: 10}}
                            onChangeText={(text) => this.setState({messageToSend: text})}
                            ref={input => { this.textInput = input }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Ionicons name="md-send" size={sendIconSize} color="#00335c" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        )
    }

    render() {
        const showComp = this.state.isFetchingConversation || !this.state.fontsLoaded ? this.fetchingComponent() : this.conversationComponent()
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title={this.props.userName.split(" ")[0]} navigation={this.props.navigation}/>
                {showComp}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.appReducer.videoVisualizationInfo.userEmail,
        userName: state.appReducer.videoVisualizationInfo.ownerName,
        userPhoto: state.appReducer.videoVisualizationInfo.userPhoto,
        loggedUser: state.appReducer.userEmail
    };
};

const ConversationScreen = connect(mapStateToProps, null)(_ConversationScreen)

export default ConversationScreen;