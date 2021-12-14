import { createAsyncThunk } from '@reduxjs/toolkit';

const addType = createAsyncThunk(
  'subjects/types/add',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/subjects/types/add';
    const method = 'POST';

    const { name } = data;
    const { email: userEmail, token: userToken } = getState().auth;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          name,
          userEmail,
          userToken,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const dataRes = await response.json();

      return { ...dataRes, name };
    } catch (err) {
      let error = err; // cast the error for access

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default addType;
