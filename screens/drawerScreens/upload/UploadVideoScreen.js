import * as React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {VIDEO_TO_UPLOAD} from "../../../reducers/appReducer";

const azulMarino = "#00335c";

class _UploadVideoScreen extends React.Component{
    constructor(props) {
        super(props);
    }

    async upload() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });

        if(!result.cancelled){
            await this.props.upload(result)
            this.props.navigation.navigate("VideoDetail")
        }
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Upload video" navigation={this.props.navigation}/>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                    onPress={() => this.upload()}>
                        <View style={{backgroundColor: "rgba(0,51,92,0.3)", justifyContent: "center", alignItems: "center",
                                        padding: 15, borderRadius: 5}}>
                            <Text style={{fontSize: 24, color: azulMarino, fontFamily:"OpenSans"}}>Upload video from gallery</Text>
                            <Ionicons name="md-videocam" size={40} color={azulMarino} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upload: value => dispatch({type: VIDEO_TO_UPLOAD, payload: value})
    }
}
const UploadVideoScreen = connect(null, mapDispatchToProps)(_UploadVideoScreen)

export default UploadVideoScreen;