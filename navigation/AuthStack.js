import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from "../screens/loginScreens/Login";
import SignUp from "../screens/loginScreens/Signup";
import ForgotPassword from "../screens/loginScreens/ForgotPassword";
import NewPassword from "../screens/loginScreens/NewPassword";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName={"Login"} >
            <Stack.Screen name="Login" component={LoginContainer} />
            <Stack.Screen name="Sign up" component={SignUp} />
            <Stack.Screen name="Forgot password" component={ForgotPassword} />
            <Stack.Screen name="New password" component={NewPassword} />
        </Stack.Navigator>

    );
}