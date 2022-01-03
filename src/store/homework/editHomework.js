import { createAsyncThunk } from '@reduxjs/toolkit';

const editHomework = createAsyncThunk(
  'homework/edit',
  async (formData, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/homework/edit';
    const { email, token } = getState().auth;

    formData.append('userEmail', email);
    formData.append('userToken', token);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

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

export default editHomework;
