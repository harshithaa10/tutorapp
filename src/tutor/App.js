import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import dashboard from './screens/dashboard';
import CustomSidebar from './navigation/CustomSidebar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import {IconButton} from 'react-native-paper';
import {theme} from '../utils/data/theme';
import {useDispatch} from 'react-redux';
import {logoutHandler} from '../store/login-slice';
import Ionicons from 'react-native-vector-icons/Ionicons';  

const App = () => {
  const reduxDispatch = useDispatch();

  function logout() {
    reduxDispatch(logoutHandler());
  }

  // function TutorStack() {
  //   return (
  //     <Stack.Navigator
  //       initialRouteName="TutorDashboard"
  //       screenOptions={{
  //         headerRight: () => (
  //           <IconButton
  //             icon="logout"
  //             iconColor={theme.colors.primary}
  //             size={20}
  //             onPress={logout}
  //           />
  //         ),
  //       }}>
  //       <Stack.Screen name="TutorDashboard" component={dashboard} options={{swipeEnabled: false, headerShown: false, }}/>
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={(props) => <CustomSidebar {...props} />}
      initialRouteName="Dashboard"
      >
      <Drawer.Screen name="Dashboard" component={dashboard}  options={{ drawerLabel: 'Dashboard',
      drawerIcon: ()=> <Ionicons
      size={23}
      name="home-outline"/>
      }}/>
    </Drawer.Navigator>
  );
};
export default App;
