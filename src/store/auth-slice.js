import { createSlice } from '@reduxjs/toolkit';
import signIn from './auth/signIn';

const initialState = {
  token: '',
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = '';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      /* state.entities[payload.id] = payload */
    });
    builder.addCase(signIn.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
