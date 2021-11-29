import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import signUpSecond from '../../store/auth/signUpSecond';

let resultAction;

const SecondStep = () => {
  const dispatch = useDispatch();
  const { email, token } = useParams();
  const [backdrop, setBackdrop] = useState(false);

  const checkToken = useCallback(async () => {
    resultAction = await dispatch(signUpSecond({ email, token }));

    if (signUpSecond.fulfilled.match(resultAction)) {
      console.log(resultAction.payload);
    }
  }, [dispatch, email, token]);

  useEffect(() => {
    setBackdrop(true);
    checkToken();
    setBackdrop(false);
  }, [checkToken]);

  return (
    <>
      {backdrop && (
        <Box id="he" sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!backdrop && (
        <>
          {email}
          {token}
        </>
      )}
    </>
  );
};

export default SecondStep;
