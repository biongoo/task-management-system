import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
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
});

export const { clearError, setError } = userSlice.actions;

export default userSlice.reducer;
