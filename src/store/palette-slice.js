import { blue } from '@mui/material/colors';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
  color: localStorage.getItem('color')
    ? localStorage.getItem('color')
    : blue[500],
  snackbar: { message: '', variant: 'success', time: 6000, show: false },
};

const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    showSnackbar: (state, action) => {
      const { message, variant = 'success', time = 6000 } = action.payload;
      state.snackbar = { message, variant, time, show: true };
    },
    hideSnackbar: (state) => {
      state.snackbar = { ...state.snackbar, show: false };
    },
  },
});

export const { changeMode, changeColor, showSnackbar, hideSnackbar } =
  paletteSlice.actions;

export default paletteSlice.reducer;
