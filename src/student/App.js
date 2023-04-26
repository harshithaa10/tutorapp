import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dashboard from './screens/dashboard';
import {IconButton} from 'react-native-paper';
import {logoutHandler} from '../store/login-slice';
import {useDispatch} from 'react-redux';
const Stack = createNativeStackNavigator();

const App = () => {
  const reduxDispatch = useDispatch();
  function logout() {
    reduxDispatch(logoutHandler());
  }
  return (
    <Stack.Navigator
      initialRouteName="StudentDashboard"
      screenOptions={{
        headerRight: () => (
          <IconButton icon="logout" size={20} onPress={logout} />
        ),
      }}>
      <Stack.Screen name="StudentDashboard" component={dashboard} />
    </Stack.Navigator>
  );
};
export default App;
