import * as React from 'react';
import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from "../../../constants/InitStackStylesheet";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoThumbnailDisplay from "../../general/VideoThumbnailDisplay";
import {ADD_SEARCH, CLEAR_HISTORY} from "../../../reducers/appReducer";
import {connect} from "react-redux";

class _SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            isSearching: false,
            videos: [],
            thumbnails: [],
            isHistory: true
        }
    }

    alertSearch(errorMessage) {
        showMessage({
            message: "Search Error",
            description: errorMessage,
            type: "danger",
            animationDuration: 500,
            icon: "warning"
        });
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

    handleSubmit() {
        if (this.state.searchTerm === '') {
            this.alertSearch("Search is Empty");
            return;
        }
        this.setState({isSearching: true, isHistory: false})
        app.apiClient().searchVideos({query: this.state.searchTerm}, this.onResponse.bind(this))
        this.props.addSearchToHistory(this.state.searchTerm)
    }

    handleHistorySubmit(historySearch) {
        if (historySearch === '') {
            this.alertSearch("Search is Empty");
            return;
        }
        this.setState({isSearching: true, isHistory: false})
        app.apiClient().searchVideos({query: historySearch}, this.onResponse.bind(this))
        this.props.addSearchToHistory(historySearch)
    }


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
                                    "photo": responseVideo["user"]["photo"]
                                }
                            }
                        )
                })
            })
            this.setState({isHistory: false, isSearching: false})
        } else {
            response.json().then(json => console.log(json)).catch(e => console.log(e))
        }
    }

    searchHeader() {
        const azulMarino = "#00335c";
        return (
            <View>
                <View style={{
                    flexDirection: "row",
                    height: 50,
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{flex: 1, flexDirection: "row", paddingTop: 5}}
                                      onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={30} color={azulMarino} style={{paddingLeft: 20}}/>
                        <Text style={{paddingTop: 5, paddingLeft: 5, color: azulMarino}}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                        <TextInput
                            onEntered={() => this.textInput.focus()}
                            autoFocus={true}
                            ref={(input) => {
                                this.textInput = input;
                            }}
                            onFocus={() => this.setState({isHistory: true})}
                            // onBlur={() => this.setState({isHistory: false})}
                            returnKeyType={'search'}
                            style={{flex: 2, height: 50, fontSize: 16, paddingLeft: 10, color: azulMarino}}
                            placeholder="Search a Video"
                            placeholderTextColor={azulMarino}
                            onSubmitEditing={() => {
                                this.handleSubmit()
                            }}
                            onChangeText={(text) => this.setState({searchTerm: text})}
                            clearButtonMode="while-editing"
                        />
                    </View>
                </View>
                <LinearGradient
                    colors={['rgba(0,0,0,0.4)', 'transparent']}
                    style={{
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 4,
                    }}/>
            </View>
        );
    }

    historyComponent() {
        const azulMarino = "#00335c";
        return (
            this.props.searchHistory.length === 0 ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#00335c", fontSize: 25}}>No history yet</Text>
                </View>
                :
                <View style={{flex: 1, justifyContent: "center", paddingLeft: 10, paddingTop: 15}}>
                    <TouchableOpacity style={{flexDirection: 'row'}}
                                      onPress={() => this.props.clearHistory()}>
                        <Ionicons name="ios-close-circle-outline" size={30} color={"#fb5b5a"} style={{
                            paddingLeft: 20,
                            paddingBottom: 20
                        }}/>
                        <Text style={{color: "#fb5b5a", fontSize: 20, fontWeight: "bold"}}> Clear History </Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {this.props.searchHistory.map((previousSearch, index) => (
                            <TouchableOpacity key={index}
                                              style={{flexDirection: 'row', paddingBottom: 10}}
                                              onPress={() => {
                                                  this.handleHistorySubmit(previousSearch)
                                              }}
                            >
                                <Ionicons name="ios-search" size={30} color={azulMarino} style={{paddingLeft: 20}}/>
                                <Text style={{
                                    fontSize: 20,
                                    color: azulMarino,
                                    fontWeight: "bold"
                                }}>  {previousSearch}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
        );
    }

    searchingComponent() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#00335c", paddingBottom: 25, fontSize: 25}}>Loading Videos</Text>
                <ActivityIndicator color={"#00335c"} size={55} animating={this.state.isSearching}/>
            </View>
        )
    }

    videoListComponent() {
        return (
            this.state.videos.length === 0 ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#00335c", fontSize: 25}}>No videos matching</Text>
                    <Text style={{color: "#00335c", fontSize: 25}}>your search</Text>

                </View>
                : <ScrollView>
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
                            navigation={this.props.navigation}
                        />
                    ))}
                </ScrollView>
        )
    }

    render() {
        let showComp;
        this.state.isSearching ? showComp = this.searchingComponent() : showComp = this.videoListComponent()
        if (this.state.isHistory) showComp = this.historyComponent()
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                {this.searchHeader()}
                {showComp}
            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        searchHistory: state.appReducer.searchHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSearchToHistory: searchTerm => dispatch({type: ADD_SEARCH, payload: searchTerm}),
        clearHistory: () => dispatch({type: CLEAR_HISTORY})
    }
}

const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(_SearchScreen);

export default SearchScreen;