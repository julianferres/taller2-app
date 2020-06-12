import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import {combineReducers, createStore} from "redux";
import {appReducer} from "./reducers/appReducer";
import CurrentNavigator from "./navigation/CurrentNavigator";

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const reducers = combineReducers({appReducer});
  const store = createStore(reducers);

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
