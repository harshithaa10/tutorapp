import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserLogInScreen from './src/screens/auth/signin';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User" component={UserLogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;