import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";

const SearchStack = createStackNavigator();

export default function SearchStackNavigator() {
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen name="Chat" component={SearchScreen} options={{headerShown: false}} />
        </SearchStack.Navigator>
    )
}