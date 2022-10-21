import { createAsyncThunk } from '@reduxjs/toolkit';

const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, { rejectWithValue, getState }) => {
    const url = 'https://ts4ever.pl:8443/signin/checklogin';
    const method = 'POST';

    const { email: userEmail, token: userToken, type } = getState().auth;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({ userEmail, userToken, type }),
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
