import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  List,
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
  Button,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import buyPremium from '../store/user/buyPremium';
import { buildDateTime } from '../utils/formatDate';
import Divider from '../components/UI/Dividers/Divider';
import getPremiumStatus from '../store/user/getPremiumStatus';

const Premium = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { premiumStatus, firstLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPremiumStatus());
  }, [dispatch]);

  const buyHandler = () => {
    window
      .open(
        'https://checkout.stripe.com/pay/cs_test_a1AmY3Qb5mc3CZ8wlLEFIXd7TyMfY98GCpWPN6yDjBXzIgDFN05usAjX9O#fidkdWxOYHwnPyd1blpxYHZxWjA0PEhVZn9Jckt8Z2hxY0BcT3Y3UDdiPW5WY0JnU2BuV0dyMmFvTERqSF9qcFEyUXBmaVVmbGJud3dyYWNUfGI9RzN9TVZzdDRGR2tca05HYmdONk1sbzJpNTV%2FckgwUzdcMScpJ2hsYXYnP34nYnBsYSc%2FJzE1ZGZmZ2EwKDNgNDIoMWQ3NSg8PWE2KDEzMjxjPTNhN2YzMDA0ZzE2PScpJ2hwbGEnPydgMzNmZmZgZChmZjM9KDEzZGMoZzRnPCgyNmQ3PD03MmExYDJjZGFnNmEnKSd2bGEnPyc9MzcxZjwwMyg1YTIwKDExZDQoZDwyYChhZDMxZmE8PDNmYzZgZDA9MD0neCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqYWBoaitydXZsaHVpYHVkfCtmamgneCUl',
        '_blank'
      )
      .focus();
    dispatch(buyPremium());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={firstLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper
        sx={{
          width: { xs: '95%', md: '95%' },
          maxWidth: '1100px',
          padding: { xs: 2, md: 2.5 },
          bgcolor: 'primary.main',
          boxShadow: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 500 }} mb={1}>
          {t('layout.premiumTMS')}
        </Typography>

        <Divider />
        <Grid container rowSpacing={0} columnSpacing={2} mb={{ xs: 2, sm: 0 }}>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon sx={{ color: 'secondary.main' }} />
                </ListItemIcon>
                <ListItemText primary={t('premium.materials10')} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <CheckIcon sx={{ color: 'secondary.main' }} />
                </ListItemIcon>
                <ListItemText primary={t('premium.tasks10')} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <CheckIcon sx={{ color: 'secondary.main' }} />
                </ListItemIcon>
                <ListItemText primary={t('premium.files10')} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Button variant="outlined" color="secondary" onClick={buyHandler}>
                {t('premium.buy')}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider />
        <Typography variant="subtitle1" mt={2}>
          {t('premium.premiumStatus')}:{' '}
          {premiumStatus !== null &&
            `${t('premium.expires')} ${buildDateTime(
              new Date(premiumStatus),
              i18n.language
            )}`}
          {premiumStatus === null && t('premium.notActive')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Premium;
