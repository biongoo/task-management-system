import React from 'react';
import { Stepper as StepperMUI, Step, StepLabel } from '@mui/material';

const Stepper = ({ activeStep, steps }) => {
  return (
    <StepperMUI
      activeStep={activeStep}
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
    </StepperMUI>
  );
};

export default Stepper;
