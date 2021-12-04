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
  type:
    localStorage.getItem('type') || sessionStorage.getItem('type')
      ? localStorage.getItem('type')
        ? localStorage.getItem('type')
        : sessionStorage.getItem('type')
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
      const { email, token, type, rememberPassword } = action.payload;
      state.token = token;
      state.email = email;
      state.type = type;
      state.isLoggedIn = true;

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
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
