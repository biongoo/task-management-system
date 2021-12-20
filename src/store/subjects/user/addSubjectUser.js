import { createAsyncThunk } from '@reduxjs/toolkit';

const addSubjectUser = createAsyncThunk(
  'subjects/user/add',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/subjects/user/add';
    const { email: userEmail, token: userToken } = getState().auth;
    const { name, teacherType, teacherTypeOriginal } = data;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name,
          teacherType,
          userEmail,
          userToken,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const dataRes = await response.json();

      return { ...dataRes, name, teacherTypeOriginal };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default addSubjectUser;
