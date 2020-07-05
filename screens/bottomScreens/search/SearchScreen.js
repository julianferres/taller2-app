import * as React from 'react';
import {StatusBar, View} from 'react-native';
import SearchHeader from "../../../navigation/SearchHeader";

export default class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch = (search) => {
        this.setState({search});
    };

    render() {
        const {search} = this.state;

        return (
            <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <SearchHeader title="Search" isHome={false} navigation={this.props.navigation}/>
            </View>
        );
    }
}
