import { createAsyncThunk } from '@reduxjs/toolkit';

const addType = createAsyncThunk(
  'subjects/types/add',
  async (data, { rejectWithValue, getState }) => {
    const url = 'https://ts4ever.pl:8443/subjects/types/add';
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

      return { ...dataRes, ...data };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default addType;
