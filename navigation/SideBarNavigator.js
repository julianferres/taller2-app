import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer"

function AsdScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress={() => navigation.navigate('AsdScreen2')}
            title="Go to screen2"
        />
      </View>
  );
}

function AsdScreen2({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress={() => navigation.navigate('AsdScreen')}
            title="Go to screen"
        />
      </View>
  );
}

const Drawer = createDrawerNavigator();

export default function SideBarNavigator(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="AsdScreen" component={AsdScreen} />
            <Drawer.Screen name="AsdScreen2" component={AsdScreen2} />
        </Drawer.Navigator>
    )
}

