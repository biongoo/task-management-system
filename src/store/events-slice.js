import { createSlice } from '@reduxjs/toolkit';

import addEvent from './events/addEvent';
import getEvents from './events/getEvents';
import editEvent from './events/editEvent';
import deleteEvent from './events/deleteEvent';

const initialState = {
  events: [],
  loading: false,
  firstLoading: true,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: {
    [getEvents.pending]: (state) => {
      state.loading = true;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addEvent.fulfilled]: (state, action) => {
      const { statusCode, event } = action.payload;
      if (statusCode !== 200) return;

      state.events.push(event);
    },
    [editEvent.fulfilled]: (state, action) => {
      const { statusCode, event } = action.payload;
      if (statusCode !== 200) return;

      const index = state.events.findIndex((item) => item.id === event.id);
      state.events[index] = event;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.events = state.events.filter((item) => item.id !== id);
    },
  },
});

export default eventsSlice.reducer;
