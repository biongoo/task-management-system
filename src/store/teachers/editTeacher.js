import { createAsyncThunk } from '@reduxjs/toolkit';

const editTeacher = createAsyncThunk(
  'teachers/edit',
  async (data, { rejectWithValue, getState }) => {
    const url = 'http://java.ts4ever.pl/teachers/edit';
    const method = 'POST';

    const {
      teacherId,
      firstName,
      lastName,
      academicTitle,
      email: teacherEmail,
    } = data;
    const { email: userEmail, token: userToken } = getState().auth;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          teacherId,
          firstName,
          lastName,
          academicTitle,
          teacherEmail,
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
        firstName,
        lastName,
        academicTitle,
        teacherEmail,
        teacherId,
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

export default editTeacher;
