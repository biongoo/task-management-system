import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import userSlice from './user-slice';
import planSlice from './plan-slice';
import marksSlice from './marks-slice';
import eventsSlice from './events-slice';
import fieldsSlice from './fields-slice';
import paletteSlice from './palette-slice';
import subjectsSlice from './subjects-slice';
import teachersSlice from './teachers-slice';
import homeworkSlice from './homework-slice';
import materialsSlice from './materials-slice';
import universitiesSlice from './universities-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    plan: planSlice,
    marks: marksSlice,
    events: eventsSlice,
    fields: fieldsSlice,
    palette: paletteSlice,
    subjects: subjectsSlice,
    teachers: teachersSlice,
    homework: homeworkSlice,
    materials: materialsSlice,
    universities: universitiesSlice,
  },
});

export default store;
