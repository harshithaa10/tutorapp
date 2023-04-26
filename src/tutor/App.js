import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dashboard from './screens/dashboard';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="TutorDashboard">
      <Stack.Screen name="TutorDashboard" component={dashboard} />
    </Stack.Navigator>
  );
};
export default App;
