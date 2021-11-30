import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Header from './Header';
import win from '../../assets/win.json';
import LinkButton100Width from '../UI/Buttons/LinkButton100Width';

const ThirdStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <Header
          header={t('signUp.title3')}
          subHeader={t('signUp.subTitle3')}
          noBack
        />
      </Box>
      <Lottie animationData={win} loop={false} />
      <Box mb={2}>
        <LinkButton100Width to="/">{t('signIn.signIn')}</LinkButton100Width>
      </Box>
    </>
  );
};

export default ThirdStep;
