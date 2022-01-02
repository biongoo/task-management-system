import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../user-slice';

const getHomework = createAsyncThunk(
  'homework/get',
  async (_, { getState, dispatch }) => {
    try {
      const url = 'http://java.ts4ever.pl/homework/get';
      const { email: userEmail, token: userToken } = getState().auth;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ userEmail, userToken }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }).catch(() => {
        dispatch(setError(`Error: Connection lost`));
      });

      const dataRes = await response.json();

      return dataRes;
    } catch (err) {
      return err.response.data;
    }
  }
);

export default getHomework;
