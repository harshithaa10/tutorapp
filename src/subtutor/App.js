import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dashboard from './screens/dashboard';
import {IconButton} from 'react-native-paper';
import {theme} from '../utils/data/theme';
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
      initialRouteName="SubtutorDashboard"
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon="logout"
            iconColor={theme.colors.primary}
            size={20}
            onPress={logout}
          />
        ),
      }}>
      <Stack.Screen name="SubtutorDashboard" component={dashboard} />
    </Stack.Navigator>
  );
};
export default App;
