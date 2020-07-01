import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import ConversationScreen from "./ConversationScreen";

const ChatStack = createStackNavigator();

export default function ChatStackNavigator() {
    return(
        <ChatStack.Navigator>
            <ChatStack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
            <ChatStack.Screen name="Conversation" component={ConversationScreen} options={{headerShown: false}}/>
        </ChatStack.Navigator>
    )
}