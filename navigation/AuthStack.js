import * as React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import LoginContainer from "../screens/loginScreens/Login";
import SignUp from "../screens/loginScreens/Signup";
import ForgotPasswordContainer from "../screens/loginScreens/ForgotPassword";
import NewPasswordContainer from "../screens/loginScreens/NewPassword";

const Stack = createStackNavigator();


export default function AuthStack() {

    return (
        <Stack.Navigator initialRouteName={"Login"} >
            <Stack.Screen name="Login" component={LoginContainer} />
            <Stack.Screen name="Sign up" component={SignUp} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} />
            <Stack.Screen name="Forgot password" component={ForgotPasswordContainer} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} />
            <Stack.Screen name="New password" component={NewPasswordContainer} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
        </Stack.Navigator>

    );
}