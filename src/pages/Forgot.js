import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Stepper from '../components/Auth/Stepper';
import FirstStep from '../components/Auth/Forgot/FirstStep';
import ThirdStep from '../components/Auth/Forgot/ThirdStep';
import SecondStep from '../components/Auth/Forgot/SecondStep';

const Forgot = ({ step }) => {
  const { t } = useTranslation();

  let stepComponent;
  const steps = [t('auth.step1'), t('forgot.step2'), t('global.success')];

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

export default Forgot;
