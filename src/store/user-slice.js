import { createSlice } from '@reduxjs/toolkit';

import buyPremium from './user/buyPremium';
import getPremiumStatus from './user/getPremiumStatus';

const initialState = {
  error: null,
  premiumStatus: null,
  firstLoading: true,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
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
  },
});

export const { clearError, setError } = userSlice.actions;

export default userSlice.reducer;
