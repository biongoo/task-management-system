import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data, { rejectWithValue }) => {
    const { login, password } = data;

    const url =
      'https://shopping-app-21aef-default-rtdb.europe-west1.firebasedatabase.app/produccsts.json';
    const method = 'POST';
    const body = { login, password };

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
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
