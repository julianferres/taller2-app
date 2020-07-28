import * as React from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Video} from "expo-av";
import {connect} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {showMessage} from "react-native-flash-message";
import {app} from "../../../app/app";
import {styles} from "../../../constants/InitStackStylesheet"
import Moment from 'moment';

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
            isShowingCompleteComments: false,
            myLike: false,
            myDislike: false,
            amountLikes: this.props.videoInfo.reactions.like,
            amountDislikes: this.props.videoInfo.reactions.dislike,
            isFetchingComments: true,
            comments: [],
            myComment: "",
            dimensions: undefined
        }
    }

    componentDidMount() {
        this.getMyReactions();
        app.apiClient().getVideoComments({
            other_user_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title
        }, this.onResponseGetComments.bind(this))
    }

    formatTime(timestamp) {
        timestamp = timestamp.split('.')[0].replace("T", " ")
        return Moment.utc(timestamp, "YYYY-MM-DD-HH:mm:SS").fromNow();
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

    sendComment() {
        if (this.state.myComment === "") {
            this.alertReaction("Empty comment");
            return
        }
        app.apiClient().sendComment({
            target_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title,
            comment: this.state.myComment
        }, this.onResponseSendComment.bind(this))
    }

    reaction(reactionType) {
        let body = {
            target_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title,
            reaction: reactionType
        }, reactionMessage;


        if (reactionType === "like" && !this.state.myLike) {
            app.apiClient().giveReaction(body, this.onResponse.bind(this))
            this.setState({
                amountLikes: this.state.amountLikes + 1,
                amountDislikes: this.state.amountDislikes + (this.state.myDislike ? -1 : 0)
            })
            this.setState({myDislike: false})
            reactionMessage = 'Your like has been added'
        }
        else if (reactionType === "like" && this.state.myLike) {
            app.apiClient().removeReaction(body, this.onResponse.bind(this))
            this.setState({amountLikes: this.state.amountLikes - 1})
            reactionMessage = 'Your like has been removed'

        }
        else if (reactionType === "dislike" && !this.state.myDislike) {
            app.apiClient().giveReaction(body, this.onResponse.bind(this))
            this.setState({
                amountLikes: this.state.amountLikes + (this.state.myLike ? -1 : 0),
                amountDislikes: this.state.amountDislikes + 1
            })
            this.setState({myLike: false})
            reactionMessage = 'Your dislike has been added'
        }
        else if (reactionType === "dislike" && this.state.myDislike) {
            app.apiClient().removeReaction(body, this.onResponse.bind(this))
            this.setState({amountLikes: this.state.amountLikes, amountDislikes: this.state.amountDislikes - 1})
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
                                    "timestamp": this.formatTime(comment["comment"]["timestamp"])
                                }
                            }
                        )
                })
            })
        } else {
            response.json().then(json => console.log(json)).catch(e => console.log(e))
        }
        this.setState({isFetchingComments: false})
    }

    onResponseSendComment(response) {
        if (response.ok) {
            showMessage({
                message: "Comment successfully added.",
                type: "success",
                animationDuration: 300,
                icon: "success"
            });
        } else {
            response.json()
                .then(json => {
                    console.log(json)
                })
            showMessage({
                message: "There was a problem adding your comment.",
                type: "danger",
                animationDuration: 300,
                icon: "danger"
            });
        }
        this.resetState()
        app.apiClient().getVideoComments({
            other_user_email: this.props.videoInfo.userEmail,
            video_title: this.props.videoInfo.title
        }, this.onResponseGetComments.bind(this))
    }

    resetState() {
        this.setState({
            isFetchingComments: true,
            comments: []
        })
    }

    selectProfile() {
        this.props.userEmail === this.props.videoInfo.userEmail ?
            this.props.navigation.navigate("MyProfile") :
            this.props.navigation.navigate("UserProfile")
    }

    fetchingCommentsComponent() {
        return <View style={{flex: 1, alignItems: "center"}}>
            <ActivityIndicator size={55} color={"#00335c"} style={{paddingTop: 30}}/>
            <Text style={{fontSize: 16, fontFamily: "OpenSans", color: azulMarino, paddingTop: 10}}>Loading
                comments</Text>
        </View>
    }

    commentsComponent() {
        let commentsToShow = this.state.comments.slice(0, (this.state.isShowingCompleteComments ? this.state.comments.length : 1));
        return (
            <ScrollView style={{flex: 1}}>
                <Text style={{
                    fontFamily: "OpenSans", fontSize: 16, color: azulMarino, paddingLeft: 10,
                    paddingRight: 10, paddingBottom: 5
                }}>Comments {this.state.comments.length}</Text>
                <TextInput
                    style={[styles.commentBox, {flex: 2, height: 40, fontSize: 16, paddingLeft: 10, color: azulMarino}]}
                    placeholder="Add a comment..."
                    placeholderTextColor={Colors.tabIconDefault}
                    onSubmitEditing={() => this.sendComment()}
                    onChangeText={(text) => this.setState({myComment: text})}
                    clearButtonMode="while-editing"
                />
                <TouchableOpacity
                    onPress={() => this.setState({isShowingCompleteComments: !this.state.isShowingCompleteComments})}
                >
                    <ScrollView>
                        {commentsToShow.map((comment) => (
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                padding: 10,
                            }}>
                                <Image source={{uri: `data:image/png;base64,${comment.photo}`}}
                                       style={{
                                           height: widthResolution / 10,
                                           width: widthResolution / 10,
                                           borderRadius: 100
                                       }}
                                />
                                <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
                                    <View style={{
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        flexDirection: "row"
                                    }}>
                                        <Text style={{
                                            fontFamily: "OpenSans",
                                            fontSize: widthResolution / 25,
                                            paddingRight: 20
                                        }}>{comment.fullname}</Text>
                                        <Text style={{
                                            fontFamily: "OpenSans-regular",
                                            opacity: 0.5,
                                            fontSize: widthResolution / 25
                                        }}>{comment.timestamp}</Text>
                                    </View>
                                    <Text style={{paddingTop: 5, paddingLeft: 10}}>{comment.content}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    render() {
        let commentsSection = this.state.isFetchingComments ? this.fetchingCommentsComponent() : this.commentsComponent();
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>

                <CustomHeader title="Watch" navigation={this.props.navigation}/>

                <ScrollView style={{flex: 1}}
                >
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
                            }}>{this.state.amountLikes}</Text>
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
                            >{this.state.amountDislikes}</Text>
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
                    {commentsSection}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.appReducer.userEmail,
        videoInfo: state.appReducer.videoVisualizationInfo,
    };
};

const VideoVisualizationScreen = connect(mapStateToProps, null)(_VideoVisualizationScreen)

export default VideoVisualizationScreen;
