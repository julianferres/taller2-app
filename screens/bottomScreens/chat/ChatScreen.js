import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from "../../../navigation/CustomHeader";

export default function ChatScreen({navigation}) {
  return (
      <View style={{flex: 1, paddingTop: 25}}>
        <CustomHeader title="Messages" isHome={true} navigation={navigation}/>
        <Text>
            Chat
        </Text>
          <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate("Conversation")}>
              <Text>
                  Chat with friend!
              </Text>
          </TouchableOpacity>
      </View>
  )
}