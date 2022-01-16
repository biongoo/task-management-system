import { createSlice } from '@reduxjs/toolkit';

import buyPremium from './user/buyPremium';
import getPremiumStatus from './user/getPremiumStatus';
import getNotifications from './user/getNotifications';
import viewNotifications from './user/viewNotifications';

const initialState = {
  error: null,
  premiumStatus: null,
  firstLoading: true,
  notifications: [],
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      state.premiumStatus = null;
      state.firstLoading = true;
      state.notifications = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getPremiumStatus.fulfilled]: (state, action) => {
      state.premiumStatus = action.payload.date;
      state.firstLoading = false;
    },
    [buyPremium.fulfilled]: (state, action) => {
      const { date, statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.premiumStatus = date;
    },
    [getNotifications.fulfilled]: (state, action) => {
      const notifications = action.payload;

      state.notifications = notifications;
    },
    [viewNotifications.fulfilled]: (state, action) => {
      const { statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.notifications = state.notifications.map((item) => {
        return { ...item, isViewed: true };
      });
    },
  },
});

export const { clearError, setError, reset: resetPremium } = userSlice.actions;

export default userSlice.reducer;
