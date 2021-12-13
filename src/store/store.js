import { configureStore } from '@reduxjs/toolkit';

import teachersSlice from './teachers-slice';
import paletteSlice from './palette-slice';
import userSlice from './user-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    teachers: teachersSlice,
    palette: paletteSlice,
    user: userSlice,
    auth: authSlice,
  },
});

export default store;
