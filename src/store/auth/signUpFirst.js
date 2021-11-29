import { createAsyncThunk } from '@reduxjs/toolkit';

const signUpFirst = createAsyncThunk(
  'auth/signUpFirst',
  async (data, { rejectWithValue }) => {
    const url = 'http://java.ts4ever.pl/signup/firststep';
    const method = 'POST';
    
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data), // email, langugage
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        cors: 'no-cors',
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

export default signUpFirst;
