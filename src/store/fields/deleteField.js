import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteField = createAsyncThunk(
  'fields/delete',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/fields/delete';
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

export default deleteField;
