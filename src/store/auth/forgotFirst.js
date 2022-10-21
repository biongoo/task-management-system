import { createAsyncThunk } from '@reduxjs/toolkit';

const forgotFirst = createAsyncThunk(
  'auth/forgotFirst',
  async (data, { rejectWithValue }) => {
    const url = 'https://ts4ever.pl:8443/forgotpassword/firststep';
    const method = 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data), // email, langugage
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

export default forgotFirst;
