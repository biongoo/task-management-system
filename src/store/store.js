import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import userSlice from './user-slice';
import paletteSlice from './palette-slice';
import subjectsSlice from './subjects-slice';
import teachersSlice from './teachers-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    palette: paletteSlice,
    subjects: subjectsSlice,
    teachers: teachersSlice,
  },
});

export default store;
