import { createAsyncThunk } from '@reduxjs/toolkit';

const editSubjectUser = createAsyncThunk(
  'subjects/user/edit',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/subjects/user/edit';
    const { email: userEmail, token: userToken } = getState().auth;
    const { id, name, teacherType, teacherTypeOriginal } = data;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          id,
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

      return { ...dataRes, id, name, teacherTypeOriginal };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default editSubjectUser;
