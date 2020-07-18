import Constants from 'expo-constants';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';


const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            try{
                const token = await Notifications.getExpoPushTokenAsync();
                return token
            } catch (e) {
                console.log("Cannot get token, probably running on simulator. ")
            }

        } else {
            alert('Must use physical device for Push Notifications');
        }

    if (Platform.OS === 'android') {
        await Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }
};

export default registerForPushNotificationsAsync;