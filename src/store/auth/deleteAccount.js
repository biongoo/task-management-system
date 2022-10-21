import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteAccount = createAsyncThunk(
  'account/delete',
  async (_, { rejectWithValue, getState }) => {
    const url = 'https://ts4ever.pl:8443/account/delete';
    const { email: userEmail, token: userToken } = getState().auth;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          userEmail,
          userToken,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const dataRes = await response.json();

      return dataRes;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default deleteAccount;
