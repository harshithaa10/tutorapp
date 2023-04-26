import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dashboard from './screens/dashboard';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="SubtutorDashboard">
      <Stack.Screen name="SubtutorDashboard" component={dashboard} />
    </Stack.Navigator>
  );
};
export default App;
