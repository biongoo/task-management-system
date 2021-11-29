import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

import FirstStep from '../components/SignUp/FirstStep';
import SecondStep from '../components/SignUp/SecondStep';

const SignUp = ({ step }) => {
  const { t } = useTranslation();

  let stepComponent;
  const steps = [t('signUp.step1'), t('signUp.step2'), t('signUp.step3')];

  switch (step) {
    case 1:
      stepComponent = <FirstStep />;
      break;
    case 2:
      stepComponent = <SecondStep />;
      break;
    default:
      break;
  }

  return (
    <>
      {stepComponent}
      <Box mt={2}>
        <Stepper
          activeStep={step - 1}
          alternativeLabel
          sx={{
            '& .MuiStep-root.Mui-completed svg': {
              color: 'secondary.main',
            },
            '& .MuiStep-root svg': {
              color: 'action.disabled',
              fontWeight: '600',
            },
            '& .MuiStepLabel-labelContainer > .Mui-completed': {
              fontWeight: 'inherit',
            },
            '& .MuiStepLabel-labelContainer > .Mui-active': {
              fontWeight: '600',
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default SignUp;
