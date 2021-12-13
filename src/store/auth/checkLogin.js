import { createAsyncThunk } from '@reduxjs/toolkit';

const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/signin/checklogin';
    const method = 'POST';

    const { email, token } = getState().auth;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({ email, token }), // email, token
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const dataRes = await response.json();

      return dataRes;
    } catch (err) {
      let error = err; // cast the error for access

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default checkLogin;
