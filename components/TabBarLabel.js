import {Text} from 'react-native';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarLabel(props) {
    const azulMarino = "#00335c";
    return (
        <Text style={{
            color: props.focused ? azulMarino : Colors.tabIconDefault,
            fontSize: 11,
            paddingBottom: 2
        }}>{props.label}</Text>
    );
}
