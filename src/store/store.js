import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import userSlice from './user-slice';
import planSlice from './plan-slice';
import paletteSlice from './palette-slice';
import subjectsSlice from './subjects-slice';
import teachersSlice from './teachers-slice';
import materialsSlice from './materials-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    plan: planSlice,
    palette: paletteSlice,
    subjects: subjectsSlice,
    teachers: teachersSlice,
    materials: materialsSlice,
  },
});

export default store;
