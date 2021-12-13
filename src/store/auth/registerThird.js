import { createAsyncThunk } from '@reduxjs/toolkit';

const registerThird = createAsyncThunk(
  'auth/registerThird',
  async (data, { rejectWithValue }) => {
    const url = 'http://java.ts4ever.pl/signup/thirdstep';
    const method = 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data), // email, token, password, typeOfAccount
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

export default registerThird;
