import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/screens/auth/signin';
import SignUp from './src/screens/auth/signup';
import ForgetPassword from './src/screens/auth/forget-password';

const Stack = createNativeStackNavigator();

const FrontNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FrontNavigation;
