import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Stepper from '../components/Auth/Stepper';
import FirstStep from '../components/Auth/Register/FirstStep';
import ThirdStep from '../components/Auth/Register/ThirdStep';
import SecondStep from '../components/Auth/Register/SecondStep';

const Register = ({ step }) => {
  const { t } = useTranslation();

  let stepComponent;
  const steps = [t('auth.step1'), t('register.step2'), t('global.success')];

  switch (step) {
    case 1:
      stepComponent = <FirstStep />;
      break;
    case 2:
      stepComponent = <SecondStep />;
      break;
    case 4:
      stepComponent = <ThirdStep />;
      break;
    default:
      break;
  }

  return (
    <>
      {stepComponent}
      <Box mt={2}>
        <Stepper activeStep={step - 1} steps={steps} />
      </Box>
    </>
  );
};

export default Register;
