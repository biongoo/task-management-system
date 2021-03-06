import { createSlice } from '@reduxjs/toolkit';

import changePassword from './auth/changePassword';

const initialState = {
  token:
    localStorage.getItem('token') || sessionStorage.getItem('token')
      ? localStorage.getItem('token')
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token')
      : '',
  email:
    localStorage.getItem('email') || sessionStorage.getItem('email')
      ? localStorage.getItem('email')
        ? localStorage.getItem('email')
        : sessionStorage.getItem('email')
      : '',
  type:
    localStorage.getItem('type') || sessionStorage.getItem('type')
      ? localStorage.getItem('type')
        ? +localStorage.getItem('type')
        : +sessionStorage.getItem('type')
      : '',
  isLoggedIn:
    localStorage.getItem('email') || sessionStorage.getItem('email')
      ? true
      : false,
  logsOut: false,
  changingPassword: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, token, type, rememberPassword } = action.payload;
      state.token = token;
      state.email = email;
      state.type = type;
      state.isLoggedIn = true;
      state.changingPassword = false;

      if (rememberPassword) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('type', type);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('type', type);
      }
    },
    logout: (state) => {
      if (localStorage.getItem('email')) {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('type');
      }

      if (sessionStorage.getItem('email')) {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('type');
      }

      state.email = '';
      state.token = '';
      state.type = 0;
      state.isLoggedIn = false;
      state.changingPassword = false;
    },
    startLogout: (state) => {
      state.logsOut = true;
    },
    stopLogout: (state) => {
      state.logsOut = false;
    },
  },
  extraReducers: {
    [changePassword.pending]: (state) => {
      state.changingPassword = true;
    },
    [changePassword.fulfilled]: (state) => {
      setTimeout(() => {
        state.changingPassword = false;
      }, 500);
    },
  },
});

export const { login, logout, startLogout, stopLogout } = authSlice.actions;

export default authSlice.reducer;
