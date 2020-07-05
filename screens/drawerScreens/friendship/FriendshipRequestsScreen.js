import * as React from 'react';
import {ScrollView, StatusBar, Text, View} from "react-native";
import CustomHeader from "../../../navigation/CustomHeader";
import {connect} from 'react-redux';
import {app} from "../../../app/app";
import {PENDING_FRIENDSHIP_REQUESTS, REMOVE_TOKEN} from "../../../reducers/appReducer";

class _FriendshipRequestsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("Mounted")
    }

    render() {
        console.log("requests", this.props.pendingFriendshipRequests)
        return(
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <CustomHeader title="Requests" navigation={this.props.navigation}/>
                <ScrollView>
                    <Text>Requests baby</Text>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { pendingRequests: state.appReducer.pendingFriendshipRequests };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPendingRequests: value => dispatch({type: PENDING_FRIENDSHIP_REQUESTS, payload: value})
    }
}

const FriendshipRequestsScreen = connect(mapStateToProps, mapDispatchToProps)(_FriendshipRequestsScreen)

export default FriendshipRequestsScreen;