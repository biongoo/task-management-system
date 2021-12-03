import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Header from '../Header';
import win from '../../../assets/win.json';
import LinkButton100Width from '../../UI/Buttons/LinkButton100Width';

const ThirdStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <Header
          header={t('register.title3')}
          subHeader={t('register.subTitle3')}
          noBack
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <Lottie
          animationData={win}
          loop={false}
          style={{ position: 'absolute', top: -215, transform: 'scale(1.8)' }}
        />
      </Box>
      <Box mb={3} mt={1}>
        <LinkButton100Width to="/">{t('auth.signIn')}</LinkButton100Width>
      </Box>
    </>
  );
};

export default ThirdStep;
