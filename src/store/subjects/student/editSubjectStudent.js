import { createAsyncThunk } from '@reduxjs/toolkit';

const editSubjectStudent = createAsyncThunk(
  'subjects/student/edit',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/subjects/student/edit';
    const { email: userEmail, token: userToken } = getState().auth;
    const { id, name, teacherType } = data;

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

      return dataRes;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export default editSubjectStudent;
