import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (data, { rejectWithValue, getState }) => {
    const url = 'https://ts4ever.pl:8443/teachers/delete';
    const { email: userEmail, token: userToken } = getState().auth;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
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
        ...data,
      };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default deleteTeacher;
