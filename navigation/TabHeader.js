import {Text} from "react-native";
import * as React from 'react';

export default class TabHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Text>
                {this.props.headerTitle}
            </Text>
        )
    }
}