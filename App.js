import {NavigationContainer} from '@react-navigation/native';
import UserLogInScreen from './src/screens/auth/signin';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/store';
import Tutor from './src/tutor/App';
import Subtutor from './src/subtutor/App';
import Student from './src/student/App';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginSelector,
  logoutHandler,
  resetTimer,
} from './src/store/login-slice';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function AuthStack() {
  const rdxDispatch = useDispatch();
  // const location = useLocation();

  // it will check if user already logged in but open website again then it will logout user if timer is expired
  useEffect(() => {
    // console.log('first login time check');
    const now = new Date().getTime();
    let expirationTime = AsyncStorage.getItem('expirationTime');
    expirationTime = new Date(expirationTime).getTime();
    if (
      now > expirationTime ||
      expirationTime === undefined ||
      expirationTime == null
    ) {
      rdxDispatch(logoutHandler());
    }
  }, []);

  // not added dependency because it will check every activity and reset logout timer
  useEffect(() => {
    // console.log("resetTimer");
    rdxDispatch(resetTimer());
  }); // eslint-disable-line

  const {isLoggedIn, isPlanExpired, userRole} = useSelector(loginSelector);
  console.log(isLoggedIn, isPlanExpired, userRole);
  return (
    <NavigationContainer>
      {isLoggedIn && userRole === 'tutor' && <Tutor />}
      {isLoggedIn && userRole === 'subtutor' && <Subtutor />}
      {isLoggedIn && userRole === 'student' && <Student />}
      {!isLoggedIn && (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={UserLogInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthStack />
      </Provider>
    </>
  );
};

export default App;