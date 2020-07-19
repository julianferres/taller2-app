import * as React from "react";
import {Dimensions, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Video} from "expo-av";
import {connect} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {showMessage} from "react-native-flash-message";
import {app} from "../../../app/app";
import {MODIFY_REACTION} from "../../../reducers/appReducer";
import {styles} from "../../../constants/InitStackStylesheet"

const azulMarino = "#00335c";
const widthResolution = Dimensions.get("window").width
const heightResolution = widthResolution / 16 * 9;

class HorizontalRule extends React.Component {
    render() {
        return (
            <View
                style={{
                    borderBottomColor: "#D2D2D2",
                    borderBottomWidth: 0.5,
                    paddingBottom: this.props.padding,
                    marginBottom: this.props.margin
                }}
            />);
    }
}

class _VideoVisualizationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingCompleteDescription: false,
            myLike: false,
            myDislike: false,
            amountLikes: this.props.videoInfo.reactions.like,
            amountDislikes: this.props.videoInfo.reactions.dislike,
            comments: []
        }
    }

    componentDidMount() {
        this.getMyReactions();
        app.apiClient().getVideoComments({
            other_user_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title
        }, this.onResponseGetComments.bind(this))
    }

    getMyReactions() {
        app.apiClient().getReactions({
            target_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title
        }, this.onResponseGet.bind(this))
    }

    showReactionMessage(reaction) {
        showMessage({
            message: reaction,
            type: "default",
            animationDuration: 300,
            icon: "default",
            style: {height: 50}
        });
    }

    alertReaction(errorMessage) {
        showMessage({
            message: errorMessage,
            type: "danger",
            animationDuration: 300,
            icon: "warning",
            style: {height: 50}
        });
    }

    onResponseGetComments(response) {
        if (response.ok) {
            response.json().then(json => {
                this.setState({
                    comments:
                        json.map(comment => {
                                return {
                                    "fullname": comment["user"]["fullname"],
                                    "email": comment["user"]["email"],
                                    "photo": comment["user"]["photo"],
                                    "content": comment["comment"]["content"],
                                    "timestamp": comment["comment"]["timestamp"],
                                }
                            }
                        )
                })
            })
        } else {
            response.json().then(json => console.log(json)).catch(e => console.log(e))
        }
    }

    reaction(reactionType) {
        let body = {
            target_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title,
            reaction: reactionType
        }, reactionMessage;


        if (reactionType === "like" && !this.state.myLike) {
            app.apiClient().giveReaction(body, this.onResponse.bind(this))
            this.props.modifyReaction({
                newLike: this.state.amountLikes + 1,
                newDislike: this.state.amountDislikes + (this.state.myDislike ? -1 : 0)
            })
            this.setState({myDislike: false})
            reactionMessage = 'Your like has been added'
        }
        if (reactionType === "like" && this.state.myLike) {
            app.apiClient().removeReaction(body, this.onResponse.bind(this))
            this.props.modifyReaction({newLike: this.state.amountLikes - 1, newDislike: this.state.amountDislikes})
            reactionMessage = 'Your like has been removed'

        }
        if (reactionType === "dislike" && !this.state.myDislike) {
            app.apiClient().giveReaction(body, this.onResponse.bind(this))
            this.props.modifyReaction({
                newLike: this.state.amountLikes + (this.state.myLike ? -1 : 0),
                newDislike: this.state.amountDislikes + 1
            })
            this.setState({myLike: false})
            reactionMessage = 'Your dislike has been added'
        }
        if (reactionType === "dislike" && this.state.myDislike) {
            app.apiClient().removeReaction(body, this.onResponse.bind(this))
            this.props.modifyReaction({newLike: this.state.amountLikes, newDislike: this.state.amountDislikes - 1})
            reactionMessage = 'Your dislike has been removed'
        }
        this.showReactionMessage(reactionMessage);

    }

    onResponse(response) {
        if (!response.ok) {
            this.alertReaction("Error giving reaction")
        }
    }

    onResponseGet(response) {
        if (response.ok) {
            response.json()
                .then(json => {
                    if (json["reaction"] === "like") this.setState({myLike: true})
                    if (json["reaction"] === "dislike") this.setState({myDislike: true})
                })
        } else {
            this.alertReaction("Error loading your reactions")
        }
    }

    selectProfile() {
        this.props.userEmail === this.props.videoInfo.userEmail ?
            this.props.navigation.navigate("MyProfile") :
            this.props.navigation.navigate("UserProfile")
    }

    commentsComponent() {
        return (
            <ScrollView>
                {this.state.comments.map(comment => (
                    <View style={{flex: 1, flexDirection: "row", padding: 10}}
                          onPress={() => this.selectProfile()}>
                        <Image source={{uri: `data:image/png;base64,${comment.photo}`}}
                               style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                        />
                        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                            <View style={{
                                flex: 1,
                                paddingLeft: 10,
                                paddingRight: 10,
                                justifyContent: "center",
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    fontFamily: "OpenSans",
                                    fontSize: widthResolution / 25
                                }}>{comment.fullname}</Text>
                                <Text style={{
                                    fontFamily: "OpenSans",
                                    fontSize: widthResolution / 25
                                }}>{comment.timestamp}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }


    render() {
        return (
            <ScrollView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Watch" navigation={this.props.navigation}/>
                <Video
                    source={{uri: this.props.videoInfo.uri}}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    rate={1.0}
                    isMuted={false}
                    isLooping
                    shouldPlay={false}
                    useNativeControls
                    style={{width: widthResolution, height: heightResolution, backgroundColor: "black"}}
                />

                <Text style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontFamily: "OpenSans",
                    color: azulMarino
                }}>{this.props.videoInfo.title}</Text>
                <HorizontalRule margin={0} padding={10}/>
                <View style={{flexDirection: "row", alignItems: "flex-start", paddingLeft: 10}}>
                    <TouchableOpacity style={{padding: 10, marginLeft: 5, alignItems: "center"}}
                                      onPress={() => {
                                          this.reaction("like")
                                          this.setState({myLike: !this.state.myLike})
                                      }}>
                        <Ionicons size={30} name="md-thumbs-up"
                                  style={{color: this.state.myLike ? azulMarino : Colors.tabIconDefault}}/>
                        <Text style={{
                            marginTop: -4,
                            color: this.state.myLike ? azulMarino : Colors.tabIconDefault
                        }}>{this.props.videoInfo.reactions.like}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, marginLeft: 10, alignItems: "center"}}
                                      onPress={() => {
                                          this.reaction("dislike")
                                          this.setState({myDislike: !this.state.myDislike})
                                      }}>
                        <Ionicons size={30} name="md-thumbs-down"
                                  style={{color: this.state.myDislike ? azulMarino : Colors.tabIconDefault}}/>
                        <Text style={{
                            marginTop: -4,
                            color: this.state.myDislike ? azulMarino : Colors.tabIconDefault
                        }}
                        >{this.props.videoInfo.reactions.dislike}</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalRule margin={0} padding={0}/>
                <TouchableOpacity style={{flex: 1, flexDirection: "row", padding: 10}}
                                  onPress={() => this.selectProfile()}>
                    <Image source={{uri: `data:image/png;base64,${this.props.videoInfo.userPhoto}`}}
                           style={{height: widthResolution / 10, width: widthResolution / 10, borderRadius: 100}}
                    />
                    <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                        <Text style={{
                            fontFamily: "OpenSans",
                            fontSize: widthResolution / 25
                        }}>{this.props.videoInfo.ownerName}</Text>
                    </View>
                </TouchableOpacity>
                <HorizontalRule margin={10} padding={0}/>
                <TouchableOpacity
                    onPress={() => this.setState({isShowingCompleteDescription: !this.state.isShowingCompleteDescription})}>
                    <Text numberOfLines={this.state.isShowingCompleteDescription ? 1000 : 5}
                          style={{
                              height: this.state.isShowingCompleteDescription ? "auto" : 100, paddingLeft: 10,
                              fontFamily: "OpenSans-regular", fontSize: 13, color: azulMarino,
                              paddingRight: 10
                          }}>{this.props.videoInfo.description}</Text>
                </TouchableOpacity>
                <HorizontalRule margin={10} padding={0}/>
                <Text style={{
                    fontFamily: "OpenSans", fontSize: 16, color: azulMarino, paddingLeft: 10,
                    paddingRight: 10, paddingBottom: 5
                }}>Comments {this.state.comments.length}</Text>
                <TextInput
                    style={[styles.commentBox, {flex: 2, height: 40, fontSize: 16, paddingLeft: 10, color: azulMarino}]}
                    onFocus={() => this.setState({isHistory: true})}
                    returnKeyType={'search'}
                    placeholder="Add a comment..."
                    placeholderTextColor={Colors.tabIconDefault}
                    onSubmitEditing={() => {
                        this.handleSubmit()
                    }}
                    onChangeText={(text) => this.setState({searchTerm: text})}
                    clearButtonMode="while-editing"
                />
                {this.commentsComponent()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.appReducer.userEmail,
        videoInfo: state.appReducer.videoVisualizationInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyReaction: value => dispatch({type: MODIFY_REACTION, payload: value})
    }
}

const VideoVisualizationScreen = connect(mapStateToProps, mapDispatchToProps)(_VideoVisualizationScreen)

export default VideoVisualizationScreen;
