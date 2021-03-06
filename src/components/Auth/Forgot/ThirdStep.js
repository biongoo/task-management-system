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
      <Box mb={3}>
        <Header
          header={t('forgot.title3')}
          subHeader={t('forgot.subTitle3')}
          noBack
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          '& > div': {
            position: 'absolute',
            top: { xs: -120, sm: -215 },
          },
        }}
      >
        <Lottie animationData={win} loop={false} />
      </Box>
      <Box mb={3}>
        <LinkButton100Width to="/">{t('auth.signIn')}</LinkButton100Width>
      </Box>
    </>
  );
};

export default ThirdStep;
