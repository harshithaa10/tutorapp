import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserLogInScreen from './src/screens/auth/signin';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store';
import Tutor from './src/tutor/App';
import Subtutor from './src/subtutor/App';
import Student from './src/student/App';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutHandler} from './src/store/login-slice';

const Stack = createNativeStackNavigator();

const App = () => {
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

  const {showLoader} = useLoading();

  const {isLoggedIn, isPlanExpired, userRole} = useSelector(loginSelector);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/*<Stack.Navigator>*/}
        {/*  <Stack.Screen name="Login" component={UserLogInScreen} />*/}
        {/*</Stack.Navigator>*/}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
