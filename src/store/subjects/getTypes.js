import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../user-slice';

const getTypes = createAsyncThunk(
  'subjects/types/get',
  async (_, { getState, dispatch }) => {
    try {
      const url = 'http://java.ts4ever.pl/subjects/types/get';
      const { email, token } = getState().auth;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, token }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (!response.ok) {
        dispatch(setError(`Error: ${response.status}`));
        throw new Error(response.status);
      }

      const dataRes = await response.json();

      return dataRes;
    } catch (err) {
      return err.response.data;
    }
  }
);

export default getTypes;
