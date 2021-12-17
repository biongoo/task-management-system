import { createAsyncThunk } from '@reduxjs/toolkit';

export const editThunk = (path) => {
  const thunk = createAsyncThunk(
    path,
    async (data, { rejectWithValue, getState }) => {
      const url = 'http://java.ts4ever.pl/subjects/types/delete';
      const method = 'POST';

      const { id } = data;
      const { email: userEmail, token: userToken } = getState().auth;

      try {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({
            id,
            userEmail,
            userToken,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        const dataRes = await response.json();

        return {
          ...dataRes,
          id,
        };
      } catch (err) {
        let error = err; // cast the error for access

        if (!error.response) {
          throw err;
        }

        return rejectWithValue(error.response.data);
      }
    }
  );

  return thunk;
};
