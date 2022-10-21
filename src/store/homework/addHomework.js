import { createAsyncThunk } from '@reduxjs/toolkit';

const addHomework = createAsyncThunk(
  'homework/add',
  async (formData, { rejectWithValue, getState }) => {
    const url = 'https://ts4ever.pl:8443/homework/add';
    const { email, token } = getState().auth;

    formData.append('userEmail', email);
    formData.append('userToken', token);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
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

export default addHomework;
