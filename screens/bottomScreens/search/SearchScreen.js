import * as React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from "../../../constants/InitStackStylesheet";
import {app} from "../../../app/app";
import {showMessage} from "react-native-flash-message";
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoThumbnailDisplay from "../../general/VideoThumbnailDisplay";
import {ADD_SEARCH, CLEAR_HISTORY, SET_HISTORY} from "../../../reducers/appReducer";
import {connect} from "react-redux";
import * as Font from "expo-font";

let customFonts = {
    "OpenSans": require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
    "OpenSans-regular": require('../../../assets/fonts/OpenSans-Regular.ttf')
};


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

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
    }

    componentDidMount() {
        this._loadFontsAsync()

        this.props.navigation.addListener("focus", () => {
            this._retrieveHistory()
        })
    }

    _retrieveHistory = async () => {
        try {
            const value = await AsyncStorage.getItem(`SearchHistory_${this.props.userEmail}`);
            if (value !== null) {
                this.props.initHistory(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        this._storeHistoryBis(this.state.searchTerm, this.props.searchHistory)
    }

    async _storeHistoryBis(historySearch, lastHistory){
        if(lastHistory.includes(historySearch)) return;

        try {
            await AsyncStorage.setItem(`SearchHistory_${this.props.userEmail}`, JSON.stringify([historySearch].concat(lastHistory)));
        } catch (error) {
            console.log(error);
        }
    }

    handleHistorySubmit(historySearch) {
        if (historySearch === '') {
            this.alertSearch("Search is Empty");
            return;
        }
        this.setState({isSearching: true, isHistory: false})
        app.apiClient().searchVideos({query: historySearch}, this.onResponse.bind(this))
        this.props.addSearchToHistory(historySearch)
        this._storeHistoryBis(historySearch, this.props.searchHistory)
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
                                    "photo": responseVideo["user"]["photo"],
                                    "reactions": responseVideo["reactions"]
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
                    <View style={styles.searchBox}>
                        <TextInput
                            onEntered={() => this.textInput.focus()}
                            autoFocus={true}
                            ref={(input) => {
                                this.textInput = input;
                            }}
                            onFocus={() => this.setState({isHistory: true})}
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

    async deleteHistory(){
        await AsyncStorage.setItem(`SearchHistory_${this.props.userEmail}`, JSON.stringify([]));
    }

    historyComponent() {
        const azulMarino = "#00335c";
        return (

            this.props.searchHistory.length === 0 ?
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        enabled={false}
                        style={{flex: 1, alignItems: "center", paddingTop: 50}}
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <Text style={{color: "#00335c", fontSize: 25, fontFamily:"OpenSans"}}>No history yet</Text>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        enabled={false}
                        style={{flex: 1, justifyContent: "center", paddingLeft: 10, paddingTop: 15}}
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >

                        <TouchableOpacity style={{flexDirection: 'row'}}
                                          onPress={() => {
                                              this.props.clearHistory()
                                              this.deleteHistory()
                                          }}>
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
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
        );
    }

    searchingComponent() {
        return (
            <View style={{flex: 1, paddingTop: 50, alignItems: "center"}}>
                <Text style={{color: "#00335c", paddingBottom: 25, fontSize: 25}}>Loading Videos</Text>
                <ActivityIndicator color={"#00335c"} size={55} animating={this.state.isSearching}/>
            </View>
        )
    }

    videoListComponent() {
        return (
            this.state.videos.length === 0 ?
                <View style={{flex: 1, paddingTop: 50, alignItems: "center"}}>
                    <Text style={{color: "#00335c", fontSize: 25, fontFamily:"OpenSans"}}>No videos matching</Text>
                    <Text style={{color: "#00335c", fontSize: 25, fontFamily:"OpenSans"}}>your search</Text>

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
                            reactions={video["reactions"]}
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
        searchHistory: state.appReducer.searchHistory,
        userEmail: state.appReducer.userEmail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initHistory: history => dispatch({type: SET_HISTORY, payload: history}),
        addSearchToHistory: searchTerm => dispatch({type: ADD_SEARCH, payload: searchTerm}),
        clearHistory: () => dispatch({type: CLEAR_HISTORY})
    }
}

const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(_SearchScreen);

export default SearchScreen;