import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dashboard from './screens/dashboard';

const Stack = createNativeStackNavigator();
import {IconButton} from 'react-native-paper';
import {theme} from '../utils/data/theme';
import {useDispatch} from 'react-redux';
import {logoutHandler} from '../store/login-slice';
const App = () => {
  const reduxDispatch = useDispatch();
  function logout() {
    reduxDispatch(logoutHandler());
  }
  return (
    <Stack.Navigator
      initialRouteName="TutorDashboard"
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
      <Stack.Screen name="TutorDashboard" component={dashboard} />
    </Stack.Navigator>
  );
};
export default App;
