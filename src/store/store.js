import { configureStore } from '@reduxjs/toolkit';

import paletteSlice from './palette-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    palette: paletteSlice,
    auth: authSlice,
  },
});

export default store;
