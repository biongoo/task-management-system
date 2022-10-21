import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../user-slice';

const getHomework = createAsyncThunk(
  'homework/get',
  async (_, { getState, dispatch }) => {
    try {
      const url = 'https://ts4ever.pl:8443/homework/get';
      const { email: userEmail, token: userToken, type } = getState().auth;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ userEmail, userToken, type }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }).catch(() => {
        dispatch(setError(`Error: Connection lost`));
      });

      const dataRes = await response.json();

      if (dataRes.message === 'tokenNotValid') {
        dispatch(setError(`Error: Your session has expired.`));
      }

      return dataRes;
    } catch (err) {
      return err.response.data;
    }
  }
);

export default getHomework;
