import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './login-slice';

const store = configureStore({
  reducer: {
    auth: loginReducer,
  },
});

export default store;
