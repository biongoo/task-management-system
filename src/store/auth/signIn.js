import { createAsyncThunk } from '@reduxjs/toolkit';

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data, { rejectWithValue }) => {
    const { email, password } = data;

    /* const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuN4_mdVSG_8Yb9FTSV7DlYQ01CfkTOug';
 */ const url = 'http://java.ts4ever.pl/signUp/firstStep';
    const method = 'POST';
    const body = { email: email, password: password };

    console.log(body);

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      const dataRes = await response.json();

      console.log(dataRes);

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

export default signIn;
