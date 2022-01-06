import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlice';
import registerReducer from './register/registerSlice';

export const store = configureStore({
  reducer: {
    userLogin: loginReducer,
    userRegister: registerReducer,
  },
});

