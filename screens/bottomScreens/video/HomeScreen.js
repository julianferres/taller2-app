import * as React from 'react';
import {ActivityIndicator, ScrollView, StatusBar, Text, View} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";
import {app} from "../../../app/app";
import VideoThumbnailDisplay from "../../general/VideoThumbnailDisplay";
import * as VideoThumbnails from "expo-video-thumbnails";
import {SET_PROFILE} from "../../../reducers/appReducer";
import {connect} from "react-redux";


class _HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            videos: [],
            thumbnails: [],

        }
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
            if (videoIndex > (totalVideos / 2 - 1)) {
                this.setState({isFetching: false})
            }
        } catch (e) {
            console.warn(e);
        }
    };

    onResponse(response) {
        if (response.ok) {
            response.json().then(json => {
                this.setState({
                    videos:
                        json.map((responseVideo, index) => {
                                this.generateThumbnail(responseVideo["video"]["file_location"], index, json.length)
                                return {
                                    "fullname": responseVideo["user"]["fullname"],
                                    "email": responseVideo["user"]["email"],
                                    "title": responseVideo["video"]["title"],
                                    "location": responseVideo["video"]["location"],
                                    "uri": responseVideo["video"]["file_location"],
                                    "description": responseVideo["video"]["description"],
                                    "photo": responseVideo["user"]["photo"],
                                    "reactions": responseVideo["reactions"]
                                }
                            }
                        )
                })
            })
        } else {
            response.json().then(json => console.log(json)).catch(e => console.log(e))
        }
    }

    onResponseGet(response) {
        if (response.ok) {
            response.json().then(json => this.props.setProfile(json))
        } else {
            this.alertProfile("Problem when trying to get profile data. Try again later")
        }
    }

    componentDidMount() {
        app.apiClient().getProfile(this.onResponseGet.bind(this))
        app.apiClient().homeVideos(this.onResponse.bind(this))
    }

    fetchingComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#00335c", paddingBottom: 25, fontSize: 25}}>Loading Videos</Text>
                <ActivityIndicator color={"#00335c"} size={55} animating={this.state.isFetching}/>
            </View>
        )
    }

    videoListComponent() {
        return (
            <ScrollView>
                {this.state.videos.map((video, index) => (
                    <VideoThumbnailDisplay
                        key={index}
                        title={video["title"]}
                        ownerName={video["fullname"]}
                        ownerEmail={video["email"]}
                        description={video["description"]}
                        thumbnail={this.state.thumbnails[index]}
                        uri={video["uri"]}
                        userPhoto={video["photo"]}
                        reactions={video["reactions"]}
                        navigation={this.props.navigation}
                    />
                ))}
            </ScrollView>
        )
    }

    render() {
        let showComp;
        this.state.isFetching ? showComp = this.fetchingComponent() : showComp = this.videoListComponent()
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="ChoTuve" isHome={true} navigation={this.props.navigation}/>
                {showComp}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (value) => dispatch({type: SET_PROFILE, payload: value})
    }
}

const HomeScreen = connect(null, mapDispatchToProps)(_HomeScreen);

export default HomeScreen;
