import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View, Vibration} from 'react-native';
import {Provider} from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import {store} from "./reducers/appReducer";
import CurrentNavigator from "./navigation/CurrentNavigator";
import FlashMessage from "react-native-flash-message";
import {Notifications} from 'expo';
import registerForPushNotificationsAsync from "./app/notifications";

/*const handle = notification => {
  console.log(notification)
  Vibration.vibrate();
}

const handle_2 = notification => {
  console.log("2")
}

Notifications.addListener(handle)*/

export default function App(props) {
  const [notificationToken, setNotificationToken] = React.useState("")

  React.useEffect(() => {
      registerForPushNotificationsAsync().then(notificationToken => setNotificationToken(notificationToken))
  })

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer >
            <CurrentNavigator notificationToken={notificationToken}/>
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
