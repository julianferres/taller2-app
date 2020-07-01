import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import {store} from "./reducers/appReducer";
import CurrentNavigator from "./navigation/CurrentNavigator";
import FlashMessage from "react-native-flash-message";


export default function App(props) {
  const isLoadingComplete = useCachedResources();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer >
            <CurrentNavigator />
          </NavigationContainer>
        </View>
        <FlashMessage position="bottom" />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
