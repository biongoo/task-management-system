import { createSlice } from '@reduxjs/toolkit';

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
  isLoggedIn:
    localStorage.getItem('token') || sessionStorage.getItem('token')
      ? true
      : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, token, rememberPassword } = action.payload;
      state.token = token;
      state.email = email;
      state.isLoggedIn = true;

      if (rememberPassword) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
      }
    },
    logout: (state) => {
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
