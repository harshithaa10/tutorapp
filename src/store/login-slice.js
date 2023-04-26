import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

let logoutTimer;
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    token: '',
    userRole: '',
    email: '',
    name: '',
    isPlanExpired: 'false',
    expirationTime: '',
  },
  reducers: {
    login(state, action) {
      // AsyncStorage.setItem('token', action.payload.token);
      // AsyncStorage.setItem('userRole', action.payload.userRole);
      // AsyncStorage.setItem('expirationTime', action.payload.expirationTime);
      // AsyncStorage.setItem('isPlanExpired', action.payload.isPlanExpired);
      // AsyncStorage.setItem('name', action.payload.name);
      // AsyncStorage.setItem('email', action.payload.email);
      state.isLoggedIn = !!action.payload.token;
      state.token = action.payload.token;
      state.userRole = action.payload.userRole;
      state.isPlanExpired = action.payload.isPlanExpired;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    logout(state) {
      // AsyncStorage.removeItem('token');
      // AsyncStorage.removeItem('userRole');
      // AsyncStorage.removeItem('expirationTime');
      // AsyncStorage.removeItem('isPlanExpired');
      // AsyncStorage.removeItem('name');
      // AsyncStorage.removeItem('email');
      state.token = '';
      state.isLoggedIn = false;
      state.userRole = '';
      state.name = '';
      state.email = '';
      state.isPlanExpired = 'false';
      state.expirationTime = '';
    },
  },
});
export const logoutHandler = () => dispatch => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  dispatch(loginActions.logout());
};
export const loginSelector = state => state.login;
export const loginActions = loginSlice.actions;

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

export const resetTimer = () => {
  const expirationTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // means 4 hours
  // const expirationTime = new Date(new Date().getTime() + 15 * 1000); // means 15 seconds
  AsyncStorage.setItem('expirationTime', expirationTime.toISOString());
  const remainingTime = calculateRemainingTime(expirationTime.toISOString());
  // reset logoutTimer
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  return dispatch => {
    logoutTimer = setTimeout(() => {
      const now = new Date().getTime();
      let expirationTime2 = AsyncStorage.getItem('expirationTime');
      expirationTime2 = new Date(expirationTime2).getTime();
      if (now > expirationTime2) {
        dispatch(logoutHandler());
      }
    }, remainingTime);
  };
};
export const loginHandler = data => {
  const expirationTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // means 4 hours
  // const expirationTime = new Date(new Date().getTime() + 15 * 1000); // means 15 seconds
  const remainingTime = calculateRemainingTime(expirationTime.toISOString());
  return dispatch => {
    logoutTimer = setTimeout(() => {
      dispatch(logoutHandler());
    }, remainingTime);
    // console.log(logoutTimer);
    dispatch(
      loginActions.login({
        ...data,
        expirationTime: expirationTime.toISOString(),
      }),
    );
  };
};
export default loginSlice.reducer;
