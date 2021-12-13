import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/teachers/delete';
    const method = 'POST';

    const { teacherId } = data;
    const { email: userEmail, token: userToken } = getState().auth;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          teacherId,
          userEmail,
          userToken,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const dataRes = await response.json();

      return {
        ...dataRes,
        teacherId,
      };
    } catch (err) {
      let error = err; // cast the error for access

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default deleteTeacher;
